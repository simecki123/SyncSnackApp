import { auth } from "@/app/auth";
import GroupOrdersDonut from "@/app/components/profile-group-data/group-data/GroupOrdersDonut";
import { fetchImproved } from "@/app/fetch";
import { Text, Image, Box } from "@chakra-ui/react";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { redirect } from "next/navigation";
import { Suspense } from "react";

const GroupButtons = dynamic(
  () => import('@/app/components/group/GroupButtons'),
  { ssr: false }
);

const MembersTable = dynamic(
  () => import('@/app/components/profile-group-data/group-data/MembersTable'),
  { ssr: false }
);

export default async function GroupPage({ searchParams }: { searchParams: { page?: string } }) {
  const session = await auth();
  const activeUser: any = session?.user;

  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 0;
  const pageSize = 4; // You can adjust this as needed

  const fetchMembers = async (pageNumber: number): Promise<any[]> => {
    try {
      const response = await fetchImproved(`/api/profiles/group?sortCondition=SCORE&page=${pageNumber}&size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  };

  await fetch(`${process.env.BACKEND_URL}/api/profiles/scores`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeUser?.accessToken}`
    }
  })

  const members = await fetchMembers(currentPage);
  const futureMembers = await fetchMembers(currentPage + 1);
  const groupData = await fetchImproved(`/api/groups/${activeUser?.groupId}`);
  const orderDounuts = await fetchImproved(`/api/groups/count`);

  

  return (
    <Box className="md:grid md:grid-cols-2 md:gap-10 md:grid-rows-[1fr_70%] md:h-screen md:pl-4">
      <Box>
        <Text className="flex md:justify-start md:m-6 justify-center mt-2 text-4xl font-semibold">{groupData?.name}</Text>
        <Text className="italic text-tremor-content m-6">{groupData?.description}</Text>
        <GroupButtons group={groupData} activeUser={activeUser} />
      </Box>
      <Box className="hidden md:flex md:h-full md:items-center md:justify-center">
        <MvpMemberCard user={members[0]} />
      </Box>
      <Box>
        <Box className="md:hidden grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
          {members.map((user: any, index: number) => {
            return (
              <MemberCard user={user} key={index} index={index} />
            )
          })}
        </Box>
        <Suspense fallback={<p>Loading...</p>}>
          <Box className="hidden md:flex md:justify-center">
            <MembersTable
              members={members}
              futureMembers={futureMembers}
              userToken={activeUser?.accessToken}
              currentPage={currentPage}
            />
          </Box>
        </Suspense>
      </Box>
      <Box className="hidden md:flex md:justify-center">
        <GroupOrdersDonut datahero={orderDounuts} />
      </Box>
    </Box>
  )
}

function MemberCard({ index, user }: any) {
  const userIsMvp = index === 0;

  return (
    <Box className={clsx("flex rounded-xl shadow-lg overflow-hidden relative", {
      "bg-orange-light-1": userIsMvp,
      "bg-gray-100": !userIsMvp,
    })}>
      <Image
        className="h-[150px] w-[150px] rounded-l-xl mr-4"
        src={user.photoUrl}
        alt="Profile picture"
        objectFit='cover'
      />
      <Box className="grow flex flex-col justify-center space-y-2 p-4">
        <Text className="font-semibold">
          {user.firstName} {user.lastName}
        </Text>
        <Box className={clsx("", {
          "flex": userIsMvp,
        })}>
          <Text className={clsx("mr-1 italic", {
            "bg-white p-1 rounded-md font-semibold": userIsMvp,
          })}>
            {user.score.toFixed(2)}⭐
          </Text>
        </Box>
        <Text className="italic">
          {user.orderCount + 10} Orders Completed
        </Text>
      </Box>
      {userIsMvp && (
        <Box className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></Box>
      )}
    </Box>
  );
}

function MvpMemberCard({ user }: any) {
  return (
    <Box className="flex rounded-xl shadow-lg overflow-hidden relative bg-orange-light-1">
      <Image
        className="h-[150px] w-[150px] rounded-l-xl mr-4"
        src={user.photoUrl}
        alt="Profile picture"
        fallbackSrc="/profile_picture.png"
        objectFit='cover'
      />
      <Box className="grow flex flex-col justify-center space-y-2 p-4">
        <Text className="font-semibold">
          {user.firstName} {user.lastName}
        </Text>
        <Box className="flex">
          <Text className="mr-1 italic bg-white p-1 rounded-md font-semibold">
            {user.score.toFixed(2)}⭐
          </Text>
        </Box>
        <Text className="italic">
          {user.orderCount + 10} Orders Completed
        </Text>
      </Box>
      <Box className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></Box>
    </Box>
  );
}

