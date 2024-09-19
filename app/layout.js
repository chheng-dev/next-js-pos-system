"use client"
import '../styles/main.scss';
import { AuthProvider } from "./Provider";
import { getSession } from 'next-auth/react';

export default function RootLayout({ children }) {
  const session = getSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {session ? children : <div>Loading...</div>}
        </AuthProvider>
      </body>
    </html>
  );
}
