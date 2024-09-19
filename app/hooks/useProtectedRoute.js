"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useProtectedRoute = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/login'); // Redirect to login if not authenticated
  }, [session, status, router]);

  return { session };
};

export default useProtectedRoute;
