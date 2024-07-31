import RegisterWithLinkForm from "@/app/components/register/RegisterWithLinkForm";
import { Box } from "@chakra-ui/react";

export default function RegisterWithLinkPage({ searchParams }: any) {
  return (
    <Box className="dark:bg-gray-800 flex h-screen items-center justify-center bg-prim-cl">
      <RegisterWithLinkForm searchParams={searchParams} />
    </Box>
  )
}
