"use client";
import React from 'react';

import { Box, Button, Text, VStack, HStack, Badge, useToast, Flex, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { EventOrder } from '@/app/interfaces';

export default function OrderCards({ order, setStatusOfTheOrder }: {
  order: EventOrder,
  setStatusOfTheOrder: (status: string, orderId: string) => Promise<string>
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [actionStatus, setActionStatus] = React.useState("");
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();


  const onClose = () => setIsOpen(false);

  const handleStatusChange = (status: string) => {
    setActionStatus(status);
    setIsOpen(true);
  };

  async function patchOrderStatus() {
    onClose();
    try {
      const response = await setStatusOfTheOrder(actionStatus, order.orderId);
      if (response === "SUCCESS") {
        toast({
          title: "Status updated",
          description: "The order status has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          colorScheme: 'xblue'
        });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      toast({
        title: "Failed to update status",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: 'xred'
      });
    }

  }

  return (
    <Box borderWidth={1} borderRadius="lg" p={3} boxShadow="md" bg="white" h="100%">
      <VStack align="stretch" spacing={2} h="100%">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
            {order.firstName} {order.lastName}
          </Text>
          <Badge colorScheme={order.status === "In Progress" ? "yellow" : order.status === "done" ? "green" : "red"} fontSize="xs">
            {order.status}
          </Badge>
        </Flex>
        <Text fontSize="xs" color="gray.600" noOfLines={2}>
          {order.additionalOptions?.orderDetails ? JSON.stringify(order.additionalOptions.orderDetails) :
            JSON.stringify(order.additionalOptions.description)}
        </Text>
        <Flex mt="auto" pt={2} justify="space-between">
          <Button size="xs" colorScheme="green" onClick={() => handleStatusChange("COMPLETED")}>
            Done
          </Button>
          <Button size="xs" colorScheme="red" onClick={() => handleStatusChange("CANCELLED")}>
            Cancel
          </Button>
        </Flex>
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Status Change
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to change the status of this order?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={patchOrderStatus} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )

}
