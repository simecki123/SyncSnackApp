import { cache } from 'react';

export interface Event {
  _id: string;
  creatorId: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
}

async function fetchEvents(filter: string): Promise<Event[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const allEvents = [...inprogresseventsCoffee, ...inprogresseventsFood];
  return filter === 'all' ? allEvents : allEvents.filter(event => event.eventType.toLowerCase() === filter);
}

export const getEvents = cache(fetchEvents);


//hardcoded data
const inprogresseventsCoffee: Event[] = [
    {
      _id: "2",
      creatorId: "3",
      description: "I'm going to make coffee",
      groupId: "1",
      status: "InProgress",
      eventType: "Coffee",
    },
    {
      _id: "4",
      creatorId: "4",
      description: "I'm going to the park",
      groupId: "2",
      status: "InProgress",
      eventType: "Coffee",
    },
    {
      _id: "6",
      creatorId: "5",
      description: "I'm going to the movies",
      groupId: "2",
      status: "InProgress",
      eventType: "Coffee",
    },
  ];
  
  const inprogresseventsFood: Event[] = [
    {
      _id: "1",
      creatorId: "1",
      description: "I'm going to Lidl",
      groupId: "1",
      status: "InProgress",
      eventType: "Food",
    },
    {
      _id: "3",
      creatorId: "3",
      description: "I'm going to the gym",
      groupId: "2",
      status: "InProgress",
      eventType: "Food",
    },
    {
      _id: "5",
      creatorId: "5",
      description: "I'm going to the movies",
      groupId: "2",
      status: "InProgress",
      eventType: "Food",
    },
  ];