import React, { useEffect, useState } from 'react';
import { Box, Button, Textarea, VStack, Heading, useColorModeValue, useToast, Select, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Image } from '@chakra-ui/react';
import { Event, OrderFoodProps } from '@/app/interfaces';

import suggarIcon from '@/public/sugar.png';
import milkIcon from '@/public/milk.png';
import RadioButtonsCoffeeType from './RadioButtonsCoffeeType';

export default function OrderFood({ event, activeUser, onOrderSuccess }: OrderFoodProps) {
  const [orderText, setOrderText] = useState('');
  const [sugar, setSugar] = useState(0);
  const [milk, setMilk] = useState(0);
  const toast = useToast();
  const [value, setValue] = useState('latte')

  const handleSubmit = async (e: any) => {
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
            coffeeType: value,
            description: orderText,
            sugar,
            milk,
          }
        }),
      });

      console.log(orderResponse);

      if (orderResponse.ok) {
        toast({
          title: "Order placed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setOrderText('');
        //SET NOTIF FIRE EVENT

        setSugar(0);
        setMilk(0);
        onOrderSuccess();

      } else {
        if (orderResponse.status === 409) {
          toast({
            title: "You already have an order for that event",
            status: "error",
            duration: 3000,
            isClosable: true,
            colorScheme: 'xred'
          });
        } else {
          throw new Error('Failed to place order');
        }
      }
    } catch (error) {

      console.error('Error placing order:', error);
      toast({
        title: "Failed to place order",
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: 'xred'
      });
    }
  }

  const getThumbSize = (value: number) => 20 + value * 4; // Dynamically calculate thumb size

  const renderSlider = (value: number, setValue: (val: number) => void, icon: string, label: string, color: string) => (
    <Box width="full" position="relative" height="40px">
      <Slider
        aria-label={`${label.toLowerCase()}-slider`}
        defaultValue={0}
        min={0}
        max={5}
        step={1}
        value={value}
        onChange={setValue}
      >
        <SliderTrack bg={`gray.100`}>
          <SliderFilledTrack bg={color} />
        </SliderTrack>
        <SliderThumb boxSize="20px">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width={`${getThumbSize(value)}px`}
            height={`${getThumbSize(value)}px`}
            transition="all 0.2s"
          >
            <Image
              src={icon}
              alt={label}
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
        </SliderThumb>
      </Slider>
    </Box>
  );



  if (event.eventType === "COFFEE") {
    return (
      <Box
        p={8}
        width="100%"
        mx="auto"
        my={8}
        borderRadius="md"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <RadioButtonsCoffeeType value={value} setValue={setValue} />
          {renderSlider(sugar, setSugar, suggarIcon.src, "Sugar", "xorange.500")}
          {renderSlider(milk, setMilk, milkIcon.src, "Milk", "xblue.500")}
          <Textarea
            placeholder="Details..."
            size="md"
            resize="none"
            maxHeight="150px"
            focusBorderColor="orange.400"
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
            maxLength={80}
          />
          <Button
            colorScheme="xorange"
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

  return (
    <Box
      p={8}
      width="100%"
      mx="auto"
      my={8}
      borderRadius="md"
    >
      <VStack spacing={6} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl">
          Place your order here:
        </Heading>
        <Textarea
          placeholder="Enter your food order here..."
          size="lg"
          resize="none"
          minHeight="150px"
          focusBorderColor="xorange.500"
          value={orderText}
          onChange={(e) => setOrderText(e.target.value)}
          maxLength={80}
        />
        <Button
          colorScheme="xorange"
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
