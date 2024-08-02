import { auth } from '@/app/auth';
import { fetchImproved } from '@/app/fetch';
import React from 'react'

import dynamic from 'next/dynamic';
import { GroupUsers } from '@/app/interfaces';

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

  const users: GroupUsers = await fetchImproved(`/api/profiles/group`);
  console.log('users: ', users)
  

  console.log("Group Data: ",groupData);

  const profilePhotoResponse = await fetch(`${process.env.BACKEND_URL}/api/profiles/profile-photo/download`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  });

  const profilePhotoBuffer = await profilePhotoResponse.arrayBuffer();
  const profilePhotoBase64 = Buffer.from(profilePhotoBuffer).toString('base64');
  const profilePhotoSrc = `data:image/png;base64,${profilePhotoBase64}`;
  user.profilePhoto = profilePhotoSrc;

  

  return (
    <>
      <ProfileGroupComponent user={user} accessToken={activeUser?.accessToken} group={groupData} users={users} />
    </>
  )
}


