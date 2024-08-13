'use client';

import React, { useState, useEffect } from 'react';
import { SimpleGrid, Flex, Button, Text, Box, Select } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import InProgressEventCard from '../in-progress-event-card/InProgressEventCard';
import { Event } from '@/app/interfaces';
import FilterButton from '../filter-button/FIlterButton';

export default function FilteredEvents({
  activeUser,
  initialEvents,
  initialFilter
}: {
  activeUser: any,
  initialEvents: Event[],
  initialFilter: string
}) {
  console.log(initialEvents, 'initial events')
  console.log(initialFilter, 'initial filter')
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState('all');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilter = searchParams.get('filter') || 'all';
    if (newFilter !== filter) {
      setFilter(newFilter);
      const filteredEvents = newFilter === 'all'
        ? [...initialEvents]
        : initialEvents.filter(event => event.eventType.toLowerCase() === newFilter);
      setEvents(filteredEvents);
    }
  }, [searchParams, filter, initialEvents]);

  const handleFilterChange = (newFilter: string) => {
    router.push(`?filter=${newFilter}`, { scroll: false });
  };

  return (
    <>
      {/* Select Dropdown for Small Screens */}
      <Box display={{ base: 'block', md: 'none' }} mb={6}>
        <Select

          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="coffee">Coffee</option>
          <option value="food">Food</option>
          <option value="mix">Mix</option>
          <option value="drinks">Drinks</option>
        </Select>
      </Box>

      {/* Filter Buttons for Larger Screens */}
      <Flex wrap="wrap" justify="center" display={{ base: 'none', md: 'flex' }} mb={6} gap={4}>
        <FilterButton filter="all" currentFilter={filter} onClick={() => handleFilterChange('all')}>
          All
        </FilterButton>
        <FilterButton filter="coffee" currentFilter={filter} onClick={() => handleFilterChange('coffee')}>
          <Image className='mr-1' src='/coffee_green_circle.png' alt="Coffee" width={24} height={24} />
          Coffee
        </FilterButton>
        <FilterButton filter="food" currentFilter={filter} onClick={() => handleFilterChange('food')}>
          <Image className='mr-1' src='/pizza.png' alt="Food" width={24} height={24} />
          Food
        </FilterButton>
        <FilterButton filter='mix' currentFilter={filter} onClick={() => handleFilterChange('mix')}>
          <Image className='mr-1' src='/orange_drink.png' alt="Mix" width={24} height={24} />
          Mix
        </FilterButton>
        <FilterButton filter='drinks' currentFilter={filter} onClick={() => handleFilterChange('drinks')}>
          <Image className='mr-1' src='/beer.png' alt="Drinks" width={24} height={24} />
          Drinks
        </FilterButton>
      </Flex>

      <Box>
        {events.length === 0 ? (
          <Text className='flex justify-center text-xl font-semibold'>There are no active events right now 😔</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {events.map((event) => (
              <InProgressEventCard key={event.eventId} event={event} activeUser={activeUser} />
            ))}
          </SimpleGrid>
        )}
      </Box>
      {/* Add pagination here if necessary */}
    </>
  );
}
