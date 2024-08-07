'use client'

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline"

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  return (
    <Button className="grow m-2" color='orange.400' bgColor='gray.100' onClick={handleSignOut}>
      <PowerIcon className="size-5 mr-1" />
      Sign Out
    </Button>
  );
}

