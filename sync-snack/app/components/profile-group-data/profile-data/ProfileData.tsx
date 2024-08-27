'use client'
import { useEffect, useState } from 'react';
import { OrderStats, ProfileUser } from '@/app/interfaces';
import { Box, Button, Text, Flex, VStack, Heading, HStack, Image } from '@chakra-ui/react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { DonutChart, LineChart } from '@tremor/react';
import Modal from '../../modals/Modal';
import EditUserComponent from '../../edit-user/EditUserComponent';



export default function ProfileData({ user, userData, yearlyReportData }: { yearlyReportData: any[], user: any, userData: OrderStats[] }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

  // Separate data into two lists: one for type and one for status
  const typeData = userData.filter(item => 'type' in item);
  const statusData = userData.filter(item => 'orderStatus' in item);

  // Calculate completed and canceled orders
  const completedOrders = statusData[0].count
  const canceledOrders = statusData[1].count

  return (
    <Box className='md:h-full mt-2'>
      <Box className='space-y-8 md:flex md:items-center md:justify-around'>
        <Box className='flex flex-col items-center space-y-4'>
          <Image className='rounded-full' fallbackSrc='/profile_picture.png' objectFit='cover' src={photoUrl} boxSize={36} />
          <Text className='text-xl font-semibold'>{firstName} {lastName}</Text>
          <Text className='italic'>{user.email}</Text>
          <Box className='flex space-x-2'>
            <Button className='shadow-lg' onClick={() => setIsModalOpen(true)} colorScheme='xred'>Edit User</Button>
          </Box>
        </Box>

        <Box className='md:flex space-y-8 md:space-y-0'>
          <Box className='space-y-8'>
            <Box className='bg-orange-light-1 p-4 mx-2 rounded-xl shadow-lg'>
              <Box className='flex items-center'>
                <CheckCircleIcon className='size-5' />
                <Text className='text-tremor-default p-1'>Total completed orders</Text>
              </Box>
              <Box className='bg-white rounded-xl py-4'>
                <Text className='text-tremor-metric flex justify-center'>{completedOrders}</Text>
              </Box>
            </Box>

            <Box className='bg-orange-light-1 p-4 mx-2 rounded-xl shadow-lg'>
              <Box className='flex items-center'>
                <ExclamationCircleIcon className='size-5' />
                <Text className='text-tremor-default p-1'>Total canceled orders</Text>
              </Box>
              <Box className='bg-white rounded-xl py-4'>
                <Text className='text-tremor-metric flex justify-center'>{canceledOrders}</Text>
              </Box>
            </Box>
          </Box>

          <Box>
            <DonutChart className="flex justify-center md:w-72 md:items-center md:h-full md:p-10"
              data={typeData}
              category="count"
              index="type"
              showAnimation={true}
              variant="donut"
              colors={['#d98068', '#8c3331', '#681615']}
              valueFormatter={dataFormatter} />
          </Box>
        </Box>
      </Box>
      <Box className='md:mt-4 hidden md:block'>
        <LineChart
          className="h-80"
          data={yearlyReportData}
          index="date"
          categories={['Total Events', 'Total Orders']}
          colors={['#f2a470', '#681615']}
          onValueChange={(v) => console.log(v)}
          showAnimation={true}
          animationDuration={2000}
          minValue={0}
          curveType='monotone'
          allowDecimals={false}
        />
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditUserComponent user={user} setPhotoUrl={setPhotoUrl} setFirstName={setFirstName} setLastName={setLastName} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </Box>
  );
}
