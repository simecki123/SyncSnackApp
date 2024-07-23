import React from 'react';
import { Box, Button, Textarea, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

export default function OrderFood() {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="lg"
      boxShadow="md"
      maxWidth="500px"
      mx="auto"
      my={8}
    >
      <VStack spacing={6} as="form">
        <Heading as="h2" size="xl" color={textColor}>
          Place your order here:
        </Heading>
        <Textarea
          placeholder="Enter your food order here..."
          size="lg"
          resize="none"
          minHeight="150px"
          focusBorderColor="orange.400"
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