'use client'

import { Box, Text } from "@chakra-ui/react";
import { DonutChart, Legend } from "@tremor/react";

export default function GroupOrdersDonut({ datahero }: { datahero: Array<any> }) {
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();
  return (
    <Box className="hidden md:flex flex-col items-center justify-start">
      <Text className="font-semibold text-xl flex justify-center mb-2 mt-6">Orders</Text>
      <DonutChart className="w-56"
        data={datahero}
        showAnimation={true}
        variant="pie"
        colors={['#d98068', '#8c3331', '#681615']}
        valueFormatter={dataFormatter} />
    </Box>
  )
}



