import { fetchImproved } from "@/app/fetch";
import { Box, VStack, Container, Heading, Divider, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { EventEvent, EventOrder } from "@/app/interfaces";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";

import dynamic from 'next/dynamic';
import { redirect } from "next/navigation";

const OrdersTable = dynamic(
  () => import('@/app/components/my-events/OrdersTable'),
  { ssr: false }
);

const EventDetails = dynamic(
  () => import('@/app/components/my-events/EventDetails'),
  { ssr: false }
);

export default async function EventPage() {
  let event: EventEvent;
  let orders: EventOrder[] = [];
  let eventError = null;
  let ordersError = null;
  const session = await auth();
  const activeUser: any = session?.user;
  const userToken = activeUser?.accessToken;

  async function fetchActiveEvents() {
    "use server";
    const newEvent = await fetch(`${process.env.BACKEND_URL}/api/events/active`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    }).then((value) => value.json());

    return newEvent;
  }

  try {
    event = await fetchActiveEvents();
  } catch (error) {
    eventError = "Failed to fetch event details.";
    console.error("Error fetching event:", error);
    redirect('/home')
    return (
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

  async function fetchAllOrdersOfThisEvent() {
    "use server";
    const newOrders = await fetchImproved(`/api/orders/event/${event.eventId}`);
    return newOrders;

  }

  if (event) {
    try {
      orders = await fetchAllOrdersOfThisEvent();
    } catch (error) {
      ordersError = "Failed to fetch orders.";
      console.error("Error fetching orders:", error);
      return (
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
      const response = await fetch(`${process.env.BACKEND_URL}/api/events/update?eventId=${eventID}&status=${status}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to update event status");
      }

    } catch (error) {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update?orderId=${orderId}&status=${status}`, {
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
            <EventDetails startEvent={event} orders={orders} setStatusOfEvent={setStatusOfEvent} fetchActiveEvents={fetchActiveEvents} />
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
              <OrdersTable startOrders={orders} setStatusOfTheOrder={setStatusOfTheOrder} fetchAllOrdersOfThisEvent={fetchAllOrdersOfThisEvent} />
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}




