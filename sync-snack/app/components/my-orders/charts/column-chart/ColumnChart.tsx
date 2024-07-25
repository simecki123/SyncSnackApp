import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import OptionsForCharts from '../options-for-charts/OptionsForCharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MockedData {
  _id: string;
  createdAt: Date;
  completedAt: string | null;
  status: string;
  orderType: string;
  additionalOptions: string;
  rating: number | null | undefined;
}

interface ColumnChartProps {
  data: MockedData[];
  option: string;
  setOption: (option: string) => void;
}

export default function ColumnChart({ data, option, setOption }: ColumnChartProps) {
  const chartRef = useRef<ChartJS<"bar", number[], string>>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data, option]);

  const getChartData = (): ChartData<"bar", number[], string> => {
    const labels: string[] = [];
    const values: number[] = [];

    if (option === 'type') {
      const typeCounts = data.reduce((acc: {[key: string]: number}, item) => {
        acc[item.orderType] = (acc[item.orderType] || 0) + 1;
        return acc;
      }, {});
      Object.entries(typeCounts).forEach(([type, count]) => {
        labels.push(type);
        values.push(count);
      });
    } else if (option === 'status') {
      const statusCounts = data.reduce((acc: {[key: string]: number}, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      Object.entries(statusCounts).forEach(([status, count]) => {
        labels.push(status);
        values.push(count);
      });
    } else if (option === 'rating') {
      const ratingCounts = data.reduce((acc: {[key: string]: number}, item) => {
        const rating = item.rating != null ? item.rating.toString() : 'Not Rated';
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      }, {});
      Object.entries(ratingCounts).forEach(([rating, count]) => {
        labels.push(rating);
        values.push(count);
      });
    }

    return {
      labels,
      datasets: [
        {
          label: `Count by ${option}`,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Orders by ${option}`,
      },
    },
  };

  return (
    <Box>
      <OptionsForCharts option={option} setOption={setOption} />
      <Box mt={4} height="400px">
        <Bar ref={chartRef} options={options} data={getChartData()} />
      </Box>
    </Box>
  );
}