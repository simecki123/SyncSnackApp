import { Box, Text, keyframes } from '@chakra-ui/react';

// Define the keyframes for the shining animation
const shineAnimation = keyframes`
  0% { background-color: #fbbf24; }  /* Normal Yellow */
  50% { background-color: #fcd34d; }  /* Brighter Yellow */
  100% { background-color: #fbbf24; }  /* Back to Normal Yellow */
`;

export default function StatusPretty({ statusType }: any) {
  switch (statusType) {
    case "IN_PROGRESS":
      return (
        <Box
          className='dark:bg-yellow-700 px-4 py-2 rounded-md text-white'
          animation={`${shineAnimation} 2s ease-in-out infinite`}
          bg='#fbbf24'  // Initial normal yellow
        >
          <Text>In Progress</Text>
        </Box>
      );
    case "READY":
      return (
        <Box className='dark:bg-green-700 px-4 py-2 bg-green-500 rounded-md text-white'>
          <Text>Done</Text>
        </Box>
      );
    case "CANCELLED":
      return (
        <Box className='dark:bg-red-800 px-4 py-2 bg-red-600 rounded-md text-white'>
          <Text>Canceled</Text>
        </Box>
      );
    default:
      return null;
  }
}
