// InProgressEvents.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { auth } from '@/app/auth';
import { Event } from '@/app/interfaces';
import dynamic from 'next/dynamic';

const FilteredEvents = dynamic(
  () => import('./filttered-events/FilteredEvents'),
  { ssr: false }
);

export default async function InProgressEvents({ searchParams }: InProgressEventsProps) {
  const filter = typeof searchParams?.filter === 'string' ? searchParams.filter : 'ALL';
  const session = await auth();
  const activeUser: any = session?.user;


  async function fetchEvents(filter: string) {
    "use server"
    const eventsResponse = await fetch(`${process.env.BACKEND_URL}/api/events/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeUser?.accessToken}`
      },
      body: JSON.stringify({
        status: "PENDING",
        eventType: filter.toUpperCase()
      }),
    });

    if (!eventsResponse.ok) {
      console.log('FAILED TO FETCH EVENTS');
      return [];
    }

    const events: Event[] = await eventsResponse.json();
    return events;
  }


  const initialEvents = await fetchEvents(filter);

  return (
    <Box p={6} className='bg-gray-50' borderRadius="lg">

      <FilteredEvents
        activeUser={activeUser}
        initialEvents={initialEvents}
        initialFilter={filter}
        fetchEvents={fetchEvents}
      />
    </Box>
  );
}

interface InProgressEventsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}
