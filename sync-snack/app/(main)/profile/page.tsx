import { auth } from '@/app/auth';
import { fetchImproved } from '@/app/fetch';
import dynamic from 'next/dynamic';
import { SortOption } from '@/app/types/types';
import { Metadata } from 'next';

const ProfileGroupComponent = dynamic(
  () => import('@/app/components/profile-group-data/ProfileGroupComponent'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Profile Data Page',
};

export default async function ProfileDataPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await auth();
  const activeUser: any = session?.user;

  const user: any = await fetchImproved(`/api/profiles/${activeUser?.userProfileId}`);
  user.email = activeUser?.email;

  const groupData = await fetchImproved(`/api/groups/${activeUser?.groupId}`);
  user.groupName = groupData.name;

  // Read the sort option from URL params or use default
  const sortOption = (searchParams.sortBy as SortOption) || SortOption.ORDER_COUNT;

  // Fetch users with the current sort option
  console.log("sortConsition: ", sortOption);
  const users = await fetchImproved(`/api/profiles/group?sortCondition=${sortOption}`);

  async function getUsersNew(currentSortOption: SortOption) {
    "use server";
    const newUsers = await fetchImproved(`/api/profiles/group?sortCondition=${currentSortOption}`);
    return newUsers;
  }

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
    <ProfileGroupComponent
      getUsersNew={getUsersNew}
      user={user}
      accessToken={activeUser?.accessToken}
      group={groupData}
      users={users}
      currentSortOption={sortOption}
    />
  );
}
