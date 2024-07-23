import LoginForm from "@/app/components/login/LoginForm";
import { Box } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box className="flex h-screen items-center justify-center bg-prim-cl">
      <LoginForm />
    </Box>
  )
}
