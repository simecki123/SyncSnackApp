"use client";
import React, { useState } from 'react'
import { Box, Button, Flex, VStack, useColorModeValue } from '@chakra-ui/react'
import ProfileData from './profile-data/ProfileData'
import GroupData from './group-data/GroupData'
import { SortOption } from '@/app/types/types';

// Mock data for demonstration purposes
const mockUser = {
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  groupName: "Coffee Lovers",
  score: 4.5,
}

const mockGroup = {
  name: "Coffee Lovers",
  description: "A group for coffee enthusiasts",
}

export default function ProfileGroupComponent() {
  const [activeView, setActiveView] = useState<'profile' | 'group'>('profile');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const buttonColorScheme = 'orange';

  return (
    <Box p={5}>
      <Flex justifyContent="center" mb={6}>
        <Button
          colorScheme={buttonColorScheme}
          variant={activeView === 'profile' ? 'solid' : 'outline'}
          mr={4}
          onClick={() => setActiveView('profile')}
        >
          Profile
        </Button>
        <Button
          colorScheme={buttonColorScheme}
          variant={activeView === 'group' ? 'solid' : 'outline'}
          onClick={() => setActiveView('group')}
        >
          Group
        </Button>
      </Flex>
      
      <Box bg={bgColor} boxShadow="md" borderRadius="lg" p={6}>
        <VStack spacing={6} align="stretch">
          {activeView === 'profile' ? (
            <ProfileData user={mockUser} />
          ) : (
            <GroupData group={mockGroup} initialSortOption={SortOption.CoffeeCount} />
          )}
        </VStack>
      </Box>
    </Box>
  )
}