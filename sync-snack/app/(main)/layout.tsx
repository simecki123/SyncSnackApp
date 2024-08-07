import { redirect } from "next/navigation";
import { auth } from "../auth";
import NavLinks from "../components/header/NavLinks";
import HeaderLogo from "../components/header/HeaderLogo";
import { SignOutButton } from "../components/header/SignOutButton";
import { Box, Text } from "@chakra-ui/react";
import HamburgerMenu from "../components/header/HamburgerMenu";
import HeaderPhone from "../components/header/HeaderPhone";
import NavLinksWeb from "../components/header/NavLinksWeb";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <Box>
      <Box className="md:hidden">
        <HeaderPhone />
        {children}
      </Box>
      <Box className="hidden md:flex md:h-screen">
        <Box className="flex flex-col">
          <HeaderLogo />
          <NavLinksWeb />
          <Box className="grow flex items-end">
            <SignOutButton />
          </Box>
        </Box>
        <Box className="grow w-screen">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
