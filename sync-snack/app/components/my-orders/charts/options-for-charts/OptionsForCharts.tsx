// components/orders-management/OptionsForCharts.tsx
import React from 'react';
import { Box, Select } from '@chakra-ui/react';

export default function OptionsForCharts({ option, setOption }: any) {
  return (
    <Box>
      <Select
        value={option}
        onChange={(e) => setOption(e.target.value)}
        width="200px"
      >
        <option value="type">Type</option>
        <option value="status">Status</option>
        <option value="rating">Rating</option>
      </Select>
    </Box>
  );
}