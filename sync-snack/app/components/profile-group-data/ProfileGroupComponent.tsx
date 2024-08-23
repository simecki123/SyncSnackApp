"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import ProfileData from './profile-data/ProfileData';
import { MonthlyCountFinal } from '@/app/(main)/profile/page';

export default function ProfileGroupComponent({ user, userData, yearlyReportData }:
  { user: any, userData: [], yearlyReportData: MonthlyCountFinal[] }) {

  return (
    <Box className='md:h-full'>
      <ProfileData user={user} userData={userData} yearlyReportData={yearlyReportData} />
    </Box>
  );
}





