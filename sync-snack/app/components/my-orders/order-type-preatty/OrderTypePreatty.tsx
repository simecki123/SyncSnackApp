import { Box, Image, Text } from '@chakra-ui/react';

export default function OrderTypePretty({ orderType }: any) {
  switch (orderType) {
    case "COFFEE":
      return (
        <Image src='/coffeImage.png' boxSize='30px' />
      );
    case "mix":
      return (
        <Image src='/mix.png' boxSize='30px' />
      );
    case "food":
      return (
        <Image src='/breakfastImage.png' boxSize='30px' />
      );
    case "drinks":
      return (
        <Image src='/drinks.png' boxSize='30px' />
      );
    default:
      return null;
  }
}
