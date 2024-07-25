import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { getEvents, Event } from '@/app/eventService';
import FilteredEvents from './filttered-events/FilteredEvents';

export default async function InProgressEvents({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const filter = typeof searchParams?.filter === 'string' ? searchParams.filter : 'all';
  const events = await getEvents(filter);

  return (
    <Box p={6} bg="gray.50" borderRadius="lg">
      <FilteredEvents initialEvents={events} initialFilter={filter} />
    </Box>
  );
}
