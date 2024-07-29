import InProgressEvents from "@/app/components/in-progress-events/InProgressEvents";
import BrewComponent from "@/app/components/submit-button-components/brew";
import { Box } from "@chakra-ui/react";

export default async function HomePage() {

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <Box >
      <BrewComponent></BrewComponent>

      <Box className="flex items-center justify-center">
        <InProgressEvents></InProgressEvents>
      </Box>
    </Box>
  );
}
