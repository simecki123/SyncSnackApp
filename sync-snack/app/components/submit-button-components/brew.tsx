import React from 'react';
import { ChakraProvider, Box, Button} from '@chakra-ui/react';

export default function BrewComponent() {
  return (
    <ChakraProvider >
        <Box
          w="100vw"
          h="20vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          >
            <Button colorScheme='orange'>
                Create Event
            </Button>
        </Box>
    </ChakraProvider>
  );
}
