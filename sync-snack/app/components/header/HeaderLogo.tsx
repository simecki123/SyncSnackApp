import { Box, Link } from "@chakra-ui/react";
import SyncSnackLogo from "./SyncSnackLogo";

export default function HeaderLogo() {
  return (
    <Link href="/home">
      <Box className="dark:bg-orange-500 bg-orange-100 rounded-xl m-4">
        <SyncSnackLogo />
      </Box>
    </Link>
  )
}
