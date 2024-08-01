import EventDetails from "@/app/components/my-events/EventDetails";
import OrderCards from "@/app/components/my-events/order-card/OrderCards";
import { Box, VStack, Container, Heading, Divider, SimpleGrid } from "@chakra-ui/react";

export default function EventPage() {

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <EventDetails event={event} orders={orders} />
        <Divider my={6} borderColor="orange.300" />
        <Heading as="h2" size="xl" color="orange.600" mb={4}>
          Orders
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {orders.map((order, key) => (
            <OrderCards key={key} order={order} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}


// Dummy data for event... for now
const event = {
  _id: "1",
  title: "Brewing coffee",
  description: "Pravin tursku kavu ko bi tija nek mi odma kaze da znan.",
  status: "Pending",
  eventType: "Coffee",
};

// Dummy data for orders
const orders = [
  {
    _id: "1",
    status: "In Progress",
    additionalOptions: "Ej brate aj meni stavi samo malo mlika i nez kolko cukra stavis, poduplaj cukar",
    user: {
      _id: "1",
      firstName: "Mile",
      lastName: "Kornjaca",
    }
  },
  {
    _id: "2",
    status: "In Progress",
    additionalOptions: "Aj napravi i malom Peri zaspa mi je tu.",
    user: {
      _id: "1",
      firstName: "Mile",
      lastName: "Kornjaca",
    }
  },
  {
    _id: "3",
    status: "In Progress",
    additionalOptions: "Ni cukar ni mliko, volin kad mi grlo progori",
    user: {
      _id: "1",
      firstName: "Jeff",
      lastName: "Strongman",
    }
  }
];

