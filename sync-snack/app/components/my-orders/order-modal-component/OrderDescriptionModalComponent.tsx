import React from 'react';
import { Box, Text, VStack, Heading, Button } from '@chakra-ui/react';

interface OrderModalComponentProps {
  description: string;
  onClose: () => void;
}

export default function OrderDescriptionModalComponent({ description, onClose }: OrderModalComponentProps) {
  return (
    <Box 
      
    >
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">Description</Heading>
        <Text fontSize="md" textAlign="justify">{description}</Text>
        <Button colorScheme="orange" onClick={onClose}>
          Close
        </Button>
      </VStack>
    </Box>
  );
}