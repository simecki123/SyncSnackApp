import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import OptionsForCharts from '../options-for-charts/OptionsForCharts';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MockedData {
  _id: string;
  createdAt: Date;
  completedAt: string | null;
  status: string;
  orderType: string;
  additionalOptions: string;
  rating: number | null | undefined;
}

export default function PieChart({ data, option, setOption }: { data: MockedData[], option: string, setOption: (option: string) => void }) {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data, option]);

  const getChartData = () => {
    const counts: { [key: string]: number } = {};
    let total = 0;

    data.forEach(item => {
      let key: string;
      switch (option) {
        case 'type':
          key = item.orderType || 'Unknown';
          break;
        case 'status':
          key = item.status || 'Unknown';
          break;
        case 'rating':
          key = (item.rating != null && item.rating !== undefined) ? item.rating.toString() : 'Not Rated';
          break;
        default:
          key = 'Unknown';
      }
      counts[key] = (counts[key] || 0) + 1;
      total++;
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Orders by ${option}`,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Box>
      <OptionsForCharts option={option} setOption={setOption} />
      <Box mt={4} height="400px">
        <Pie ref={chartRef} options={options} data={getChartData()} />
      </Box>
    </Box>
  );
}