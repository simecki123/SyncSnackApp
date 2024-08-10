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


  return (
    <>
      <Tr>
        <Td><OrderTypePretty orderType={order.eventType} /></Td>
        <Td className='w-96'>{formatDate(order.createdAt)}</Td>
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

// utils/dateUtils.js
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) return "Today";
  if (diff < 2 * oneDay) return "Yesterday";
  if (diff < 7 * oneDay) return "A few days ago";
  if (diff < 14 * oneDay) return "Last week";
  if (diff < 30 * oneDay) return "Last month";
  if (diff < 365 * oneDay) return "More than a month ago";
  return "More than a year ago";
}



