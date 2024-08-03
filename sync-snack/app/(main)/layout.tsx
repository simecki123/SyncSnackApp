import { redirect } from "next/navigation";
import { auth } from "../auth";
import NavLinks from "../components/header/NavLinks";
import HeaderLogo from "../components/header/HeaderLogo";
import { SignOutButton } from "../components/header/SignOutButton";
import { Box } from "@chakra-ui/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen dark:bg-gray-800">
      <div className="flex flex-col">
        <div className="max-md:hidden">
          <HeaderLogo />
        </div>
        <NavLinks />
        <Box className="grow flex items-end">
          <Box className="w-full flex justify-center p-2">
            <SignOutButton />
          </Box>
        </Box>
      </div>
      {/*
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>
       */}
      <div className="grow">
        {children}
      </div>
    </div>
  );
}

