"use client";
import React from 'react';
import { Box, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { SortOption } from '@/app/types/types';

interface SortSelectorProps {
    sortOption: SortOption;
}

export default function SortOptions({ sortOption }: SortSelectorProps) {
    const router = useRouter();

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOption = event.target.value as SortOption;
        console.log('Changing sort to:', newSortOption);
        router.push(`/leaderboard?sort=${newSortOption}`);
    };

    return (
        <Box mb={4}>
            <FormControl>
                <FormLabel htmlFor="sortOption" fontWeight="medium" fontSize="sm">
                    Sort by
                </FormLabel>
                <Select
                    id="sortOption"
                    onChange={handleSortOptionChange}
                    value={sortOption}
                    width="64"
                    size="md"
                    variant="filled"
                    bg="orange.50"
                    borderColor="orange.300"
                    _hover={{ borderColor: "orange.400" }}
                    _focus={{ borderColor: "orange.500", boxShadow: "0 0 0 1px #3182ce" }}
                >
                    <option value={SortOption.CoffeeCount}>Number of coffees</option>
                    <option value={SortOption.Rating}>Rating</option>
                </Select>
            </FormControl>
        </Box>
    );
}