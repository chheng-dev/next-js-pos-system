"use client"

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function page() {
  return (
    <div className="w-full h-screen">
      Profile
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign out
      </Button>
    </div>
  );
}
