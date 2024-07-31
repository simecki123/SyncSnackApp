import { Box, Text } from '@chakra-ui/react';

export default function StatusPretty({ statusType }: any) {
  switch (statusType) {
    case "PREPARING":
      return (
        <Box className='dark:bg-yellow-700 px-4 py-2 bg-yellow-500 rounded-md text-white'>
          <Text>In Progress</Text>
        </Box>
      );
    case "Done":
      return (
        <Box className='dark:bg-green-700 px-4 py-2 bg-green-500 rounded-md text-white'>
          <Text>Done</Text>
        </Box>
      );
    case "Canceled":
      return (
        <Box className='dark:bg-red-800 px-4 py-2 bg-red-600 rounded-md text-white'>
          <Text>Canceled</Text>
        </Box>
      );
    default:
      return null;
  }
}
