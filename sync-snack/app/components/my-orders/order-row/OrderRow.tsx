"use client"
import { Tr, Td, Button, Box, Text } from '@chakra-ui/react';
import OrderTypePretty from '../order-type-preatty/OrderTypePreatty';
import StatusPretty from '../status-preatty/StatusPreatty';
import RatingPretty from '../rating-preatty/RatingPreatty';
import { useEffect, useState } from 'react';
import Modal from '../../modals/Modal';
import OrderRateModalComponent from '../order-modal-component/OrderRateModalComponent';
import OrderDescriptionModalComponent from '../order-modal-component/OrderDescriptionModalComponent';

export default function OrderRow({ order, accessToken }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);

  const [orderRating, setOrderRating] = useState(order.rating)

  useEffect(() => {
    setOrderRating(order.rating);
  }, [order.rating]);

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  }

  function DescriptionBox({ desc }: { desc: string }) {
    if (desc.length > 11) {
      desc = `${desc.slice(0, 9)}...`
      return (
        <Box className='flex'>
          <Text className='cursor-pointer hover:text-orange-dark-1' onClick={() => setDescriptionModalOpen(true)}>{desc}</Text>
        </Box>
      )
    } else {
      return <Text>{desc}</Text>
    }
  }

  return (
    <>
      <Tr>
        <Td><OrderTypePretty orderType={order.eventType} /></Td>
        <Td className='w-96 font-semibold'>{formatDate(order.createdAt)}</Td>
        <Td>
          <Box className='flex'>
            <StatusPretty statusType={order.status} />
          </Box>
        </Td>
        <Td className='font-semibold'>
          <DescriptionBox desc={order.additionalOptions.description} />
        </Td>
        <Td>
          {order.status === "COMPLETED" ? (
            <Box className='h-10 flex items-center'>
              {orderRating !== 0 ? (
                <RatingPretty desc={order.additionalOptions.description} rating={orderRating} />
              ) : (
                <Button onClick={() => setRateModalOpen(true)}>Rate</Button>
              )}
            </Box>
          ) : order.status === "IN_PROGRESS" ? (
            <Box className='h-10 flex items-center'>
              <Text className='text-orange-light-1'>Can&apos;t rate yet...</Text>
            </Box>
          ) : order.status === "CANCELLED" ? (
            <Box className='h-10 flex items-center'>
              <Text className='text-orange-dark-2' >Can&apos;t rate</Text>
            </Box>
          ) : null}
        </Td>
      </Tr>
      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent setRating={setOrderRating} accessToken={accessToken} coffeeOrderId={order.orderId} onClose={handleRateCloseModal} />
        </Modal>
      )}

      {isDescriptionModalOpened && (
        <Modal isOpen={isDescriptionModalOpened} onClose={handleDescriptionCloseModal}>
          <OrderDescriptionModalComponent description={order.additionalOptions.description} onClose={handleDescriptionCloseModal}></OrderDescriptionModalComponent>
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) return "Today";
  if (diff < 2 * oneDay) return "Yesterday";
  if (diff < 7 * oneDay) return "A few days ago";
  if (diff < 14 * oneDay) return "Last week";
  if (diff < 30 * oneDay) return "Last month";
  if (diff < 40 * oneDay) return "More then a month ago";
  if (diff < 90 * oneDay) return "More then 2 months ago";
  if (diff < 140 * oneDay) return "More then a 3 months ago";
  if (diff < 365 * oneDay) return "More than a 6 months ago";
  return "More than a year ago";
}


