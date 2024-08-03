import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import FilteredEvents from './filttered-events/FilteredEvents';
import { auth } from '@/app/auth';
import { Event } from '@/app/interfaces';

export default async function InProgressEvents({ searchParams }: inProgressEventsProps) {

  const filter = typeof searchParams?.filter === 'string' ? searchParams.filter : 'MIX';

  const session = await auth();
  const activeUser: any = session?.user;

  console.log(activeUser, ' >>> activeUser inside InProgressEvents')

  const eventsResponse = await fetch('http://localhost:8080/api/events/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    },
    body: JSON.stringify({
      creatorId: activeUser?.id,
      groupId: activeUser?.groupId,
      status: "PENDING",
      eventType: filter.toUpperCase

    }),
  });

  if (!eventsResponse.ok) {
    // throw new Error(`HTTP error! status: ${eventsResponse.status}`);
    console.log('FAILED TO FETCH EVENTS')
  }

  const events: Event[] = await eventsResponse.json();

  return (
    <Box p={6} className='bg-gray-50 dark:bg-gray-400' borderRadius="lg">
      <FilteredEvents activeUser={activeUser} initialEvents={events} initialFilter={filter} />
    </Box>
  );
}

interface inProgressEventsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

