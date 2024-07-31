"use client";

import React from 'react';
import { Box, Button, Text, VStack, HStack, Badge, useToast, Flex } from '@chakra-ui/react';
import {EventOrder}  from '@/app/interfaces';

export default function OrderCards({ order }: { order: EventOrder }) {
    const toast = useToast();

    function setStatusOfTheOrder(status: string) {
        order.status = status;
        // Patch order on database and revalidate page
        toast({
            title: `Order ${status}`,
            description: `The order has been marked as ${status}.`,
            status: status === "done" ? "success" : "warning",
            duration: 3000,
            isClosable: true,
        });
    }
   
    return (
        <Box borderWidth={1} borderRadius="lg" p={3} boxShadow="md" bg="white" h="100%">
            <VStack align="stretch" spacing={2} h="100%">
                <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                        {order.user.firstName} {order.user.lastName}
                    </Text>
                    <Badge colorScheme={order.status === "In Progress" ? "yellow" : order.status === "done" ? "green" : "red"} fontSize="xs">
                        {order.status}
                    </Badge>
                </Flex>
                <Text fontSize="xs" color="gray.600" noOfLines={2}>
                    {order.additionalOptions}
                </Text>
                <Flex mt="auto" pt={2} justify="space-between">
                    <Button size="xs" colorScheme="green" onClick={() => setStatusOfTheOrder("done")}>
                        Done
                    </Button>
                    <Button size="xs" colorScheme="red" onClick={() => setStatusOfTheOrder("cancelled")}>
                        Cancel
                    </Button>
                </Flex>
            </VStack>
        </Box>
    )
}