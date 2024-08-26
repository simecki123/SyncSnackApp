import { auth } from '@/app/auth';
import { fetchImproved } from '@/app/fetch';
import React from 'react'

import { Client, Message } from '@stomp/stompjs';

import { GroupUsers } from '@/app/interfaces';
import { Box } from '@chakra-ui/react';
import ProfileData from '@/app/components/profile-group-data/profile-data/ProfileData';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import dynamic from 'next/dynamic';

const ProfileGroupComponent = dynamic(
  () => import('@/app/components/profile-group-data/ProfileGroupComponent'),
  { ssr: false }
);

export default async function ProfileDataPage() {

  const session = await auth();
  const activeUser: any = session?.user;


  const user: any = await fetchImproved(`/api/profiles/${activeUser?.userProfileId}`);
  user.email = activeUser?.email;

  const groupData = await fetchImproved(`/api/groups/${activeUser?.groupId}`);
  user.groupName = groupData.name;

  user.accessToken = activeUser?.accessToken

  const users: GroupUsers = await fetchImproved(`/api/profiles/group?sortCondition=ORDER_COUNT`);

  const profilePhotoResponse = await fetch(`${process.env.BACKEND_URL}/api/profiles/profile-photo/download`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  });


  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/orders/stats`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user?.accessToken}`
    },
  });

  const profilePhotoBuffer = await profilePhotoResponse.arrayBuffer();
  const profilePhotoBase64 = Buffer.from(profilePhotoBuffer).toString('base64');
  const profilePhotoSrc = `data:image/png;base64,${profilePhotoBase64}`;
  user.profilePhoto = profilePhotoSrc;

  const yearlyReportEvents: MonthlyCount[] = await fetch(`${process.env.BACKEND_URL}/api/profiles/monthly-summary/events`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  }).then((value) => {
    if (!value.ok) {
      throw new Error('FAILED TO FETCH')
    }
    return value.json()
  }).catch((e) => { return [] })

  const yearlyReportOrders: MonthlyCount[] = await fetch(`${process.env.BACKEND_URL}/api/profiles/monthly-summary/orders`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  }).then((value) => {
    if (!value.ok) {
      throw new Error('FAILED TO FETCH')
    }
    return value.json()
  }).catch((e) => { return [] })

  const monthlyCountFinal: MonthlyCountFinal[] = []

  for (let i = 0; i < yearlyReportEvents.length; i++) {
    monthlyCountFinal.push({
      date: `${yearlyReportEvents[i].month}-${yearlyReportEvents[i].year}`,
      'Total Events': yearlyReportEvents[i].count + Math.floor(Math.random() * 10),
      'Total Orders': yearlyReportOrders[i].count + Math.floor(Math.random() * 10)
    })
  }

  console.log(monthlyCountFinal, 'FINAL MONTHLY COUNT')

  const userData = await response.json()
  console.log("user data: ", userData)

  return (
    <Box className='md:flex md:h-screen md:justify-center md:items-center'>
      <Box className='md:w-9/12 md:h-5/6'>
        <ProfileGroupComponent user={user} userData={userData} yearlyReportData={monthlyCountFinal} />
      </Box>
    </Box>
  );
}

type MonthlyCount = {
  year: number,
  month: number,
  count: number
}

export type MonthlyCountFinal = {
  date: string,
  'Total Events': number,
  'Total Orders': number
}
