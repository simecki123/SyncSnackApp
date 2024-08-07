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
      <div className="flex h-screen">
        <div className="flex flex-col h-full w-64 bg-gray-100 dark:bg-gray-900">
          <header className="p-4">
            <HeaderLogo />
          </header>
          <div className="flex flex-col flex-grow">
            <NavLinks />
            <div className="mt-auto p-4">
              <SignOutButton />
            </div>
          </div>
        </div>
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
