import { Box, Button, Center, Flex, Heading, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function CreateEvent() {
  return (
    <Box
      
      maxW="l"
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
      <form>
        <VStack spacing={4} align="start">
          <Box w="100%">
            <Text fontWeight="bold" mb={1}>Select time:</Text>
            <Select placeholder='Select option'>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </Select>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold" mb={1}>Select category:</Text>
            <Select placeholder='Select option'>
              <option value='Food'>Food</option>
              <option value='Coffee'>Coffee</option>
              <option value='Mixed'>Mixed</option>
              <option value='Drinks'>Drinks</option>
            </Select>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold" mb={1}>Description:</Text>
            <Textarea resize="none" placeholder='Enter description here...' />
          </Box>

          <Button colorScheme="orange" width="100%">Create Event</Button>
        </VStack>
      </form>
    </Box>
  );
}
