'use client'
import React from 'react';
import { SortOption } from '@/app/types/types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Flex, Image, Text } from '@chakra-ui/react';
import trophy from '@/public/trophyimage.png';
import ClickableTableTh from './ClickableTableTh';
import { useRouter } from 'next/navigation';
import { User } from '@/app/interfaces';


const dummyUsers: User[] = [
    { firstName: 'John', lastName: 'Doe', coffeeCounter: 15, coffeeRating: 4.8 },
    { firstName: 'Jane', lastName: 'Smith', coffeeCounter: 12, coffeeRating: 4.5 },
    { firstName: 'Mike', lastName: 'Johnson', coffeeCounter: 18, coffeeRating: 4.2 },
    { firstName: 'Emily', lastName: 'Brown', coffeeCounter: 10, coffeeRating: 4.7 },
    { firstName: 'David', lastName: 'Wilson', coffeeCounter: 14, coffeeRating: 4.3 },
];

export default function LeaderboardTable({ sortOption }: { sortOption: SortOption }) {
    let isSortedName = false;
    let isSortedOrders = false;
    let isSortedRating = false;

    let sortedUsers = [...dummyUsers].sort((a, b) => {
        if (sortOption === 'rating') {
            isSortedRating = true;
            isSortedName = false;
            isSortedOrders = false;
            return b.coffeeRating - a.coffeeRating;
        }
        if (sortOption === 'Name') {
            isSortedName = true;
            isSortedOrders = false;
            isSortedRating = false;
            return a.firstName.localeCompare(b.firstName);
        } else {
            isSortedOrders = true;
            isSortedName = false;
            isSortedRating = false;
            return b.coffeeCounter - a.coffeeCounter;
        }
    });

    const router = useRouter();

    function sortStrategy(value: string) {
        console.log(`Sorting by ${value}`);
        switch (value) {
            case 'Name':
                router.push(`/leaderboard?sort=${value}`);
                break;
            case 'orders':
                router.push(`/leaderboard?sort=${value}`);
                break;
            case 'rating':
                router.push(`/leaderboard?sort=${value}`);
                break;
        }
    }

    return (
        <TableContainer>
            <Table variant="simple" colorScheme="orange" size="md">
                <Thead>
                    <Tr>
                        <ClickableTableTh value={'Name'} sortStrategy={sortStrategy} isSorted={isSortedName} />
                        <ClickableTableTh value={'orders'} sortStrategy={sortStrategy} isSorted={isSortedOrders} />
                        <ClickableTableTh value={'rating'} sortStrategy={sortStrategy} isSorted={isSortedRating} />
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedUsers.map((user, index) => (
                        <Tr key={index} bg={index % 2 === 0 ? 'orange.50' : 'white'}>
                            <Td className='w-72'>
                                <Flex alignItems="center">
                                    <Text fontWeight="medium" className='mr-1'>
                                        {user.firstName} {user.lastName}
                                    </Text>
                                    {index === 0 && (
                                        <Box mr={2}>
                                            <Image src={trophy.src} alt="Trophy" boxSize="24px" />
                                        </Box>
                                    )}
                                </Flex>
                            </Td>
                            <Td>
                                <Text fontWeight="medium">{user.coffeeCounter}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight="medium">{user.coffeeRating.toFixed(1)}</Text>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

