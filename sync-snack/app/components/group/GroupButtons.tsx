'use client'
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import Modal from "../modals/Modal";
import EditGroupWindow from "../profile-group-data/edit-group-window/EditGroupWindow";

export default function GroupButtons({ group }: any) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditGroup = (newGroupName: string, newGroupDescription: string) => {
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
    <Box className="flex justify-around">
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
      <Button colorScheme="orange" mt={4} onClick={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditGroupWindow
          groupName={group.name}
          groupDescription={group.description}
          handleEditGroup={handleEditGroup}
        />
      </Modal>
    </Box>
  )

}
