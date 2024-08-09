'use client'

import { Box, Text } from "@chakra-ui/react";
import { DonutChart } from "@tremor/react";

export default function GroupOrdersDonut() {
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();
  return (
    <Box className="hidden md:block">
      <Text className="font-semibold text-xl flex justify-center mb-2 mt-6">Orders</Text>
      <DonutChart className="w-56"
        data={datahero}
        showAnimation={true}
        variant="pie"
        colors={['orange-100', 'orange-200', 'orange-300', 'orange-400']}
        valueFormatter={dataFormatter} />
    </Box>
  )
}

const datahero = [
  {
    name: 'Coffee',
    value: 98,
  },
  {
    name: 'Food',
    value: 45,
  },
  {
    name: 'Drinks',
    value: 39,
  },
  {
    name: 'Mix',
    value: 24,
  },
];

