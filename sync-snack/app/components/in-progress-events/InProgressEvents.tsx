import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import InProgressEventCard from './in-progress-event-card/InProgressEventCard';

export default function InProgressEvents() {

  return (
    <SimpleGrid columns={3} spacing={10}>
      {inprogressevents.map((event) => (
        <InProgressEventCard key={event._id} event={event} />
      ))}
    </SimpleGrid>
  );
}

const inprogressevents = [
  {
    _id: "1",
    creatorId: "1",
    description: "I'm going to Lidl",
    groupId: "1",
    status: "InProgress",
    eventType: "Food",
  },
  {
    _id: "2",
    creatorId: "Karlo",
    description: "I'm going to make coffee",
    groupId: "1",
    status: "InProgress",
    eventType: "Coffee",
  },
  {
    _id: "3",
    creatorId: "3",
    description: "I'm going to the gym",
    groupId: "2",
    status: "InProgress",
    eventType: "Exercise",
  },
  {
    _id: "4",
    creatorId: "4",
    description: "I'm going to the park",
    groupId: "2",
    status: "InProgress",
    eventType: "Leisure",
  },
  {
    _id: "5",
    creatorId: "5",
    description: "I'm going to the movies",
    groupId: "2",
    status: "InProgress",
    eventType: "Entertainment",
  },
  {
    _id: "6",
    creatorId: "5",
    description: "I'm going to the movies",
    groupId: "2",
    status: "InProgress",
    eventType: "Entertainment",
  },
];
