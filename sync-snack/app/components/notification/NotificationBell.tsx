'use client'
import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { BellIcon, BellSnoozeIcon } from "@heroicons/react/24/outline";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { parse } from "path";
import { useRouter } from "next/navigation";

export default function NotificationBell({ activeUser }: any) {

  const router = useRouter()
  const [notificationState, setNotificationState] = useState(false)
  const clientRef = useRef<Client | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message: any) => {
          if (message.body !== "CONNECTED") {
            setMessages(prev => [message.body, ...prev]);
            setNotificationState(true)
          }
        });
        client.publish({ destination: `/topic/orders/${activeUser.userProfileId}`, body: 'CONNECTED' });
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
  }, [activeUser.userProfileId]);
  return (
    <Box className={clsx("md:fixed md:top-4 md:right-4 md:py-2 md:px-4 rounded-md md:shadow-md", {
      "md:bg-red-500 shadow-md bg-orange-300 animate-[wiggle_0.3s_ease-in-out_infinite]": notificationState
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

              return (
                <Box className="flex shadow-lg mb-2 hover:bg-gray-100" onClick={() => {
                  router.push('/event')
                  onClose()
                }}>
                  <Image boxSize={20} className="rounded-full mr-2 mt-6 ml-4" src={value.profilePhoto} fallbackSrc="/profile_picture.png" />
                  <Box className="flex flex-col mt-6 grow">
                    <Box className="flex">
                      <Text className="mr-1 font-semibold">{value.firstName} {value.lastName}</Text>
                      <Text className="italic">made an order</Text>
                    </Box>
                    <Text>{value.additionalOptions.orderDetails}</Text>
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

