'use client'
import { Box, Button, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
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
import useNotificationStore from '@/app/store/notificationStore'; // Import the Zustand store
import useNotificationEventPageStore from '@/app/store/notificationEventPageStore';
import useNotificationEventPageOrdersStore from '@/app/store/notificationEventPageOrdersStore';

export default function NotificationBell({ activeUser }: { activeUser: any }) {

  const [clientNotifications, setClientNotifications] = useState<any[]>([])
  const router = useRouter()
  const [notificationState, setNotificationState] = useState(false)
  const clientRef = useRef<Client | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [messages, setMessages] = useState<string[]>([]);
  const toast = useToast()
  const id = 'toast-id'
  const [page, setPage] = useState(0)
  const [showButton, setShowButton] = useState(true);
  const { setHasNewEventNotification } = useNotificationStore(); // Use the Zustand store
  const { setHasNewEventPageNotification } = useNotificationEventPageStore(); // use the Zustand store
  const { setNewOrderForYourEventNotification } = useNotificationEventPageOrdersStore(); // use the Zustand store

  const hasEffectRun = useRef(false);

  useEffect(() => {

    if (hasEffectRun.current) return;
    hasEffectRun.current = true;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/recipient?page=${page}&size=7`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeUser?.accessToken}`
      }
    }).then((res) => {
      if (!res.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
      .then((value) => {
        if (typeof value !== 'undefined') {
          value.map((notification: any) => {
            const stringNotification = JSON.stringify(notification);
            setMessages(prev => [...prev, stringNotification]);
          });
        }
        setClientNotifications(value)
        hasEffectRun.current = false
      }).catch((e: any) => {
        setShowButton(false)
      })
  }, [page])


  useEffect(() => {
    if (typeof clientNotifications !== 'undefined') {
      clientNotifications.map((notification) => {
        const stringNotification = JSON.stringify(notification);
        setMessages(prev => [...prev, stringNotification]);
      });
    }
  }, []);

  const handleNewNotificationNewEventHome = () => {
    eventBusHome.dispatch('newNotification', { filter: 'ALL' });
  };



  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      onConnect: () => {
        client.subscribe(`/topic/orders/${activeUser.userProfileId}`, (message: any) => {
          console.log('new order: ', message.body)
          setMessages(prev => [message.body, ...prev]);
          setNotificationState(true);
          setNewOrderForYourEventNotification(true);

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
          eventNotification.notificationType = 'EVENT'
          const event = JSON.stringify(eventNotification)
          console.log('new event: ', message.body)
          if (eventNotification.userProfileId !== activeUser.userProfileId) {
            setMessages(prev => [event, ...prev]);

            setNotificationState(true)
            handleNewNotificationNewEventHome();
            setHasNewEventNotification(true);

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
          } else {
            setHasNewEventPageNotification(true);
          }
        })
      },
      onDisconnect: () => {
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

  function handleClick() {
    setPage((prev) => prev + 1)
  }

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
          <DrawerHeader onClick={onClose} borderBottomWidth='1px'>Notifications</DrawerHeader>
          <DrawerBody>
            {messages.map((notification: any, index) => {
              notification = JSON.parse(notification)
              let isEventNotification = false;
              if (notification.notificationType === 'EVENT') {
                isEventNotification = true;
              }

              return (
                <Box key={index} className="flex shadow-lg mb-2 hover:bg-gray-100" onClick={() => {
                  router.push('/event')
                  onClose()
                }}>
                  {notification.profilePhoto ?
                    <Image boxSize={20} className="rounded-full mr-2 mt-6 ml-4" src={notification.profilePhoto} objectFit='cover'
                      fallbackSrc="/profile_picture.png" />
                    :
                    <Image boxSize={20} className="rounded-full mr-2 mt-6 ml-4" src={notification.photoUri} objectFit='cover'
                      fallbackSrc="/profile_picture.png" />
                  }
                  <Box className="flex flex-col mt-6 grow">
                    <Box className="flex">
                      <Text className="mr-1 font-semibold">{notification.firstName} {notification.lastName}</Text>
                      {isEventNotification ?
                        <Text className="italic">created an event</Text> :
                        <Text className="italic">made an order</Text>
                      }
                    </Box>
                    {isEventNotification ?
                      <Text>{notification.description}</Text> :
                      <Text>{notification.additionalOptions?.description && notification.additionalOptions?.description}</Text>
                    }
                    <Box className="flex items-end justify-end grow">
                      <Box className="flex items-center p-2 mr-2">
                        <Box className="mr-1 size-2 rounded-full bg-blue-400"></Box>
                        <Text>{getRelativeTimeString(notification.createdAt)}</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
            {showButton &&
              <Box className="flex justify-center" >
                <Button onClick={handleClick}>Load more</Button>
              </Box>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

function getRelativeTimeString(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const diffTime = currentDate.getTime() - inputDate.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 3600));
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  if (diffMinutes < 5) {
    return "Just Now";
  } else if (diffMinutes < 20) {
    return "5 Minutes Ago";
  } else if (diffMinutes < 60) {
    return "20 Minutes Ago";
  } else if (diffHours < 2) {
    return "An Hour Ago";
  } else if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return "A Few Days Ago";
  } else if (diffDays < 30) {
    return "A Week Ago";
  } else if (diffDays < 60) {
    return "A Month Ago";
  } else {
    return "Long Long Time Ago";
  }
}
