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
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* For smaller screens */}
      <div className="block md:hidden">
        <header className="bg-gray-100 dark:bg-gray-900 w-full p-4 flex items-center justify-between">
          <HeaderLogo />
          <SignOutButton />
        </header>
        <nav className="bg-gray-100 dark:bg-gray-900 w-full">
          <NavLinks />
        </nav>
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>

      {/* For larger screens */}
      <div className="hidden md:flex h-screen">
        <div className="flex-col w-64 bg-gray-100 dark:bg-gray-900">
          <header className="p-4">
            <HeaderLogo />
          </header>
          <NavLinks />
          <Box className="flex-grow flex items-end justify-center p-2">
            <SignOutButton />
          </Box>
        </div>

        {/* Main content area */}
        <div className="flex-grow   p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
