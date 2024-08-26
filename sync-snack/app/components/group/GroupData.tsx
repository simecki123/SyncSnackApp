"use client";
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

import useNotificationGroupDataChanged from '@/app/store/notificationGroupDataChanged';
import dynamic from 'next/dynamic';

const GroupButtons = dynamic(
    () => import('@/app/components/group/GroupButtons'),
    { ssr: false }
);

export default function GroupData({initialGroupData, activeUser, fetchGroupData}: {
    initialGroupData: any;
    activeUser: any;
    fetchGroupData: () => Promise<any>}) {

    const { hasNewNotificationGroupDataChanged, setHasNewNotificationGroupDataChanged} = useNotificationGroupDataChanged();
    const [groupData, setGroupData] = useState(initialGroupData);

    useEffect(() => {
        const updateGroupData = async () => {
          if (hasNewNotificationGroupDataChanged) {
            const newGroupData = await fetchGroupData();
            console.log(newGroupData);
            setGroupData(newGroupData);
            setHasNewNotificationGroupDataChanged(false);
          }
        };
    
        updateGroupData();
      }, [hasNewNotificationGroupDataChanged, fetchGroupData, setHasNewNotificationGroupDataChanged]);

  return (
    <Box>
        <Text className="flex md:justify-start md:m-6 justify-center mt-2 text-4xl font-semibold">{groupData?.name}</Text>
        <Text className="italic text-tremor-content m-6">{groupData?.description}</Text>
        <GroupButtons startGroup={groupData} activeUser={activeUser} fetchGroupData={fetchGroupData} />
      </Box>
  )
}
