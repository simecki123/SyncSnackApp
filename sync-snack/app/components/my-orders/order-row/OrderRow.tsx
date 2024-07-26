"use client"
import { Tr, Td, Button } from '@chakra-ui/react';
import OrderTypePretty from '../order-type-preatty/OrderTypePreatty';
import StatusPretty from '../status-preatty/StatusPreatty';
import RatingPretty from '../rating-preatty/RatingPreatty';
import { useState } from 'react';
import Modal from '../../modals/Modal';
import OrderRateModalComponent from '../order-modal-component/OrderRateModalComponent';
import OrderDescriptionModalComponent from '../order-modal-component/OrderDescriptionModalComponent';

export default function OrderRow({ order }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  }

  return (
    <>
      <Tr>
        <Td><OrderTypePretty orderType={order.orderType} /></Td>
        <Td>{convertTimeToString(order.createdAt)}</Td>
        <Td className='flex'><StatusPretty statusType={order.status} /></Td>
        <Td><Button onClick={() => setDescriptionModalOpen(true)}>Description</Button></Td>
        <Td>
          {order.rating ? <RatingPretty rating={order.rating} /> : <Button onClick={() => setRateModalOpen(true)}>Rate</Button>}
        </Td>
      </Tr>
      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent coffeeOrderId={order._id} onClose={handleRateCloseModal} />
        </Modal>
      )}

      {isDescriptionModalOpened && (
        <Modal isOpen={isDescriptionModalOpened} onClose={handleDescriptionCloseModal}>
          <OrderDescriptionModalComponent description={order.additionalOptions} onClose={handleDescriptionCloseModal}></OrderDescriptionModalComponent>
        </Modal>
      )}
    </>
  );
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
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
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

