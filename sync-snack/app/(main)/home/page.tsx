import { auth } from "@/app/auth";
import InProgressEvents from "@/app/components/in-progress-events/InProgressEvents";
import BrewComponent from "@/app/components/submit-button-components/brew";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default async function HomePage() {

  const session = await auth();
  const activeUser: any = session?.user;

  return (

    <Box >
      <BrewComponent activeUser={activeUser}></BrewComponent>

      <Box className="flex items-center justify-center">
        <a href={'/event'}>event</a>
        <InProgressEvents />
      </Box>
    </Box>
  );
}
