"use client";
import React, { useState } from 'react';
import { 
  Table, Thead, Tbody, Tfoot, Tr, Th, TableCaption, TableContainer,
  Button, Flex, HStack, IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import OrderRow from '../order-row/OrderRow';

export default function OrdersTable({ orders }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      <TableContainer>
        <Table variant="simple" colorScheme="gray">
          <TableCaption>Orders history</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>Created At</Th>
              <Th>Completed At</Th>
              <Th>Status</Th>
              <Th>Description</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order: any, index: number) => (
              <OrderRow key={index} order={order} />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>Created At</Th>
              <Th>Completed At</Th>
              <Th>Status</Th>
              <Th>Description</Th>
              <Th>Rating</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      
      <Flex justifyContent="flex-end" mt={4}>
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
    </>
  );
}