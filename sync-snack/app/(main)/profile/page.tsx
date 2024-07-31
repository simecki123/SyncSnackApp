

import { auth } from '@/app/auth';
import ProfileGroupComponent from '@/app/components/profile-group-data/ProfileGroupComponent';
import React from 'react'

export default async function ProfileDataPage() {
    const session = await auth();
    const activeUser: any = session?.user;
    const userToken = activeUser?.accessToken;

  return (
    <ProfileGroupComponent />
  )
}
