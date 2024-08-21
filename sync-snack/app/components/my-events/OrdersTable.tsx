'use client';

import React, { useEffect, useState } from 'react';
import { SimpleGrid, Button, HStack, Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import OrderCards from "@/app/components/my-events/order-card/OrderCards";
import { EventOrder } from '@/app/interfaces';
import useNotificationEventPageOrdersStore from '@/app/store/notificationEventPageOrdersStore';


export default function OrdersTable({ startOrders, setStatusOfTheOrder, fetchAllOrdersOfThisEvent }: { startOrders: Array<EventOrder>,
  setStatusOfTheOrder: (status: string, orderId: string) => Promise<string>,
  fetchAllOrdersOfThisEvent: () => Promise<Array<EventOrder>>
  } ) {

  const [ orders, setOrders ] = useState(startOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const maxPageButtons = 5;

  const { hasNewOrderForYOurEventNotification, setNewOrderForYourEventNotification } = useNotificationEventPageOrdersStore();

  useEffect(() => {
    if (hasNewOrderForYOurEventNotification) {
      console.log("ima")
      fetchAllOrdersOfThisEvent().then(setOrders);
      setNewOrderForYourEventNotification(false); // Reset the state after fetching new events
    }
  }, [hasNewOrderForYOurEventNotification, fetchAllOrdersOfThisEvent]);

  // Generate page numbers
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {currentOrders.map((order, key) => (
          <OrderCards key={key} order={order} setStatusOfTheOrder={setStatusOfTheOrder}/>
        ))}
      </SimpleGrid>
      <HStack justifyContent="center" mt={4} spacing={2}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          isDisabled={currentPage === 1}
          aria-label="Previous page"
          size="sm"
        />
        {getPageNumbers().map((number) => (
          <Button
            key={number}
            onClick={() => handlePageChange(number)}
            colorScheme={currentPage === number ? "orange" : "gray"}
            size="sm"
          >
            {number}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          isDisabled={currentPage === totalPages}
          aria-label="Next page"
          size="sm"
        />
      </HStack>
    </Box>
  );
}



