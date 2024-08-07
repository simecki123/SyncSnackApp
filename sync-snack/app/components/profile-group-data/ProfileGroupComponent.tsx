"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ProfileData from './profile-data/ProfileData';

export default function ProfileGroupComponent({ user }: any) {

  return (
    <Tabs isFitted variant='enclosed' className='md:h-full'>
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'orange.400' }}>Profile</Tab>
        <Tab _selected={{ color: 'white', bg: 'orange.400' }}>Group</Tab>
      </TabList>
      <TabPanels className='md:h-full'>
        <TabPanel className='md:h-full'>
          <ProfileData user={user} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
