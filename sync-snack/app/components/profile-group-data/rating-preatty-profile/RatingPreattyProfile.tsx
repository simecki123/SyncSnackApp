import { Box, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function RatingPrettyProfile({ rating }: { rating: number }) {
  return (
    <Box display="flex">
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          as={StarIcon}
          boxSize={8}
          color={index < rating ? "yellow.400" : "gray.300"}
        />
      ))}
    </Box>
  );
}