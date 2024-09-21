"use client"
import '../styles/main.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import jwt from "jsonwebtoken"
import { Toaster } from "react-hot-toast";
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
      } catch (error) {
        console.error('Invalid token:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html >
  );
}