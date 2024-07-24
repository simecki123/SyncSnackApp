import { Box, Text } from '@chakra-ui/react';

export default function OrderTypePretty({ orderType }: any) {
  switch (orderType) {
    case "coffee":
      return (
        <Box className='px-4 py-2 bg-stone-300 rounded-md'>
          <Text>Coffee</Text>
        </Box>
      );
    case "outside":
      return (
        <Box className='px-4 py-2 bg-stone-400 rounded-md text-white'>
          <Text>Outside</Text>
        </Box>
      );
    default:
      return null;
  }
}