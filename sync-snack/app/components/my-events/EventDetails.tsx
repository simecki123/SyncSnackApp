"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Text, VStack, HStack, Badge, useToast, Collapse, useDisclosure, Icon, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Heading } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { EventOrder, EventEvent } from '@/app/interfaces';
import useNotificationEventPageStore from '@/app/store/notificationEventPageStore';
import { NavLinksContext } from '@/app/providers';
import EventCountdownTimer from '../countdown-timer/EventCountdownTimer';
import InProgressTimer from '../countdown-timer/InProgressTimer';
import useNotificationIfEventExpiredStore from '@/app/store/notificationIfEventExpired';

export default function EventDetails({ startEvent, orders, setStatusOfEvent, fetchActiveEvents }: {
  startEvent: EventEvent,
  orders: Array<EventOrder>,
  setStatusOfEvent: (status: string, eventId: string) => Promise<string>,
  fetchActiveEvents: () => Promise<EventEvent>
}) {
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [actionStatus, setActionStatus] = React.useState("");
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [event, setEvent] = useState(startEvent);
  const { hasNewEventPageNotification, setHasNewEventPageNotification } = useNotificationEventPageStore();
  const { hasNewNotificationIfEventExpiredStore, setHasNewNotificationIfEventExpiredStore } = useNotificationIfEventExpiredStore();
  const [countdown, setCountdown] = useState(true);
  const [isPending, setIsPending] = useState(true);

  const eventContext = useContext(NavLinksContext)

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
        eventContext.setIsEventLinkShown(false)
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
        colorScheme: 'xred'
      });
    }
  }

  useEffect(() => {
    if (hasNewNotificationIfEventExpiredStore !== '') {
      fetchActiveEvents().then(setEvent);
      setHasNewNotificationIfEventExpiredStore('');
      setCountdown(false);
      setIsPending(false);
    }

    if (hasNewEventPageNotification) {
      fetchActiveEvents().then(setEvent);
      setHasNewEventPageNotification(false);
      setCountdown(true);
      setIsPending(true);
    }
  }, [hasNewNotificationIfEventExpiredStore, hasNewEventPageNotification, fetchActiveEvents]);

  useEffect(() => {
    const checkPendingStatus = () => {
      const now = new Date().getTime();
      const pendingUntil = new Date(event.pendingUntil).getTime();
      setIsPending(now < pendingUntil);
    };

    checkPendingStatus();
    const interval = setInterval(checkPendingStatus, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <Box borderWidth={1} borderRadius="lg" p={6} boxShadow="md" bg="white">
      <HStack justifyContent="space-between" mb={4}>
        <Heading as="h2" size="xl" color="orange.600">{event.title}</Heading>
        
        {isPending ? (
          <EventCountdownTimer event={event} />
        ) : (
          <InProgressTimer event={event} handleStatusChange={() => handleStatusChange("CANCELLED")}/>
        )}
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
          <Badge colorScheme={isPending ? "yellow" : "green"}>
            {isPending ? "PENDING" : "IN PROGRESS"}
          </Badge>
            <Badge colorScheme="orange">{event.eventType}</Badge>
          </HStack>
          <Box>
            <Text fontWeight="bold" mb={2}>Description:</Text>
            <Text>{event.description}</Text>
          </Box>
          <HStack spacing={4} mt={4}>
            <Button colorScheme="red" onClick={() => handleStatusChange("CANCELLED")}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={() => handleStatusChange("COMPLETED")}>
              Finish
            </Button>
          </HStack>
        </VStack>
      </Collapse>

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
              Are you sure you want to change the status of this event to {actionStatus}?
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