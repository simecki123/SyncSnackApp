'use client'
import { GroupUsers, ProfileGroup } from '@/app/interfaces'
import { Box, Button, Text, Flex, VStack, Heading, Container, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import SortOptions from '../../leaderboard/sort-options/SortOptions'
import LeaderboardTable from '../../leaderboard/LeaderboardTable'
import { SortOption } from '@/app/types/types';
import { useToast } from '@chakra-ui/react'
import Modal from '../../modals/Modal'
import EditGroupWindow from '../edit-group-window/EditGroupWindow'

export default function GroupData({ group, initialSortOption, users, reloadPage }: {
  group: ProfileGroup, 
  initialSortOption: SortOption, 
  users: GroupUsers, 
  reloadPage: (newGroupName: string, newGroupDescription: string) => void  
}) {
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const handleEditGroup = (newGroupName: string, newGroupDescription: string) => {
    reloadPage(newGroupName, newGroupDescription);
    onClose();
    toast({
      title: 'Group Updated',
      description: 'Group information has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" color="orange.500" mb={6}>Group Information</Heading>
      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        <Box flex="1" bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="bold">Group name:</Text>
              <Text>{group.name}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Description:</Text>
              <Text>{group.description}</Text>
            </Box>
            <Button colorScheme="orange" mt={4} onClick={onOpen}>Edit</Button>
            <Button colorScheme="orange" mt={4} onClick={() => {
              navigator.clipboard.writeText('http://localhost:3000/register-link?groupId=151&groupCode=12345678')
              toast({

                title: 'Invite',
                description: 'copied to clipboard',

                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
              })
            }}>Invite</Button>
          </VStack>
        </Box>
        <Box flex="2" bg="white" p={6} borderRadius="lg" boxShadow="md" maxHeight="500px" overflowY="auto">
          <Heading size="md" mb={4}>Leaderboard</Heading>
          <SortOptions sortOption={sortOption} onSortChange={handleSortChange} users={users} />
          <Box mt={4}>
            <LeaderboardTable sortOption={sortOption} onSortChange={handleSortChange} users={users} />
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditGroupWindow
          groupName={group.name}
          groupDescription={group.description}
          handleEditGroup={handleEditGroup}
        />
      </Modal>
    </Container>
  )
}