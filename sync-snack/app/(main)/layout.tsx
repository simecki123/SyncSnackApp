import { redirect } from "next/navigation";
import Header from "../components/header/Header";
import { auth } from "../auth";

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
    <div>
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>
      <div className="mt-20">
        {children}
      </div>
    </div>
  );
}

