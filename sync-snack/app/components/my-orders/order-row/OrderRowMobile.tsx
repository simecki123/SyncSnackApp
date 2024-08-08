"use client"
import { Tr, Td, Button, Box } from '@chakra-ui/react';
import OrderTypePretty from '../order-type-preatty/OrderTypePreatty';
import StatusPretty from '../status-preatty/StatusPreatty';
import RatingPretty from '../rating-preatty/RatingPreatty';
import { useState } from 'react';
import Modal from '../../modals/Modal';
import OrderRateModalComponent from '../order-modal-component/OrderRateModalComponent';
import OrderDescriptionModalComponent from '../order-modal-component/OrderDescriptionModalComponent';

export default function OrderRowMobile({ order, accessToken }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);

  const [orderRating, setOrderRating] = useState(order.rating)

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  }


  return (
    <>
      <Box className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
        <Box className="flex justify-between items-center">
            <Box className="font-medium text-gray-900 dark:text-white">
            <OrderTypePretty orderType={order.eventType} />
            </Box>
            <Box className="text-gray-500 dark:text-gray-400">
            time
            </Box>
        </Box>

        <Box className="mt-2">
            <StatusPretty statusType={order.status} />
        </Box>

        <Box className="mt-2">
            <Button colorScheme="blue" size="sm" onClick={() => setDescriptionModalOpen(true)}>
            Description
            </Button>
        </Box>

        <Box className="mt-2">
            {orderRating ? (
            <RatingPretty rating={orderRating} />
            ) : (
            <Button colorScheme="yellow" size="sm" onClick={() => setRateModalOpen(true)}>
                Rate
            </Button>
            )}
        </Box>
      </Box>
      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent setRating={setOrderRating} accessToken={accessToken} coffeeOrderId={order.orderId} onClose={handleRateCloseModal} />
        </Modal>
      )}

      {isDescriptionModalOpened && (
        <Modal isOpen={isDescriptionModalOpened} onClose={handleDescriptionCloseModal}>
          <OrderDescriptionModalComponent description={objectToString(order.additionalOptions)} onClose={handleDescriptionCloseModal}></OrderDescriptionModalComponent>
        </Modal>
      )}
    </>
  );
}

function objectToString(obj: any): string {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj);
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return `${key}:\n${objectToString(value).split('\n').map(line => `  ${line}`).join('\n')}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
}





