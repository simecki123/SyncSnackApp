import { Box, Image, Text } from "@chakra-ui/react";
import SyncSnackLogo from "./SyncSnackLogo";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/home">
      <Box className="bg-gray-100 rounded-xl m-4 py-2 w-full">
        <Box className="flex justify-center ">
          <Image alt="logo" src="/Group2.png" className="h-20 w-54 pl-2" />
        </Box>
        <Text className="flex justify-center font-bold text-3xl text-black">SyncSnack</Text>
      </Box>
    </Link>
  )
}
