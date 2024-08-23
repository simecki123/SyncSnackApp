import { Box, Link, Image, Text } from "@chakra-ui/react";
import SyncSnackLogo from "./SyncSnackLogo";

export default function HeaderLogo() {
  return (
    <Link href="/home">
      <Box className="bg-orange-100 rounded-xl m-4 py-2 w-full">
        <Box className="flex justify-center ">
          <Image alt="logo" src="/logo2.png" className="rounded-full h-20 w-44 pl-2" />
        </Box>
        <Text className="flex justify-center font-bold text-2xl text-orange-900">SyncSnack</Text>
      </Box>
    </Link>
  )
}
