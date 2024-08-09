"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, VStack, useColorModeValue } from '@chakra-ui/react';
import GroupData from './group-data/GroupData';
import { SortOption } from '@/app/types/types';
import ProfileData from './profile-data/ProfileData';
import { GroupUsers } from '@/app/interfaces';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProfileGroupComponent({getUsersNew, user, accessToken, group, users, currentSortOption }:
  {getUsersNew: (currentSortOption: SortOption) => Promise<any>, user: any, accessToken: any, group: any, users: GroupUsers, currentSortOption: SortOption }) {

  const [activeView, setActiveView] = useState<'profile' | 'group'>('profile');
  const [sortOption, setSortOption] = useState<SortOption>(currentSortOption);
  const [sortedUsers, setSortedUsers] = useState<GroupUsers>(users);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    
    const fetchSortedUsers = async (sortOption: SortOption) => {
      
      const data = await getUsersNew(sortOption);
      setSortedUsers(data);
    };
    fetchSortedUsers(sortOption);
  }, [sortOption]);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    router.push(`/profile?sortBy=${newSortOption}`);
  };

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

      <Box className='dark:bg-gray-400' boxShadow="md" borderRadius="lg" p={6}>
        <VStack spacing={6} align="stretch">
          {activeView === 'profile' ? (
            <ProfileData user={user} accessToken={accessToken} />
          ) : (
            <GroupData
              groupId={user?.groupId}
              group={group}
              initialSortOption={sortOption}
              users={sortedUsers}
              setSortOption={handleSortChange}
            />
          )}
        </VStack>
      </Box>
    </Box>
  );
}





