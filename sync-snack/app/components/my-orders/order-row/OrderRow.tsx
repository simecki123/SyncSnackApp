"use client"
import { Tr, Td, Button, Box } from '@chakra-ui/react';
import OrderTypePretty from '../order-type-preatty/OrderTypePreatty';
import StatusPretty from '../status-preatty/StatusPreatty';
import RatingPretty from '../rating-preatty/RatingPreatty';
import { useState } from 'react';
import Modal from '../../modals/Modal';
import OrderRateModalComponent from '../order-modal-component/OrderRateModalComponent';
import OrderDescriptionModalComponent from '../order-modal-component/OrderDescriptionModalComponent';

export default function OrderRow({ order, accessToken }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);

  const [orderRating, setOrderRating] = useState(order.rating)

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  }

  console.log(order, ' >>> order inside the OrderRow function')
  console.log(accessToken, 'access token insithe the ...')

  return (
    <>
      <Tr>
        <Td><OrderTypePretty orderType={order.eventType} /></Td>
        <Td className='w-96 dark:text-white'>{convertTimeToString(order.createdAt)}</Td>
        <Td>
          <Box className='flex'>
            <StatusPretty statusType={order.status} />
          </Box>
        </Td>
        <Td><Button onClick={() => setDescriptionModalOpen(true)}>Description</Button></Td>
        <Td>
          {orderRating ? <RatingPretty rating={orderRating} /> : <Button onClick={() => setRateModalOpen(true)}>Rate</Button>}
        </Td>
      </Tr>
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

function convertTimeToString(time: Date | null): string {
  if (!time) {
    return "-";
  }
  const now = new Date();
  const diffTime = now.getTime() - time.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  const diffMonths = (now.getFullYear() - time.getFullYear()) * 12 + now.getMonth() - time.getMonth();
  const diffYears = now.getFullYear() - time.getFullYear();

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return "A week ago";
  } else if (diffMonths < 12) {
    return "A month ago";
  } else if (diffYears === 1) {
    return "A year ago";
  } else {
    return `${diffYears} years ago`;
  }
}

