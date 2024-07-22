"use client";
import { Box, Image, Text, useColorModeValue, keyframes } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import logo from '@/public/logo.png';

interface Event {
  _id: string;
  creatorId: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
}

interface InProgressEventCardProps {
  event: Event;
}

export default function InProgressEventCard({ event }: InProgressEventCardProps) {
  const [userProfile, setUserProfile] = useState<{ firstName: string; lastName: string } | null>(null);

  // Dummy user profiles
  const userProfiles = [
    {
      firstName: "Teo",
      lastName: "Jaksic",
    },
    {
      firstName: "Karlo",
      lastName: "Kovačević",
    },
  ];

  // Set user profile based on event ID
  useEffect(() => {
    if (event._id === "1") {
      setUserProfile(userProfiles[0]);
    } else {
      setUserProfile(userProfiles[1]);
    }
  }, [event._id]);

  // Handle card click
  const handleMakeOrder = () => {
    console.log("Event card has been clicked");
  };

  // Define styles for the box
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  // Keyframes for blinking animation
  const blink = keyframes`
    50% { opacity: 0; }
  `;

  return (
    <Box
      onClick={handleMakeOrder}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg={cardBgColor}
      _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
      transition="background 0.2s"
      h="200px" // Fixed height for all cards
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
        animation={`${blink} 3s infinite`} // Apply blinking animation
      />
      {userProfile ? (
        <Text fontWeight="bold">
          Event by {userProfile.firstName} {userProfile.lastName}
        </Text>
      ) : (
        <Text fontWeight="bold">Loading...</Text>
      )}
      <Text mt={2}>{event.description}</Text>
    </Box>
  );
}
