'use client'
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import Modal from "../modals/Modal";
import EditGroupWindow from "../profile-group-data/edit-group-window/EditGroupWindow";

export default function GroupButtons({ group, activeUser }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditGroup = async (newGroupName: string, newGroupDescription: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeUser?.accessToken}`
        },
        body: JSON.stringify({
          name: newGroupName,
          description: newGroupDescription
        }),
      });

      if (response.ok) {
        toast({
          title: 'Group Updated',
          description: 'Group information has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update group');
      }
    } catch (error) {
      console.error("Error: ", error);
      toast({
        title: 'Group Not Updated',
        description: 'Something went wrong with the server, please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box className="flex justify-around md:justify-center">
      <Button
        className="md:mr-2 shadow-lg"
        colorScheme="orange"
        mt={4}
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/register-link?groupId=${group.id}&groupCode=${group.code}`)
          toast({
            title: 'Invite',
            description: 'Copied to clipboard',
            status: 'info',
            duration: 2000,
            isClosable: true,
            position: 'top-right',
            colorScheme: 'xblue'
          });
        }}
      >
        Invite
      </Button>
      <Button className="md:ml-2 shadow-lg" colorScheme="xred" mt={4} onClick={onOpen}>
        Edit
      </Button>
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
