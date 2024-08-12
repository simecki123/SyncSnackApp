import { redirect } from "next/navigation";
import { auth } from "../auth";
import HeaderLogo from "../components/header/HeaderLogo";
import { SignOutButton } from "../components/header/SignOutButton";
import { Box, Text } from "@chakra-ui/react";
import HeaderPhone from "../components/header/HeaderPhone";
import NavLinksWeb from "../components/header/NavLinksWeb";
import NotificationBell from "../components/notification/NotificationBell";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const activeUser: any = session?.user
  if (!activeUser) {
    redirect('/login');
  }

  return (

    <Box>
      <Box className="md:hidden">
        <HeaderPhone />
        {children}
      </Box>
      <Box className="hidden md:flex md:h-screen">
        <NotificationBell activeUser={activeUser} />
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
