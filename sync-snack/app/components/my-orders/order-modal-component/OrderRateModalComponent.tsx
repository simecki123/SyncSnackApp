import React, { useState } from 'react'
import { Box, VStack, Heading, HStack, Button, useToast } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { fetchImproved } from '@/app/fetch'
import { StarProps } from '@/app/interfaces'
import { OrdersOrderModalComponentProps } from '@/app/interfaces'

function Star({ value, handleClick, isFull }: StarProps) {
  return (
    <StarIcon
      boxSize={10}
      color={isFull ? "yellow.400" : "gray.300"}
      cursor="pointer"
      onClick={() => handleClick(value)}
      _hover={{ transform: "scale(1.1)" }}
      transition="transform 0.2s"
    />
  )
}



export default function OrderRateModalComponent({ coffeeOrderId, onClose }: OrdersOrderModalComponentProps) {
  const [givenStars, setGivenStars] = useState<number | null>(null)
  const starsValues = [1, 2, 3, 4, 5];
  const toast = useToast();

  const handleRating = async () => {
    if (givenStars) {
      console.log("Stars given:", givenStars, "ID:", coffeeOrderId);
      try {
        // Simulated API call
        // const res = await giveOrderRating({ coffeeOrderId: coffeeOrderId.toString(), ratingUpdate: givenStars });

        // fetchImproved('/api/rating', 'PATCH', { stars: givenStars })

        const res = "Order rated successfully";
        console.log("Update order response:", res);

        toast({
          title: "Rating submitted",
          description: "Thank you for your feedback!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Close the modal after successful submission
        onClose();
      } catch (error) {
        console.error("Error updating order:", error);
        toast({
          title: "Error",
          description: "An error occurred while submitting your rating",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box bg="gray.50" borderRadius="xl" p={8} boxShadow="lg">
      <VStack spacing={6}>
        <Heading size="lg" color="gray.700">Rate Order</Heading>
        <HStack spacing={2}>
          {starsValues.map((value) => (
            <Star
              key={value}
              value={value}
              handleClick={setGivenStars}
              isFull={givenStars !== null && value <= givenStars}
            />
          ))}
        </HStack>
        <Button
          onClick={handleRating}
          colorScheme="orange"
          size="lg"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Submit Rating
        </Button>
      </VStack>
    </Box>
  )
}
