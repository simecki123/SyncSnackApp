"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, TableContainer,
  Button, Flex, HStack, IconButton,
  Box, Input,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import OrderRow from '../order-row/OrderRow';
import OrderRowMobile from '../order-row/OrderRowMobile';

export default function OrdersTable({ orders, accessToken, searchSpecificOrders }:
  { orders: any[], accessToken: any, searchSpecificOrders?: (searchTerm: string) => Promise<Array<any>> }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  let itemsPerPage = calculateItemsPerPage();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchOrdersByStatus = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchSpecificOrders) {
        const newOrders = await searchSpecificOrders(searchTerm);
        setFilteredOrders(newOrders);
      } else {
        // Handle the case where searchSpecificOrders is undefined
        console.error("searchSpecificOrders is undefined");
      }
    }, 300),
    [searchSpecificOrders]
  );

  useEffect(() => {
    if (searchTerm) {
      fetchOrdersByStatus(searchTerm);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, fetchOrdersByStatus, orders]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={currentPage === i ? "orange" : "gray"}
          size="sm"
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Box className='md:hidden sm:flex flex-col h-full'>
        <Box className='p-4 flex-none'>
          <Input
            placeholder='Enter status of order'
            size='md'
            width='40vh'
            marginBottom={4}
            borderColor="orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {currentItems.map((order: any, index: number) => (
            <OrderRowMobile accessToken={accessToken} key={index} order={order} />
          ))}
        </Box>
        <Flex justifyContent="flex-end" alignItems="flex-end" mt={4} className='mr-4 mb-2 grow'>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              isDisabled={currentPage === 1}
              size="sm"
            />
            {renderPageNumbers()}
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              isDisabled={currentPage === totalPages}
              size="sm"
            />
          </HStack>
        </Flex>
      </Box>
      <Box className='hidden md:flex flex-col h-full'>
        <Box className='p-4 flex-none'>
          <Input
            placeholder='Enter status of order'
            size='md'
            width='70vh'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TableContainer>
            <Table variant="simple" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th>Created</Th>
                  <Th>Status</Th>
                  <Th>Description</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((order: any, index: number) => (
                  <OrderRow accessToken={accessToken} key={index} order={order} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex justifyContent="flex-end" alignItems="flex-end" mt={4} className='mr-4 mb-2 grow'>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              isDisabled={currentPage === 1}
              size="sm"
            />
            {renderPageNumbers()}
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              isDisabled={currentPage === totalPages}
              size="sm"
            />
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

// calculate items per page if one item is 73 px
function calculateItemsPerPage() {
  return Math.floor((window.innerHeight - 150) / 73);
}

// Debounce function
function debounce(fn: any, delay: any) {
  let timeoutID: any;
  return (...args: any) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}
