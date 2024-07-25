'use client';
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import OrdersTable from './orders-table/OrdersTable';
import ChooseChart from './charts/ChooseChart';
import ColumnChart from './charts/column-chart/ColumnChart';
import PieChart from './charts/pie-chart/PieChart';

export default function OrdersManagement({ orders }: { orders: any[] }) {
  const [view, setView] = useState('table');
  const [option, setOption] = useState('type');

  const renderView = () => {
    switch (view) {
      case 'table':
        return <OrdersTable orders={orders} />;
      case 'column':
        return <ColumnChart data={orders} option={option} setOption={setOption} />;
      case 'pie':
        return <PieChart data={orders} option={option} setOption={setOption} />;
      default:
        return <OrdersTable orders={orders} />;
    }
  };

  return (
    <Flex width="100%"> {/* Adjust the 100px based on your header height */}
      <Box width="200px" mr={4} flexShrink={0}>
        <ChooseChart setView={setView} />
      </Box>
      <Box flex={1} bg="white" rounded="lg" shadow="md" overflow="hidden" maxWidth="calc(100% - 224px)"> {/* 200px + 24px margin */}
        {renderView()}
      </Box>
    </Flex>
  );
}
