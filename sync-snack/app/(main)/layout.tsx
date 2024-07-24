import { redirect } from "next/navigation";
import Header from "../components/header/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const accessDenied = false;
  // here implement the logic is the jwt valid by fetching some basic user data
  if (accessDenied) {
    redirect('/login')
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>
      <div className="mt-24">
        {children}
      </div>
    </div>
  );
}

