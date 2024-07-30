import React from 'react';
import { Box } from '@chakra-ui/react';
import FilteredEvents from './filttered-events/FilteredEvents';
import { auth } from '@/app/auth';

export interface Event {
  eventId: string;
  creatorId: string;
  creatorFirstName: string;
  creatorLastName: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
}

export default async function InProgressEvents({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const filter = typeof searchParams?.filter === 'string' ? searchParams.filter : 'MIX';
  

  const session = await auth();
  const activeUser: any = session?.user;
  console.log("Currently active user: ", activeUser);
  

  const eventsResponse = await fetch('http://localhost:8080/api/events/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
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
    throw new Error(`HTTP error! status: ${eventsResponse.status}`);
  }

  const events: Event[] = await eventsResponse.json();
  console.log("Events response: ",eventsResponse)
  console.log("Events: ", events);

  return (
    <Box p={6} bg="gray.50" borderRadius="lg">
      <FilteredEvents activeUser={activeUser} initialEvents={events} initialFilter={filter} />
    </Box>
  );
}