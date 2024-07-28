'use client'

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  return (
    <Button className="grow" colorScheme={"orange"} onClick={handleSignOut}>Sign Out</Button>
  );
}

