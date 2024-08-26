import { Box, Button } from "@chakra-ui/react";
import Hanged from "../components/animations/Hanged";

export default function AreaClient() {
  return (
    <Box bg="" padding={10}>
      <Button colorScheme="xblue">press</Button>
      <Button colorScheme="xorange">press</Button>
      <Button colorScheme="xred">press</Button>
      <Hanged />
    </Box>
  )
}
