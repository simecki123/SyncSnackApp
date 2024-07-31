import { ProfileUser } from '@/app/interfaces'
import { Box, Button, Text, Flex, VStack, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import RatingPrettyProfile from '../rating-preatty-profile/RatingPreattyProfile';

export default function ProfileData({user}: {user: ProfileUser}) {
  const finalRate = Math.round(user.score);

  return (
    <Box>
      <Heading size="lg" color="orange.500" mb={6}>User Profile</Heading>
      <Flex justifyContent="space-between">
        <VStack align="start" spacing={4} flex={1}>
          <HStack>
            <Text fontWeight="bold" width="100px">First name:</Text>
            <Text>{user.firstName}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" width="100px">Last name:</Text>
            <Text>{user.lastName}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" width="100px">Email:</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" width="100px">Group name:</Text>
            <Text>{user.groupName}</Text>
          </HStack>
          <Button colorScheme="orange" mt={4}>Edit user</Button>
        </VStack>
        
        <VStack align="center" justify="center" spacing={4}>
          <Text fontWeight="bold">Score</Text>
          <Flex alignItems="center">
            <Text fontSize="3xl" fontWeight="bold" mr={2}>{user.score.toFixed(1)}</Text>
            <RatingPrettyProfile rating={finalRate} />
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}