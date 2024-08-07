import { Box, Link, Image } from "@chakra-ui/react";
import SyncSnackLogo from "./SyncSnackLogo";

export default function HeaderLogo() {
  return (
    <Link href="/home">
      <Box className="dark:bg-orange-500 bg-orange-100 rounded-xl m-4">
        <Image alt="logo" src="/logo.png" boxSize={44} className="rounded-full" />
      </Box>
    </Link>
  )
}
