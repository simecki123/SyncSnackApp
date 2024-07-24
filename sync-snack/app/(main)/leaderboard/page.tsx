import SortOptions from "@/app/components/leaderboard/sort-options/SortOptions";
import { SortOption } from '@/app/types/types';
import UserListComponent from "@/app/components/leaderboard/UserListComponent";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";

export default function Leaderboard({ searchParams }: { searchParams: { sort?: string } }) {
  const sortOption = (searchParams.sort as SortOption) || SortOption.CoffeeCount;
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Coffee Leaderboard
        </Heading>
        <Box bg="white" boxShadow="md" borderRadius="lg" p={6}>
          <SortOptions sortOption={sortOption} />
          <UserListComponent sortOption={sortOption} />
        </Box>
      </VStack>
    </Container>
  );
}