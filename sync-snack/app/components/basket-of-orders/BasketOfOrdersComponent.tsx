'use client'
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, useToast, Image, Text, Button } from '@chakra-ui/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import useNotificationIcreatedOrderStore from '@/app/store/notificationIcreatedOrderStore';

export default function BasketOfOrdersComponent({ activeUser }: { activeUser: any }) {
    
    const router = useRouter();
    const [notificationState, setNotificationState] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orders, setOrders] = useState<string[]>([]);
    const toast = useToast();
    const id = 'toast-id';
    const { hasNewNotificationIcreatedOrderStore, setHasNewNotificationIcreatedOrderStore } = useNotificationIcreatedOrderStore();

    useEffect(() => {
        fetchOrders();

        
    });

    useEffect(() => {
      if (hasNewNotificationIcreatedOrderStore) {
        setNotificationState(true)
        fetchOrders();
      };
        
    })

      function fetchOrders() {
        setOrders([])
      }

    

  return (
    <Box className={clsx("md:fixed md:top-4 md:right-20 md:py-2 md:px-4 rounded-md md:shadow-md", {
      "md:bg-blue-500 shadow-md bg-orange-300 animate-[wiggle_0.3s_ease-in-out_infinite]": notificationState
    })}>
        <ShoppingCartIcon className="size-8" onClick={() => {
          setNotificationState(false)
          onOpen()
          
        }} />
        <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size={'sm'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader onClick={onClose} borderBottomWidth='1px'>Active orders</DrawerHeader>
            <DrawerBody>
              {orders.map((notification: any, index) => {
                
                return (
                  <Box key={index} className="flex shadow-lg mb-2 hover:bg-gray-100" onClick={() => {
                    router.push('/event')
                    onClose()
                  }}>
                    {notification.eventType === "ALL" && (
                          <Image
                            boxSize={20}
                            className="rounded-full mr-2 mt-6 ml-4"
                            src={notification.image} // You can replace this with a specific image for "ALL"
                            objectFit='cover'
                            fallbackSrc="/profile_picture.png"
                          />
                        )}

                        {notification.eventType === "COFFEE" && (
                          <Image
                            boxSize={20}
                            className="rounded-full mr-2 mt-6 ml-4"
                            src={notification.image} // Replace with a specific image for "COFFEE"
                            objectFit='cover'
                            fallbackSrc="/coffee_fallback.png"
                          />
                        )}

                        {notification.eventType === "FOOD" && (
                          <Image
                            boxSize={20}
                            className="rounded-full mr-2 mt-6 ml-4"
                            src={notification.image} // Replace with a specific image for "FOOD"
                            objectFit='cover'
                            fallbackSrc="/food_fallback.png"
                          />
                        )}

                        {notification.eventType === "DRINK" && (
                          <Image
                            boxSize={20}
                            className="rounded-full mr-2 mt-6 ml-4"
                            src={notification.image} // Replace with a specific image for "DRINK"
                            objectFit='cover'
                            fallbackSrc="/drink_fallback.png"
                          />
                        )}

                    <Box className="flex flex-col mt-6 grow">
                      <Box className="flex">
                        <Text className="mr-1 font-semibold">New order {notification.eventType}</Text>
                        
                        <Text className="italic">made an order</Text>
                        
                      </Box>
                        <Text>{notification.additionalOptions?.description && notification.additionalOptions?.description}</Text>
                      
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
