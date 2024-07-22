import InProgressEvents from "@/app/components/in-progress-events/InProgressEvents";
import BrewComponent from "@/app/components/submit-button-components/brew";
import { Box } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box >
      <Box>
        <BrewComponent></BrewComponent>
      </Box>
      <Box
      
      display="flex"
      alignItems="center"
      justifyContent="center">
        <InProgressEvents></InProgressEvents>
      </Box>
    </Box>
  );
}
