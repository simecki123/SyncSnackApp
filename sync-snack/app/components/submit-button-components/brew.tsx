"use client";
import React, { useState } from 'react';
import { ChakraProvider, Box, Button } from '@chakra-ui/react';
import Modal from '../modals/Modal';
import CreateEvent from '../create-event/CreateEvent';
import { auth } from '@/app/auth';

export default function BrewComponent({ activeUser }: any) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ChakraProvider>
        <Box
          h="20vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button colorScheme="orange" onClick={() => setModalOpen(true)}>
            Create Event
          </Button>
        </Box>
      </ChakraProvider>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <CreateEvent activeUser={activeUser} onCloseModal={handleModalClose} />
      </Modal>
    </>
  );
}
