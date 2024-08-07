"use client";
import React from 'react';
import { Box, Button, Text, Flex, VStack, Heading, Container, useDisclosure, useToast } from '@chakra-ui/react';
import SortOptions from '../../leaderboard/sort-options/SortOptions';
import LeaderboardTable from '../../leaderboard/LeaderboardTable';
import { SortOption } from '@/app/types/types';
import Modal from '../../modals/Modal';
import EditGroupWindow from '../edit-group-window/EditGroupWindow';

export default function GroupData({ group, initialSortOption, users, setSortOption }: {
  group: any, initialSortOption: SortOption, users: any, setSortOption: (sortOption: SortOption) => void }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditGroup = (newGroupName: string, newGroupDescription: string) => {
    // Assuming reloadPage is handled by parent component
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
                description: 'Copied to clipboard',
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
              });
            }}>Invite</Button>
          </VStack>
        </Box>
        <Box flex="2" bg="white" p={6} borderRadius="lg" boxShadow="md" maxHeight="500px" overflowY="auto">
          <Heading size="md" mb={4}>Leaderboard</Heading>
          <SortOptions sortOption={initialSortOption} onSortChange={setSortOption} users={users} />
          <Box mt={4}>
            <LeaderboardTable sortOption={initialSortOption} onSortChange={setSortOption} users={users} />
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
  );
}
