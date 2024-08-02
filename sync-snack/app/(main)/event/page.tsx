import EventDetails from "@/app/components/my-events/EventDetails";
import { fetchImproved } from "@/app/fetch";
import { Box, VStack, Container, Heading, Divider, Text, Alert, AlertIcon } from "@chakra-ui/react";
import OrdersTable from "@/app/components/my-events/OrdersTable";
import { EventOrder } from "@/app/interfaces";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";


export default async function EventPage() {
  let event = null;
  let orders: EventOrder[] = [];
  let eventError = null;
  let ordersError = null;
  const session = await auth();
  const activeUser: any = session?.user;
  const userToken = activeUser?.accessToken;

  try {
    event = await fetchImproved('/api/events/active');
  } catch (error) {
    eventError = "Failed to fetch event details.";
    console.error("Error fetching event:", error);
    return(
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mb={4} color="red.500">
          Server is not available,
        </Heading>
        <Heading as="h2" size="xl" mb={4} color="red.500">
        or you dont have any active event yet...
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Please try again later or create an event.
        </Text>
      </Box>
    );
  }

  if (event) {
    try {
      orders = await fetchImproved(`/api/orders/event/${event.eventId}`);
    } catch (error) {
      ordersError = "Failed to fetch orders.";
      console.error("Error fetching orders:", error);
      return(
        <Box textAlign="center" py={10} px={6}>
          <Heading as="h2" size="xl" mb={4} color="red.500">
            Server is not available
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Please try again later.
          </Text>
        </Box>
      );
    }
  }

  async function setStatusOfEvent(status: string, eventID: string) {
    "use server";
    try {
      const response = await fetch(`http://localhost:8080/api/events/update?eventId=${eventID}&status=${status}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to update event status");
      }

    } catch(error) {
      console.error("Error updating event status:", error);
      revalidatePath('/event-page'); // Adjust this path as needed
      return "FAIL";
    }

    revalidatePath('/event-page'); // Adjust this path as needed
    return "SUCCESS";
  }

  async function setStatusOfTheOrder(status: string, orderId: string) {
    "use server";
    try {
      
      const response = await fetch(`http://localhost:8080/api/orders/update?orderId=${orderId}&status=${status}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      revalidatePath('/event-page'); // Adjust this path as needed
      return "FAIL";
    }
    revalidatePath('/event-page'); // Adjust this path as needed
    return "SUCCESS";
  }


  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {eventError ? (
          <Alert status="error">
            <AlertIcon />
            {eventError}
          </Alert>
        ) : !event ? (
          <Alert status="info">
            <AlertIcon />
            <Text fontSize="2xl" fontWeight="bold">You dont have any event yet</Text>
          </Alert>
        ) : (
          <>
            <EventDetails event={event} orders={orders} setStatusOfEvent={setStatusOfEvent} />
            <Divider my={6} borderColor="orange.300" />
            <Heading as="h2" size="xl" color="orange.600" mb={4}>
              Orders
            </Heading>
            {ordersError ? (
              <Alert status="error">
                <AlertIcon />
                {ordersError}
              </Alert>
            ) : orders.length === 0 ? (
              <Alert status="info">
                <AlertIcon />
                There are no orders yet.
              </Alert>
            ) : (
              <OrdersTable orders={orders} setStatusOfTheOrder={setStatusOfTheOrder} />
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}




