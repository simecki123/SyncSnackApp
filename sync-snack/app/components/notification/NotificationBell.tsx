'use client'
import { Box, Text, useDisclosure } from "@chakra-ui/react";
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

export default function NotificationBell({ activeUser }: any) {

  const [notificationState, setNotificationState] = useState(false)
  const clientRef = useRef<Client | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message: any) => {
          console.log('Received:', message);
          if (containsNewOrderPattern(message.body)) {
            setMessages(prev => [...prev, getOrderId(message.body)]);
            setNotificationState(true)
          } else {
            console.log('wierd')
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
    <Box className={clsx("fixed top-4 right-4 py-2 px-4 rounded-md shadow-md", {
      "bg-red-500 animate-[wiggle_0.3s_ease-in-out_infinite]": notificationState
    })}>
      <BellIcon className="size-8" onClick={() => {
        onOpen()
        setNotificationState(false)
      }} />
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Notifications</DrawerHeader>
          <DrawerBody>
            {messages.map(async (value, index) => {
              const order = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${value}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${activeUser?.accessToken}`
                },
              }).then((value) => value.json())

              const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/${order.userProfileId}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${activeUser?.accessToken}`
                },
              }).then((value) => value.json())

              return (
                <Box key={index} className="border-black border-2 mb-2">
                  <Text className="p-10">{user.firstName} {user.lastName}</Text>
                  <Text>{order.additionalOptions.orderDetails}</Text>
                </Box>
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

function containsNewOrderPattern(jsonString: string): boolean {
  try {
    // Parse the JSON string
    const parsedObject = JSON.parse(jsonString);

    // Check if the description property contains the required pattern
    return parsedObject.description === "New order was placed for your event";
  } catch (error) {
    return false;
  }
}

function getOrderId(jsonString: string): string {
  const parsedObject = JSON.parse(jsonString);
  return parsedObject.orderId
}
