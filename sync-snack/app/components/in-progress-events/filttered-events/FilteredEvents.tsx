'use client';

import React, { useState, useEffect, useContext } from 'react';
import { SimpleGrid, Flex, Text, Box, Select } from "@chakra-ui/react";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import InProgressEventCard from '../in-progress-event-card/InProgressEventCard';
import { EventEvent } from '@/app/interfaces';
import FilterButton from '../filter-button/FIlterButton';
import useNotificationStore from '@/app/store/notificationStore'; // Import the Zustand store
import useNotificationIfEventExpiredStore from '@/app/store/notificationIfEventExpired';
import Hanged from '../../animations/Hanged';

export default function FilteredEvents({
  activeUser,
  fetchEvents,
  initialEvents,
  initialFilter
}: {
  activeUser: any,
  fetchEvents: (filter: string) => Promise<EventEvent[]>,
  initialEvents: EventEvent[],
  initialFilter: string
}) {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState(initialFilter);
  const { hasNewEventNotification, setHasNewEventNotification } = useNotificationStore(); // Use Zustand to get the state
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasNewNotificationIfEventExpiredStore, setHasNewNotificationIfEventExpiredStore } = useNotificationIfEventExpiredStore(); // Use Zustand to get the state

  useEffect(() => {
    const currentFilter = searchParams.get('filter') || 'ALL';
    if (currentFilter !== filter) {
      setFilter(currentFilter);
      fetchEvents(currentFilter).then(setEvents);
    }
  }, [searchParams, fetchEvents]);

  const handleFilterChange = (newFilter: string) => {
    router.push(`?filter=${newFilter}`, { scroll: false });
  };



  useEffect(() => {
    if (hasNewNotificationIfEventExpiredStore !== '') {
      console.log("Isteka...");
      const eventIndex = events.findIndex(event => event.eventId === hasNewNotificationIfEventExpiredStore);

      if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        console.log(`Event with ID ${hasNewNotificationIfEventExpiredStore} deleted.`);
      } else {
        console.log(`Event with ID ${hasNewNotificationIfEventExpiredStore} not found.`);
      }
      setHasNewNotificationIfEventExpiredStore('');
    }
    if (hasNewEventNotification) {
      fetchEvents(filter).then(setEvents);
      setHasNewEventNotification(false); // Reset the state after fetching new events
    }
  }, [hasNewNotificationIfEventExpiredStore, hasNewEventNotification, fetchEvents, filter]);

  return (
    <>
      <Box display={{ base: 'block', md: 'none' }} mb={6}>
        <Select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}

        >
          <option value="ALL">All</option>
          <option value="COFFEE">Coffee</option>
          <option value="FOOD">Food</option>
          <option value="DRINKS">Drinks</option>
        </Select>
      </Box>

      <Flex className='shadow-lg' wrap="wrap" justify="center" display={{ base: 'none', md: 'flex' }} pb={6} gap={4}>
        <FilterButton filter='ALL' currentFilter={filter} onClick={() => handleFilterChange('ALL')}>
          <Image className='mr-1' src='/orange_drink.png' alt="ALL" width={24} height={24} />
          ALL
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
          <Hanged />
        ) : (
          <SimpleGrid className='mt-4' columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {events.map((event) => (
              <InProgressEventCard key={event.eventId} event={event} activeUser={activeUser} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
