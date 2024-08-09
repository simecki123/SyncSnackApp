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

  // const client = new Client();
  // client.brokerURL = 'ws://localhost:8080/ws'
  //
  // client.onConnect = function(frame) {
  //   client.subscribe(`/topic/orders/${activeUser?.userProfileId}`, (message) => {
  //     console.log('AJDEEEEEE AJDEE AJDEE', message)
  //   });
  // };
  //
  // client.activate()

  console.log(`${activeUser?.userProfileId}`, 'user user user')

  const profilePhotoBuffer = await profilePhotoResponse.arrayBuffer();
  const profilePhotoBase64 = Buffer.from(profilePhotoBuffer).toString('base64');
  const profilePhotoSrc = `data:image/png;base64,${profilePhotoBase64}`;
  user.profilePhoto = profilePhotoSrc;

  return (
    <Box className='md:flex md:h-screen md:justify-center md:items-center'>
      <Box className='md:w-9/12 md:h-5/6'>
        <ProfileGroupComponent user={user} />
      </Box>
    </Box>
  );

}
// <ProfileData user={user} accessToken={activeUser?.accessToken} />


