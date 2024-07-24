"use client"
import { Tr, Td, Button } from '@chakra-ui/react';
import OrderTypePretty from '../order-type-preatty/OrderTypePreatty';
import StatusPretty from '../status-preatty/StatusPreatty';
import RatingPretty from '../rating-preatty/RatingPreatty';
import { useState } from 'react';
import Modal from '../../modals/Modal';
import OrderModalComponent from '../order-modal-component/OrderModalComponent';

export default function OrderRow({ order }: any) {
  const [isModalOpened, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Tr>
        <Td>{order._id}</Td>
        <Td><OrderTypePretty orderType={order.orderType} /></Td>
        <Td>{order.createdAt.toLocaleString()}</Td>
        <Td>{order.completedAt?.toLocaleString() || '-'}</Td>
        <Td className='flex'><StatusPretty statusType={order.status} /></Td>
        <Td><Button>Description</Button></Td>
        <Td>
          {order.rating ? <RatingPretty rating={order.rating} /> : <Button onClick={() => setModalOpen(true)}>Rate</Button>}
        </Td>
      </Tr>
      {isModalOpened && (
        <Modal isOpen={isModalOpened} onClose={handleCloseModal}>
          <OrderModalComponent coffeeOrderId={order._id} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}
