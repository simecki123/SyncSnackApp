'use client';

import React, { useState, useEffect } from 'react';
import { SimpleGrid, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import InProgressEventCard from '../in-progress-event-card/InProgressEventCard';
import coffeeImage from '@/public/coffeImage.png';
import breakfastImage from '@/public/breakfastImage.png';
import drinksImage from '@/public/drinks.png';
import mixImage from '@/public/mix.png';
import { Event } from '@/app/eventService';
import FilterButton from '../filter-button/FIlterButton';

export default function FilteredEvents({ initialEvents, initialFilter }: { initialEvents: Event[], initialFilter: string }) {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState(initialFilter);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilter = searchParams.get('filter') || 'all';
    if (newFilter !== filter) {
      // Update filter and events based on the new filter
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
      <Flex justify="center" mb={6} gap={4}>
        <FilterButton filter="all" currentFilter={filter} onClick={() => handleFilterChange('all')}>
          All
        </FilterButton>
        <FilterButton filter="coffee" currentFilter={filter} onClick={() => handleFilterChange('coffee')}>
          <Image src={coffeeImage} alt="Coffee" width={24} height={24} />
          Coffee
        </FilterButton>
        <FilterButton filter="food" currentFilter={filter} onClick={() => handleFilterChange('food')}>
          <Image src={breakfastImage} alt="Breakfast" width={24} height={24} />
          Food
        </FilterButton>
        <FilterButton filter='mix' currentFilter={filter} onClick={() => handleFilterChange('mix')}>
          <Image src={mixImage} alt="Mix" width={24} height={24} />
          Mix
        </FilterButton>
        <FilterButton filter='drinks' currentFilter={filter} onClick={() => handleFilterChange('drinks')}>
          <Image src={drinksImage} alt="Drinks" width={24} height={24} />
          Drinks
        </FilterButton>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {events.map((event) => (
          <InProgressEventCard key={event._id} event={event} />
        ))}
      </SimpleGrid>
    </>
  );
}

