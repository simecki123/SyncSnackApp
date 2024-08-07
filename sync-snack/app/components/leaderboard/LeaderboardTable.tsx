'use client'
import React, { useState } from 'react';
import { SortOption } from '@/app/types/types';
import { Table, Thead, Tbody, Tr, Td, TableContainer, Box, Flex, Image, Text, Button, HStack, IconButton } from '@chakra-ui/react';
import trophy from '@/public/trophyimage.png';
import ClickableTableTh from './ClickableTableTh';
import { useRouter } from 'next/navigation';
import { SortOptionsProps, User } from '@/app/interfaces';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';



export default function LeaderboardTable({ sortOption, onSortChange, users }: SortOptionsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const maxPageButtons = 5;

    

    

    const totalPages = Math.ceil(users.length / usersPerPage);

    const getPageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Box>
            <TableContainer>
                <Table variant="simple" colorScheme="orange" size="sm">
                    <Thead>
                        <Tr>
                            <ClickableTableTh value={SortOption.FIRSTNAME} sortStrategy={onSortChange} isSorted={sortOption === SortOption.FIRSTNAME} />
                            <ClickableTableTh value={SortOption.ORDER_COUNT} sortStrategy={onSortChange} isSorted={sortOption === SortOption.ORDER_COUNT} />
                            <ClickableTableTh value={SortOption.SCORE} sortStrategy={onSortChange} isSorted={sortOption === SortOption.SCORE} />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentUsers.map((user, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? 'orange.50' : 'white'}>
                                <Td>
                                    <Flex alignItems="center">
                                        <Image alt='No profile picture' src={user.photoUrl} className='size-10 rounded-full mr-2 ' />
                                        <Text fontWeight="medium" fontSize="sm">
                                            {user.firstName} {user.lastName}
                                        </Text>
                                        {index === 0 && currentPage === 1 && (
                                            <Box ml={2}>
                                                <Image src={trophy.src} alt="Trophy" boxSize="16px" />
                                            </Box>
                                        )}
                                    </Flex>
                                </Td>
                                <Td>
                                    <Text fontWeight="medium" fontSize="sm">{user.orderCount}</Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="medium" fontSize="sm">{user.score.toFixed(1)}</Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <HStack justifyContent="center" mt={4} spacing={2}>
                <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    isDisabled={currentPage === 1}
                    aria-label="Previous page"
                    size="sm"
                />
                {getPageNumbers().map((number) => (
                    <Button
                        key={number}
                        onClick={() => paginate(number)}
                        colorScheme={currentPage === number ? "orange" : "gray"}
                        size="sm"
                    >
                        {number}
                    </Button>
                ))}
                <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    isDisabled={currentPage === totalPages}
                    aria-label="Next page"
                    size="sm"
                />
            </HStack>
        </Box>
    );
}