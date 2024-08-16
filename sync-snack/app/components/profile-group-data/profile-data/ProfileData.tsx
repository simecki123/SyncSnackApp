'use client'
import { useEffect, useState } from 'react'
import { ProfileUser } from '@/app/interfaces'
import { Box, Button, Text, Flex, VStack, Heading, HStack, Image } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import RatingPrettyProfile from '../rating-preatty-profile/RatingPreattyProfile'
import clsx from 'clsx'
import { BarChart, DonutChart } from '@tremor/react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ProfileData({ user }: any) {

  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

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

          // window.location.reload()
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    if (acceptedFiles.length > 0) {
      uploadFiles();
    }
  }, [acceptedFiles]);

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
                <Text className='text-tremor-metric flex justify-center'>12</Text>
              </Box>
            </Box>

            <Box className='bg-orange-300 p-4 mx-2 rounded-xl shadow-lg'>
              <Box className='flex items-center'>
                <ExclamationCircleIcon className='size-5' />
                <Text className='text-tremor-default p-1'>Total canceled orders</Text>
              </Box>
              <Box className='bg-white rounded-xl py-4'>
                <Text className='text-tremor-metric flex justify-center'>12</Text>
              </Box>
            </Box>
          </Box>

          <Box>
            <DonutChart className="flex justify-center md:w-72 md:items-center md:h-full md:p-10"
              data={datahero}
              showAnimation={true}
              variant="donut"
              colors={['orange-100', 'orange-200', 'orange-300', 'orange-400']}
              valueFormatter={dataFormatter} />
          </Box>
        </Box>
      </Box>
      <Box className='md:mt-4 hidden md:block'>
        <BarChart
          data={chartdata}
          index="name"
          showAnimation={true}
          categories={['Amount of orders']}
          colors={['orange']}
          valueFormatter={dataFormatter}
          yAxisWidth={48} />
      </Box>
    </Box>
  );

}

const datahero = [
  {
    name: 'Coffee',
    value: 39,
  },
  {
    name: 'Mix',
    value: 24,
  },
  {
    name: 'Food',
    value: 21,
  },
  {
    name: 'Beverage',
    value: 13,
  },
];

const chartdata = [
  {
    name: 'January',
    'Amount of orders': 45,
  },
  {
    name: 'February',
    'Amount of orders': 62,
  },
  {
    name: 'March',
    'Amount of orders': 37,
  },
  {
    name: 'April',
    'Amount of orders': 58,
  },
  {
    name: 'May',
    'Amount of orders': 73,
  },
  {
    name: 'June',
    'Amount of orders': 29,
  },
  {
    name: 'July',
    'Amount of orders': 84,
  },
  {
    name: 'August',
    'Amount of orders': 91,
  },
  {
    name: 'September',
    'Amount of orders': 33,
  },
  {
    name: 'October',
    'Amount of orders': 77,
  },
  {
    name: 'November',
    'Amount of orders': 49,
  },
  {
    name: 'December',
    'Amount of orders': 65,
  },
];


