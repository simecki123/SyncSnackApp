import { Table, Thead, Tbody, Tfoot, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import OrderRow from '../order-row/OrderRow';

export default function OrdersTable({ orders }:any) {
  return (
    <TableContainer>
      <Table>
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
          {orders.map((order:any , index: number) => (
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
  );
}