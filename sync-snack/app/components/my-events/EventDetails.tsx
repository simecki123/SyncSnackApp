"use client";
import { Box, Button, Text, VStack, HStack, Badge, useToast, Heading, Collapse, useDisclosure, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React from 'react';

interface Event {
    _id: string,
    title: string,
    description: string,
    status: string,
    eventType: string,
}

interface Order {
    _id: string,
    status: string,
    additionalOptions: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
    }
}

export default function EventDetails({ event, orders }: { event: Event, orders: Array<Order> }) {
    const toast = useToast();
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

    function updateStatusOfEventAndHisOrders(status: string) {
        event.status = status;
        for (const order of orders) {
            order.status = status;
        }
        // Update status of Event on database and with that update status of all orders that belong to it.
        toast({
            title: `Event ${status === "cancel" ? "cancelled" : "finished"}`,
            description: `The event and all its orders have been marked as ${status}.`,
            status: status === "cancel" ? "warning" : "success",
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <Box borderWidth={1} borderRadius="lg" p={6} boxShadow="md" bg="white">
            <HStack justifyContent="space-between" mb={4}>
                <Heading as="h2" size="xl" color="orange.600">{event.title}</Heading>
                <Button onClick={onToggle} variant="ghost">
                    {isOpen ? (
                        <>Hide Details <Icon as={ChevronUpIcon} ml={2} /></>
                    ) : (
                        <>Show Details <Icon as={ChevronDownIcon} ml={2} /></>
                    )}
                </Button>
            </HStack>
            <Collapse in={isOpen} animateOpacity>
                <VStack align="start" spacing={4}>
                    <HStack>
                        <Badge colorScheme={event.status === "Pending" ? "yellow" : "green"}>{event.status}</Badge>
                        <Badge colorScheme="orange">{event.eventType}</Badge>
                    </HStack>
                    <Box>
                        <Text fontWeight="bold" mb={2}>Description:</Text>
                        <Text>{event.description}</Text>
                    </Box>
                    <HStack spacing={4} mt={4}>
                        <Button colorScheme="red" onClick={() => updateStatusOfEventAndHisOrders("cancel")}>
                            Cancel event
                        </Button>
                        <Button colorScheme="green" onClick={() => updateStatusOfEventAndHisOrders("Done")}>
                            Finish event
                        </Button>
                    </HStack>
                </VStack>
            </Collapse>
        </Box>
    )
}