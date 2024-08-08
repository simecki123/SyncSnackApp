import { auth } from "@/app/auth";
import { fetchImproved } from "@/app/fetch";
import { Text, Image, Box } from "@chakra-ui/react";
import clsx from "clsx";

import dynamic from 'next/dynamic';

const GroupButtons = dynamic(
  () => import('@/app/components/group/GroupButtons'),
  { ssr: false }
);

export default async function GroupPage() {

  const session = await auth();
  const activeUser: any = session?.user;

  const members = await fetchImproved('/api/profiles/group')
  const groupData = await fetchImproved(`/api/groups/${activeUser?.groupId}`);

  console.log(groupData, 'groupData')
  console.log(members, 'members')

  return (
    <>
      <Text className="flex justify-center mt-2 text-4xl font-semibold">{groupData?.name}</Text>
      <Text className="italic text-tremor-content m-6">{groupData?.description}lication that is designed to break all the rules of app
        building in a way that no other set of developers will be able to match.</Text>
      <GroupButtons group={groupData} />
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {members.map((user: any, index: number) => {
          return (
            <MemberCard user={user} key={index} index={index} />
          )
        })}
      </Box>
    </>
  )
}

function MemberCard({ index, user }: any) {
  const userIsMvp = index === 0;

  return (
    <Box className={clsx("flex rounded-xl shadow-lg overflow-hidden relative", {
      "bg-amber-400": userIsMvp,
      "bg-gray-100": !userIsMvp,
    })}>
      <Image
        className="h-[150px] w-[150px] rounded-l-xl mr-4"
        src={user.photoUrl}
        alt="Profile picture"
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
