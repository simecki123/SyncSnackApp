import { auth } from "@/app/auth";
import LoginForm from "@/app/components/login/LoginForm";
import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  // const session = await auth();
  //
  // if (!!session?.user) {
  //   console.log('REDIRECTING TO HOME')
  //   redirect('/home')
  // }

  return (
    <Box className="flex h-screen items-center justify-center bg-prim-cl">
      <LoginForm />
    </Box>
  )
}
