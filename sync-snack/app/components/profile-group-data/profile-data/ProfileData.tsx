'use client'
import { useEffect, useState } from 'react'
import { OrderStats, ProfileUser } from '@/app/interfaces'
import { Box, Button, Text, Flex, VStack, Heading, HStack, Image } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import RatingPrettyProfile from '../rating-preatty-profile/RatingPreattyProfile'
import clsx from 'clsx'
import { BarChart, DonutChart,LineChart } from '@tremor/react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { fetchImproved } from '@/app/fetch'

export default function ProfileData({ user, userData }: {user: any, userData: OrderStats[]}) {
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

  // Separate data into two lists: one for type and one for status
  const typeData = userData.filter(item => 'type' in item);
  const statusData = userData.filter(item => 'status' in item);

  // Calculate completed and canceled orders
  const completedOrders = statusData.find(item => item.status === 'COMPLETED')?.count || 0;
  const canceledOrders = statusData.find(item => item.status === 'CANCELLED')?.count || 0;

  useEffect(() => {
    const uploadFiles = async () => {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/edit`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${user?.accessToken}`
            },
            body: formData
          });

          if (!response.ok) {
            throw new Error('File upload failed');
          }

          const responseFinal = await response.json()
          setPhotoUrl(responseFinal.photoUrl)
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    if (acceptedFiles.length > 0) {
      uploadFiles();
    }
  }, [acceptedFiles, user?.accessToken]);

  return (
    <Box className='md:h-full mt-2'>
      <Box className='space-y-8 md:flex md:items-center md:justify-around'>
        <Box className='flex flex-col items-center space-y-4'>
          <Image className='rounded-full' fallbackSrc='/profile_picture.png' objectFit='cover' src={photoUrl} boxSize={36} />
          <Text className='text-xl font-semibold'>{user.firstName} {user.lastName}</Text>
          <Text className='italic'>{user.email}</Text>
          <Box className='flex space-x-2'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button className='shadow-lg'>Add Photo</Button>
            </div>
            <Button className='shadow-lg'>Edit User</Button>
          </Box>
        </Box>

        <Box className='md:flex space-y-8 md:space-y-0'>
          <Box className='space-y-8'>
            <Box className='bg-orange-300 p-4 mx-2 rounded-xl shadow-lg'>
              <Box className='flex items-center'>
                <CheckCircleIcon className='size-5' />
                <Text className='text-tremor-default p-1'>Total completed orders</Text>
              </Box>
              <Box className='bg-white rounded-xl py-4'>
                <Text className='text-tremor-metric flex justify-center'>{completedOrders}</Text>
              </Box>
            </Box>

            <Box className='bg-orange-300 p-4 mx-2 rounded-xl shadow-lg'>
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
              colors={['orange-100', 'orange-200', 'orange-300', 'orange-400']}
              valueFormatter={dataFormatter} />
          </Box>
        </Box>
      </Box>
      <Box className='md:mt-4 hidden md:block'>
        <BarChart
          data={statusData}
          index="status"
          categories={['count']}
          showAnimation={true}
          colors={['orange']}
          valueFormatter={dataFormatter}
          yAxisWidth={48} />
      </Box>
    </Box>
  );
}