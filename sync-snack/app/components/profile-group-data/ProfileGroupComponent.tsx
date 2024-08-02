"use client";
import React, { useState } from 'react'
import { Box, Button, Flex, VStack, useColorModeValue } from '@chakra-ui/react'
import GroupData from './group-data/GroupData'
import { SortOption } from '@/app/types/types';
import ProfileData from './profile-data/ProfileData';
import { GroupUsers } from '@/app/interfaces';



export default function ProfileGroupComponent({ user, accessToken, group, users, reloadPage }:
   {user: any, accessToken: any, group: any, users: GroupUsers,  reloadPage: (newGroupName: string, newGroupDescription: string) => void}) {

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
            <ProfileData user={user} accessToken={accessToken} />
          ) : (
            <GroupData group={group} initialSortOption={SortOption.CoffeeCount} users={users} reloadPage={reloadPage} />
          )}
        </VStack>
      </Box>
    </Box>
  )
}
