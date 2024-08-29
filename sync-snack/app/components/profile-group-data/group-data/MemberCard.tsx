import { Box, Image, Text } from "@chakra-ui/react";
import clsx from "clsx";

export default function MemberCard({ index, user, }: { index: any, user: any }) {
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
        </Box>
        {userIsMvp && (
          <Box className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></Box>
        )}
      </Box>
    );
  }