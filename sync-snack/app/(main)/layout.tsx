import { redirect } from "next/navigation";
import { auth } from "../auth";
import NavLinks from "../components/header/NavLinks";
import HeaderLogo from "../components/header/HeaderLogo";
import { SignOutButton } from "../components/header/SignOutButton";
import { Box, Text } from "@chakra-ui/react";
import HamburgerMenu from "../components/header/HamburgerMenu";
import HeaderPhone from "../components/header/HeaderPhone";

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
      <HeaderPhone />
      <Box>
        {children}
      </Box>
    </Box>
  );
}
// <HeaderLogo />
// <NavLinks />
//   <SignOutButton />
