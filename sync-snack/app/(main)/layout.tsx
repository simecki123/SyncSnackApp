import { redirect } from "next/navigation";
import { auth } from "../auth";
import HeaderLogo from "../components/header/HeaderLogo";
import { SignOutButton } from "../components/header/SignOutButton";
import { Box, Text } from "@chakra-ui/react";
import HeaderPhone from "../components/header/HeaderPhone";
import NavLinksWeb from "../components/header/NavLinksWeb";
import NotificationBell from "../components/notification/NotificationBell";
import { fetchImproved } from "../fetch";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const activeUser: any = session?.user
  console.log(activeUser)
  if (!activeUser) {
    redirect('/login');
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/notifications/recipient?page=0`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  })
  const notifications: any[] = await res.json()

  return (

    <Box>
      <Box className="md:hidden">
        <HeaderPhone activeUser={activeUser} notifications={notifications} />
        {children}
      </Box>
      <Box className="hidden md:flex md:h-screen">
        <NotificationBell activeUser={activeUser} notifications={notifications} />
        <Box className="flex flex-col">
          <HeaderLogo />
          <NavLinksWeb />
          <Box className="flex grow items-end">
            <SignOutButton />
          </Box>
        </Box>
        <Box className="w-screen grow">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
