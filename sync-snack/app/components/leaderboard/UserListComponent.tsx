import React from 'react';
import { SortOption } from '@/app/types/types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Flex, Image, Text } from '@chakra-ui/react';
import trophy from '@/public/trophyimage.png';

interface User {
    firstName: string;
    lastName: string;
    coffeeCounter: number;
    coffeeRating: number;
}

const dummyUsers: User[] = [
    { firstName: 'John', lastName: 'Doe', coffeeCounter: 15, coffeeRating: 4.8 },
    { firstName: 'Jane', lastName: 'Smith', coffeeCounter: 12, coffeeRating: 4.5 },
    { firstName: 'Mike', lastName: 'Johnson', coffeeCounter: 18, coffeeRating: 4.2 },
    { firstName: 'Emily', lastName: 'Brown', coffeeCounter: 10, coffeeRating: 4.7 },
    { firstName: 'David', lastName: 'Wilson', coffeeCounter: 14, coffeeRating: 4.3 },
];

export default function UserListComponent({ sortOption }: { sortOption: SortOption }) {
    const sortedUsers = [...dummyUsers].sort((a, b) => {
        if (sortOption === 'rating') {
            return b.coffeeRating - a.coffeeRating;
        } else {
            return b.coffeeCounter - a.coffeeCounter;
        }
    });

    return (
        <TableContainer>
            <Table variant="simple" colorScheme="orange" size="md">
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Coffee Count</Th>
                        <Th isNumeric>Rating</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedUsers.map((user, index) => (
                        <Tr key={index} bg={index % 2 === 0 ? 'orange.50' : 'white'}>
                            <Td>
                                <Text fontWeight="bold" fontSize="lg">
                                    {index + 1}
                                </Text>
                            </Td>
                            <Td>
                                <Flex alignItems="center">
                                    {index === 0 && (
                                        <Box mr={2}>
                                            <Image src={trophy.src} alt="Trophy" boxSize="24px" />
                                        </Box>
                                    )}
                                    <Text fontWeight="medium">
                                        {user.firstName} {user.lastName}
                                    </Text>
                                </Flex>
                            </Td>
                            <Td isNumeric>
                                <Text fontWeight="medium">{user.coffeeCounter}</Text>
                            </Td>
                            <Td isNumeric>
                                <Text fontWeight="medium">{user.coffeeRating.toFixed(1)}</Text>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}