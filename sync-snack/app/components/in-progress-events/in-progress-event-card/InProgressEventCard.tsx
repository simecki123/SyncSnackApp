"use client";
import { Box, Image, Text, useColorModeValue, keyframes } from '@chakra-ui/react';
import React, { useState } from 'react';
import logo from '@/public/logo.png';
import Modal from '../../modals/Modal';
import OrderFood from '../../order-food/OrderFood';

interface Event {
  _id: string;
  creatorId: string;
  creatorFirstName: string;
  creatorLastName: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
}

interface InProgressEventCardProps {
  event: Event;
}

export default function InProgressEventCard({ event }: InProgressEventCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Handle card click
  const handleMakeOrder = () => {
    console.log("Event card has been clicked");
  };

  // Define styles for the box
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  // Keyframes for blinking animation
  const blink = keyframes`
    50% { opacity: 0.5; }
  `;

  return (
    <>
      <Box
        onClick={() => setModalOpen(true)}
        p={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        bg={cardBgColor}
        _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
        transition="background 0.2s"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" // Center content horizontally
      >
        <Image
          src={logo.src}
          alt="App Logo"
          w="50px"
          h="50px"
          mb={4}
          animation={`${blink} 5s infinite`} // Apply blinking animation
        />
        <Text fontWeight="bold">
          Event by {event.creatorFirstName} {event.creatorLastName}
        </Text>
        <Text mt={2}>{event.description}</Text>
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} >
        <OrderFood />
      </Modal>
    </>
  );
}
