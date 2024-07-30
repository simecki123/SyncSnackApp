import { Box, Button, Heading, Select, Textarea, VStack, useToast, FormControl, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function CreateEvent({ activeUser }: any) {
  const toast = useToast();

  const [eventData, setEventData] = useState({
    creatorId: activeUser.id,
    title: `Event by ${activeUser.firstName}`,
    description: '',
    groupId: activeUser.groupId,
    eventType: 'FOOD',
    pendingTime: 5
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!activeUser) {
      toast({
        title: 'Authentication Error',
        description: 'Please log in to create an event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (eventData.description.trim() === '') {
      toast({
        title: 'Validation Error',
        description: 'Description is required.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeUser?.accessToken}`
        },
        body: JSON.stringify({
          title: eventData.title,
          description: eventData.description,
          eventType: eventData.eventType,
          pendingTime: eventData.pendingTime
        }),
      });

      console.log(activeUser?.accessToken)

      if (response.ok) {
        toast({
          title: 'Event Created',
          description: 'Your event has been successfully created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setEventData({
          creatorId: activeUser.id,
          title: `Event by ${activeUser.firstName}`,
          description: '',
          groupId: activeUser.groupId,
          eventType: '',
          pendingTime: 5
        }); // Reset form data
      } else if (response.status === 400) {
        toast({
          title: 'Event Creation Failed',
          description: 'You can\'t make a new event because you already have an event in progress.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Event Creation Failed',
          description: 'Something went wrong. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'An error occurred while connecting to the server.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center" color="orange.600">
        Create New Event
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start">
          <FormControl id="pendingTime" isRequired>
            <FormLabel>Select time:</FormLabel>
            <Select name="pendingTime" value={eventData.pendingTime} onChange={handleChange}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </Select>
          </FormControl>

          <FormControl id="eventType" isRequired>
            <FormLabel>Select category:</FormLabel>
            <Select name="eventType" value={eventData.eventType} onChange={handleChange}>
              <option value='FOOD'>Food</option>
              <option value='COFFEE'>Coffee</option>
              <option value='MIXED'>Mixed</option>
              <option value='DRINKS'>Drinks</option>
            </Select>
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description:</FormLabel>
            <Textarea
              name="description"
              resize="none"
              placeholder='Enter description here...'
              value={eventData.description}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="orange" width="100%" type="submit">
            Create Event
          </Button>
        </VStack>
      </form>
    </Box>
  );
}