// components/orders-management/ChooseChart.tsx
import React from 'react';
import { VStack, Button, Image, Text } from '@chakra-ui/react';

const chartOptions = [
  { name: 'Table', image: '/table_image.png', value: 'table' },
  { name: 'Statistics', image: '/angular-column-chart.png', value: 'column' },
  // { name: 'Pie Chart', image: '/pie_default_full_circle.png', value: 'pie' },
];

export default function ChooseChart({ setView }: any) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Choose View
      </Text>
      {chartOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => setView(option.value)}
          variant="outline"
          justifyContent="flex-start"
          height="auto"
          p={2}
        >
          <Image alt='noImage' src={option.image} boxSize="40px" mr={2} />
          <Text>{option.name}</Text>
        </Button>
      ))}
    </VStack>
  );
}
