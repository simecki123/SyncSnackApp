import { auth } from "@/app/auth";
import InProgressEvents from "@/app/components/in-progress-events/InProgressEvents";
import BrewComponent from "@/app/components/submit-button-components/brew";
import { Box } from "@chakra-ui/react";

export default async function HomePage() {

  const session = await auth();
  const activeUser: any = session?.user;
  const userToken = activeUser?.accessToken;
  
  
  return (
    <Box >
      <BrewComponent activeUser = {activeUser}></BrewComponent>

      <Box className="flex items-center justify-center">
        <InProgressEvents></InProgressEvents>
      </Box>
    </Box>
  );
}
