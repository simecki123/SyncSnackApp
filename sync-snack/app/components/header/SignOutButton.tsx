'use client'

import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MoonIcon, PowerIcon, SunIcon } from "@heroicons/react/24/outline"

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <IconButton
        variant='outline'
        className="ml-2 mb-2"
        colorScheme='xblue'
        aria-label='Call Sage'
        fontSize='20px'
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <SunIcon className="p-1" /> : <MoonIcon className="p-1" />}
      />
      <Button className="flex justify-center m-2" color='white' bgColor='xblue.500' onClick={handleSignOut}>
        <PowerIcon className="size-5 mr-1" />
        Sign Out
      </Button>
    </>
  );
}

