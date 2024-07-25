"use client";
import React, { useState } from 'react';
import { ChakraProvider, Box, Button } from '@chakra-ui/react';
import Modal from '../modals/Modal';
import CreateEvent from '../create-event/CreateEvent';

export default function BrewComponent() {
  const [isModalOpen, setModalOpen] = useState(false);



  return (
    <>
      <ChakraProvider >
        <Box
          h="20vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button colorScheme='orange' onClick={() => setModalOpen(true)}>
            Create Event
          </Button>
        </Box>
      </ChakraProvider>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CreateEvent></CreateEvent>
      </Modal>

    </>

  );
}
