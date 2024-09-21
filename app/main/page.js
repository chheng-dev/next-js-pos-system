"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <button onClick={() => signOut({ callbackUrl: '/auth/lgoin' })}>Logout</button>
    </div>
  )
}
