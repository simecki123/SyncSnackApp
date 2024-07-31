'use client'
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, DonutChart } from '@tremor/react';
import { Divider } from '@chakra-ui/react'

export default function Statistics({ stats }: { stats: StatisticsData }) {
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();
  return (
    <Box className="p-8">
      <Box className="flex justify-between mb-12">
        <Box className="flex">
          <Box className="flex flex-col justify-center">
            <DataBoxNumber status="Completed" nmbStatus={stats.completed} />
          </Box>
          <Box className="flex flex-col justify-center">
            <DataBoxNumber status="Canceled" nmbStatus={stats.canceled} />
          </Box>
        </Box>
        <Box className="flex flex-col ml-28">
          <Text className="flex justify-center text-xl font-semibold mb-4 dark:text-white">Order types</Text>
          <DonutChart className="w-56"
            data={transformOrders(stats.ordersPerType)}
            variant="donut"
            colors={['orange-100', 'orange-200', 'orange-300', 'orange-400']}
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)} />
        </Box>
      </Box>
      <Divider />
      <Text className="mt-12 text-xl font-semibold dark:text-white">Recent orders</Text>
      <BarChart className="mt-6"
        data={transformData(fakeMonthsData)}
        index="name"
        categories={['Number of orders']}
        colors={['orange']}
        valueFormatter={dataFormatter}
        yAxisWidth={48} />
    </Box>
  )
}

function DataBoxNumber({ status, nmbStatus }: { status: string, nmbStatus: number }) {
  return (
    <Box className="dark:bg-orange-400 bg-orange-100 rounded-2xl p-4 mx-6">
      <Box className="flex items-center mb-2">
        {status === 'Canceled' ? <WarningIcon /> : <CheckCircleIcon />}
        <Text className="dark:text-white ml-1 text-tremor-default text-tremor-content">Total {status}</Text>
      </Box>
      <Box className="bg-white rounded-xl p-6 flex justify-center">
        <Text className="px-32 text-tremor-content-strong font-semibold
          text-tremor-metric">{nmbStatus}</Text>
      </Box>
    </Box>
  )
}

interface StatisticsData {
  completed: number,
  canceled: number,
  ordersPerMonth: number[],
  ordersPerType: {
    coffee: number,
    drinks: number,
    food: number,
    mix: number,
  }
}

function transformData(numbers: number[]) {
  // Array of month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check if the input array has exactly 12 elements
  if (numbers.length !== 12) {
    throw new Error('Input array must have exactly 12 numbers.');
  }

  // Transform the input array into the desired format
  const chartData = numbers.map((number, index) => ({
    name: months[index],
    'Number of orders': number
  }));

  return chartData;
}

function transformOrders(ordersPerType: any) {
  // Check if the input is an object
  if (typeof ordersPerType !== 'object' || ordersPerType === null) {
    throw new Error('Input must be a non-null object.');
  }

  // Transform the input object into the desired format
  const dataHero = Object.entries(ordersPerType).map(([key, value]) => ({
    name: key,
    value: value
  }));

  return dataHero;
}

const fakeMonthsData = [25, 23, 25, 31, 16, 33, 23, 45, 12, 20, 19, 31]

const datahero = [{ name: 'Noche Holding AG', value: 9800, }, { name: 'Rain Drop AG', value: 4567, }, { name: 'Push Rail AG', value: 3908, }, { name: 'Flow Steal AG', value: 2400, }, { name: 'Tiny Loop Inc.', value: 2174, }, { name: 'Anton Resorts Holding', value: 1398, },];
