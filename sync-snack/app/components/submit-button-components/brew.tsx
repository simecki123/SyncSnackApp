"use client";
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Modal from '../modals/Modal';
import CreateEvent from '../create-event/CreateEvent';

export default function BrewComponent({ activeUser }: any) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        className='mt-8 mb-8'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button colorScheme='xred' onClick={() => setModalOpen(true)}>
          Create Event
        </Button>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <CreateEvent activeUser={activeUser} onCloseModal={handleModalClose} />
      </Modal>
    </>
  );
}
