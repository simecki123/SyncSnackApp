import React, { useState } from 'react';
import { Box, Button, Textarea, VStack, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { Event, OrderFoodProps } from '@/app/interfaces';
import { Client } from '@stomp/stompjs';

export default function OrderFood({ event, activeUser, onOrderSuccess }: OrderFoodProps) {
  const [orderText, setOrderText] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeUser?.accessToken}`
        },
        body: JSON.stringify({
          userProfileId: activeUser?.userProfileId,
          eventId: event.eventId,
          additionalOptions: {
            orderDetails: orderText
          }
        }),
      });

      if (orderResponse.ok) {
        toast({
          title: "Order placed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setOrderText('');
        onOrderSuccess(); // Close the modal

        // const client = new Client();
        // client.brokerURL = 'ws://localhost:8080/ws'
        //
        // client.onConnect = function(frame) {
        //   client.publish({ destination: '/topic/orders', body: 'Hello world' });
        // };
        //
        // client.activate()
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Failed to place order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.700')}
      p={8}
      borderRadius="lg"
      boxShadow="md"
      maxWidth="500px"
      mx="auto"
      my={8}
    >
      <VStack spacing={6} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl" color={useColorModeValue('gray.800', 'white')}>
          Place your order here:
        </Heading>
        <Textarea
          placeholder="Enter your food order here..."
          size="lg"
          resize="none"
          minHeight="150px"
          focusBorderColor="orange.400"
          value={orderText}
          onChange={(e) => setOrderText(e.target.value)}
        />
        <Button
          colorScheme="orange"
          size="lg"
          width="full"
          type="submit"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Place Order
        </Button>
      </VStack>
    </Box>
  );
}
