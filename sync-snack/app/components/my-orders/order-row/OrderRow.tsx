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
        <Td>{order._id}</Td>
        <Td><OrderTypePretty orderType={order.orderType} /></Td>
        <Td>{order.createdAt.toLocaleString()}</Td>
        <Td>{order.completedAt?.toLocaleString() || '-'}</Td>
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
