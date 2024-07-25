import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import OptionsForCharts from '../options-for-charts/OptionsForCharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ColumnChart({ data, option, setOption }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data, option]);

  const getChartData = () => {
    const labels = [];
    const values = [];

    if (option === 'type') {
      const typeCounts = data.reduce((acc, item) => {
        acc[item.orderType] = (acc[item.orderType] || 0) + 1;
        return acc;
      }, {});
      Object.entries(typeCounts).forEach(([type, count]) => {
        labels.push(type);
        values.push(count);
      });
    } else if (option === 'status') {
      const statusCounts = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      Object.entries(statusCounts).forEach(([status, count]) => {
        labels.push(status);
        values.push(count);
      });
    } else if (option === 'rating') {
      const ratingCounts = data.reduce((acc, item) => {
        acc[item.rating] = (acc[item.rating] || 0) + 1;
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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