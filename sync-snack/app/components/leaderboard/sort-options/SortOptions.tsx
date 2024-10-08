"use client";
import React from 'react';
import { Box, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { SortOption } from '@/app/types/types';
import { SortOptionsProps } from '@/app/interfaces';



export default function SortOptions({ sortOption, onSortChange, users }: SortOptionsProps) {
    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOption = event.target.value as SortOption;
        onSortChange(newSortOption);
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
                    <option value={SortOption.ORDER_COUNT}>Order count</option>
                    <option value={SortOption.SCORE}>Score</option>
                    <option value={SortOption.FIRSTNAME}>First name</option>
                </Select>
            </FormControl>
        </Box>
    );
}