import { Box, Image, Text } from '@chakra-ui/react';

export default function OrderTypePretty({ orderType }: any) {
  switch (orderType) {
    case "coffee":
      return (
        <Image src='/coffeImage.png' boxSize='30px' />
      );
    case "outside":
      return (
        <Image src='/mix.png' boxSize='30px' />
      );
    default:
      return null;
  }
}
