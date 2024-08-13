'use client';

import React, { useState, useEffect } from 'react';
import { SimpleGrid, Flex, Text, Box, Select } from "@chakra-ui/react";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import InProgressEventCard from '../in-progress-event-card/InProgressEventCard';
import { Event } from '@/app/interfaces';
import FilterButton from '../filter-button/FIlterButton';
import eventBus from "@/app/eventBus";

export default function FilteredEvents({
  activeUser,
  fetchEvents,
  initialEvents,
  initialFilter
}: {
  activeUser: any,
  fetchEvents: (filter: string) => Promise<Event[]>,
  initialEvents: Event[],
  initialFilter: string
}) {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState(initialFilter);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentFilter = searchParams.get('filter') || 'MIX';
    if (currentFilter !== filter) {
      setFilter(currentFilter);
      fetchEvents(currentFilter).then(setEvents);
    }
  }, [searchParams, fetchEvents]);

  const handleFilterChange = (newFilter: string) => {
    router.push(`?filter=${newFilter}`, { scroll: false });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleNewNotification = async (e: CustomEvent) => {
        console.log('Received newNotification event', e.detail);
        const newEvents = await fetchEvents(filter); // Use current filter
        setEvents(newEvents);
      };

      eventBus.on('newNotification', handleNewNotification as unknown as EventListener);

      return () => {
        eventBus.remove('newNotification', handleNewNotification as unknown as EventListener);
      };
    }
  }, [fetchEvents, filter]); // Added filter as a dependency

  return (
    <>
      <Box display={{ base: 'block', md: 'none' }} mb={6}>
        <Select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="MIX">All</option>
          <option value="COFFEE">Coffee</option>
          <option value="FOOD">Food</option>
          <option value="MIX">Mix</option>
          <option value="DRINKS">Drinks</option>
        </Select>
      </Box>

      <Flex wrap="wrap" justify="center" display={{ base: 'none', md: 'flex' }} mb={6} gap={4}>
        <FilterButton filter='MIX' currentFilter={filter} onClick={() => handleFilterChange('MIX')}>
          <Image className='mr-1' src='/orange_drink.png' alt="Mix" width={24} height={24} />
          Mix
        </FilterButton>
        <FilterButton filter="COFFEE" currentFilter={filter} onClick={() => handleFilterChange('COFFEE')}>
          <Image className='mr-1' src='/coffee_green_circle.png' alt="Coffee" width={24} height={24} />
          Coffee
        </FilterButton>
        <FilterButton filter="FOOD" currentFilter={filter} onClick={() => handleFilterChange('FOOD')}>
          <Image className='mr-1' src='/pizza.png' alt="Food" width={24} height={24} />
          Food
        </FilterButton>
        <FilterButton filter='DRINKS' currentFilter={filter} onClick={() => handleFilterChange('DRINKS')}>
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
    </>
  );
}
