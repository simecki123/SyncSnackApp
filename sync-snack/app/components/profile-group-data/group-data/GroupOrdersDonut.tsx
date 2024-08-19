'use client'

import { Box, Text } from "@chakra-ui/react";
import { DonutChart } from "@tremor/react";

export default function GroupOrdersDonut({datahero}: {datahero: Array<any>}) {
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



