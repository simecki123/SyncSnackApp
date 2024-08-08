import { auth } from "@/app/auth";
import InProgressEvents from "@/app/components/in-progress-events/InProgressEvents";
import BrewComponent from "@/app/components/submit-button-components/brew";
import { Box } from "@chakra-ui/react";

export default async function HomePage() {

  const session = await auth();
  const activeUser: any = session?.user;
  console.log(activeUser, ' >>> Authenticated user')

  // Create WebSocket connection.
  const socket = new WebSocket("ws://localhost:8080/ws");

  // Connection opened
  socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });


  return (
    <Box >
      <BrewComponent activeUser={activeUser}></BrewComponent>

      <Box className="flex items-center justify-center">
        <InProgressEvents />
      </Box>
    </Box>
  );
}
