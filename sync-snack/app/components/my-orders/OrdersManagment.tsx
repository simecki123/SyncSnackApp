'use client';
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import OrdersTable from './orders-table/OrdersTable';
import ChooseChart from './charts/ChooseChart';
import PieChart from './charts/pie-chart/PieChart';
import Statistics from './charts/column-chart/Statistics';

export default function OrdersManagement({ orders }: { orders: any[] }) {
  const [view, setView] = useState('table');
  const [option, setOption] = useState('type');

  const renderView = () => {
    switch (view) {
      case 'table':
        return <OrdersTable orders={orders} />;
      case 'column':
        return <Statistics stats={calculateStatistics(orders)} />;
      case 'pie':
        return <PieChart data={orders} option={option} setOption={setOption} />;
      default:
        return <OrdersTable orders={orders} />;
    }
  };

  return (
    <Flex className='flex w-full grow border-black'> {/* Adjust the 100px based on your header height */}
      <Box width="200px" mr={4}>
        <ChooseChart setView={setView} />
      </Box>
      <Box className='flex grow border-black' bg="white" rounded="lg" shadow="md"
        overflow="hidden">
        {renderView()}
      </Box>
    </Flex>
  );
}

function calculateStatistics(data: any) {
  const statistics = {
    completed: 0,
    canceled: 0,
    ordersPerMonth: new Array(12).fill(0),
    ordersPerType: {
      coffee: 0,
      drinks: 0,
      food: 0,
      mix: 0,
    }
  };

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  data.forEach((order: any) => {
    // Count completed and canceled orders
    if (order.status === "Done") {
      statistics.completed += 1;
    } else if (order.status === "Canceled") {
      statistics.canceled += 1;
    }


    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear();

    if (orderYear === previousYear) {
      // Count orders per month
      const month = new Date(order.createdAt).getMonth(); // getMonth returns 0-11
      statistics.ordersPerMonth[month] += 1;
    }

    // Count orders per type
    switch (order.orderType) {
      case "coffee":
        statistics.ordersPerType.coffee += 1;
        break;
      case "drinks":
        statistics.ordersPerType.drinks += 1;
        break;
      case "food":
        statistics.ordersPerType.food += 1;
        break;
      case "mix":
        statistics.ordersPerType.mix += 1;
        break;
      default:
        // If there are other order types not accounted for, we can decide how to handle them here
        break;
    }
  });

  return statistics;
}
