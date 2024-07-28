import { Box, Link } from "@chakra-ui/react";
import SyncSnackLogo from "./SyncSnackLogo";

export default function HeaderLogo() {
  return (
    <Link href="/home">
      <Box className="bg-orange-300 rounded-xl p-2 m-4">
        <SyncSnackLogo />
      </Box>
    </Link>
  )
}
