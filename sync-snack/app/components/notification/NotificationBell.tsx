'use client'
import { Box, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import eventBusHome from "@/app/eventBus";
import eventBusEvent from "@/app/eventBusEvent";
import eventBusOrdersEvent from "../../eventBusOrdersEvent";
import { revalidatePath } from "next/cache";

export default function NotificationBell({ activeUser }: any) {
  const router = useRouter()
  const [notificationState, setNotificationState] = useState(false)
  const clientRef = useRef<Client | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState<string[]>([]);
  const toast = useToast()
  const id = 'toast-id'

  const handleNewNotificationNewEventHome = () => {
    console.log('Dispatching newNotification event');
    eventBusHome.dispatch('newNotification', { filter: 'MIXED' });
  };

  const handleNewNotificationNewEventEvent = () => {
    console.log('Dispatching newNotification event event page');
    eventBusEvent.dispatch('newNotification');
  }

  const handleNewNotificationNewOrderEvent = () => {
    console.log('Dispatching newNotification order event page');
    eventBusOrdersEvent.dispatch('newNotification');
  }

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message: any) => {
          setMessages(prev => [message.body, ...prev]);
          setNotificationState(true);
          //handleNewNotificationNewOrderEvent();
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Order',
              description: 'New order on your event',
              status: 'info',
              duration: 5000,
              isClosable: true,
              position: 'top'
            })
          }
        });
        client.subscribe(`/topic/groups/${activeUser.groupId}`, (message: any) => {
          const eventNotification = JSON.parse(message.body) 
          if (eventNotification.userProfileId !== activeUser.userProfileId) { 
            setMessages(prev => [message.body, ...prev]);

            setNotificationState(true)
            handleNewNotificationNewEventHome();

            if (!toast.isActive(id)) {
              toast({
                id,
                title: 'Event',
                description: 'New event in your group',
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: 'top'
              })
            }
          }
        })
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [activeUser.userProfileId, activeUser.groupId, toast, id]);

  return (
    <Box className={clsx("md:fixed md:top-4 md:right-4 md:py-2 md:px-4 rounded-md md:shadow-md", {
      "md:bg-blue-500 shadow-md bg-orange-300 animate-[wiggle_0.3s_ease-in-out_infinite]": notificationState
    })}>
      <BellIcon className="size-8" onClick={() => {
        onOpen()
        setNotificationState(false)
      }} />
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size={'sm'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Notifications</DrawerHeader>
          <DrawerBody>
            {messages.map((value: any, index) => {
              value = JSON.parse(value)
              let isEventNotification = false;
              if (typeof value.additionalOptions?.orderDetails === 'undefined') {
                isEventNotification = true;
              }

              return (
                <Box key={index} className="flex shadow-lg mb-2 hover:bg-gray-100" onClick={() => {
                  router.push('/event')
                  onClose()
                }}>
                  <Image boxSize={20} className="rounded-full mr-2 mt-6 ml-4" src={value.profilePhoto} objectFit='cover'
                    fallbackSrc="/profile_picture.png" />
                  <Box className="flex flex-col mt-6 grow">
                    <Box className="flex">
                      <Text className="mr-1 font-semibold">{value.firstName} {value.lastName}</Text>
                      {isEventNotification ?
                        <Text className="italic">created an event</Text> :
                        <Text className="italic">made an order</Text>
                      }
                    </Box>
                    {isEventNotification ?
                      <Text>{value.description}</Text> :
                      <Text>{JSON.stringify(value.additionalOptions.orderDetails)}</Text>
                    }
                    <Box className="flex items-end justify-end grow">
                      <Box className="flex items-center p-2 mr-2">
                        <Box className="mr-1 size-2 rounded-full bg-blue-400"></Box>
                        <Text>Just now</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
