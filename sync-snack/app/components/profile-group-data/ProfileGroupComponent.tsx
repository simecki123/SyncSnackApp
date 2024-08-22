"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import ProfileData from './profile-data/ProfileData';

export default function ProfileGroupComponent({ user, userData }: {user: any, userData: []}) {

  return (
    <Box className='md:h-full'>
      <ProfileData user={user} userData={userData} />
    </Box>
  );
}





