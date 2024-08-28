import React, { useState, useCallback } from 'react';
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import Modal from "../modals/Modal";
import EditGroupWindow from "../profile-group-data/edit-group-window/EditGroupWindow";
import useNotificationGroupDataChanged from "@/app/store/notificationGroupDataChanged";

export default function GroupButtons({ startGroup, activeUser, fetchGroupData }: {
  startGroup: any;
  activeUser: any;
  fetchGroupData: () => Promise<any>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [group, setGroup] = useState(startGroup);
  const { setHasNewNotificationGroupDataChanged } = useNotificationGroupDataChanged();

  const refreshGroupData = useCallback(async () => {
    try {
      const newGroup = await fetchGroupData();
      setGroup(newGroup);
    } catch (error) {
      console.error("Error refreshing group data:", error);
      toast({
        title: 'Failed to Refresh Group Data',
        description: 'Unable to fetch the latest group information.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [fetchGroupData, toast]);

  const handleEditGroup = async (newGroupName: any, newGroupDescription: any) => {
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
        await refreshGroupData();
        setHasNewNotificationGroupDataChanged(true);
        toast({
          title: 'Group Updated',
          description: 'Group information has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Group Not Updated',
          description: 'Something went wrong while updating, please try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
    toast({
      title: 'Group Updated',
      description: 'Group information has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      colorScheme: 'xblue'
    });
  };

  const isAdmin = activeUser?.roles?.includes('ADMIN');

  return (
    <Box className="flex justify-around md:justify-center">
      <Button
        className="md:mr-2 shadow-lg"
        colorScheme="xred"
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

      {isAdmin && (
        <>
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
        </>
      )}
    </Box>
  );
}

