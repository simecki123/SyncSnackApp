"use client";
import React from 'react';

import { Box, Button, Text, VStack, HStack, Badge, useToast, Collapse, useDisclosure, Icon, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Heading } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { EventOrder, EventEvent } from '@/app/interfaces';

export default function EventDetails({ event, orders, setStatusOfEvent }: { 
  event: EventEvent,
  orders: Array<EventOrder>,
  setStatusOfEvent: (status: string, eventId: string) => Promise<string> 
}) {
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [actionStatus, setActionStatus] = React.useState("");
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleStatusChange = (status: string) => {
    setActionStatus(status);
    setIsDialogOpen(true);
  };

  const onCloseDialog = () => setIsDialogOpen(false);

  async function handleConfirmStatusChange() {
    onCloseDialog();
    try {
      const response = await setStatusOfEvent(actionStatus, event.eventId);
      if (response === "SUCCESS") {

        toast({
          title: `Event ${actionStatus === "cancel" ? "cancelled" : "finished"}`,
          description: `The event and all its orders have been marked as ${actionStatus}.`,
          status: actionStatus === "cancel" ? "warning" : "success",
          duration: 3000,
          isClosable: true,
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
      });
    }
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
            <Button colorScheme="red" onClick={() => handleStatusChange("CANCELLED")}>
              Cancel event
            </Button>
            <Button colorScheme="green" onClick={() => handleStatusChange("COMPLETED")}>
              Finish event
            </Button>
          </HStack>
        </VStack>
      </Collapse>

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Status Change
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to change the status of this event to "{actionStatus}"?
            </AlertDialogBody>


            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDialog}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={handleConfirmStatusChange} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );

}
