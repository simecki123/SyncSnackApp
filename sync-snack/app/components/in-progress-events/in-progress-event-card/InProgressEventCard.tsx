"use client";
import { Box, Image, Text, useColorModeValue, keyframes } from '@chakra-ui/react';
import React, { useState } from 'react';
import logo from '@/public/logo.png';
import Modal from '../../modals/Modal';
import OrderFood from '../../order-food/OrderFood';
import { Event, InProgressEventCardProps } from '@/app/interfaces';
import EventCountdownTimer from '../../countdown-timer/EventCountdownTimer';


export default function InProgressEventCard({ event, activeUser }: InProgressEventCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Define styles for the box
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');
  console.log("event ", event)

  // Keyframes for blinking animation
  const blink = keyframes`
    50% { opacity: 0.5; }
  `;

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

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
        alignItems="center"
      >
        <EventCountdownTimer event={event} />


        <Text fontWeight="bold" mt={2}>{event.title}</Text>
        <Text mt={2}>{event.description}</Text>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <OrderFood event={event} activeUser={activeUser} onOrderSuccess={closeModal} />
      </Modal>
    </>
  );
}
