'use client'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Box,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MembersTable({ members, futureMembers, userToken, currentPage }: any) {
  const router = useRouter();
  const [sortStrategy, setSortStrategy] = useState('Score')
  const [data, setData] = useState(members)
  const [hasNextPage, setHasNextPage] = useState(true)

  console.log("Members ",members)

  useEffect(() => {
    let strategyModifed = "SCORE"
    switch (sortStrategy) {
      case ('Score'):
        strategyModifed = 'SCORE'
        break
      case ('Orders'):
        strategyModifed = 'ORDER_COUNT'
        break
      case ('Name'):
        strategyModifed = 'FIRSTNAME'
        break
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/group?sortCondition=${strategyModifed}&page=${currentPage}&size=4`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setHasNextPage(futureMembers.length > 0);
      });
  }, [sortStrategy, currentPage, userToken]);

  const handlePageChange = (newPage: number) => {
    router.push(`/group?page=${newPage}`);
  };

  function TableHeader({ value }: any) {
    return (
      <Th
        className={clsx('hover:cursor-pointer', {
          ' bg-orange-light-2': sortStrategy === value,
        })}
        onClick={() => setSortStrategy(value)}>{value}</Th>
    )
  }

  return (
    <Box className='w-full flex flex-col'>
      <TableContainer className='w-full pt-10 pb-4 px-6'>
        <Text className='text-xl font-semibold mb-2 ml-2'>Members</Text>
        <Table variant='simple' className='shadow-lg'>
          <Thead className='bg-orange-light-1 text-white'>
            <Tr>
              {['Name', 'Orders', 'Score'].map((header: any, index: number) => (
                <TableHeader key={index} value={header} />
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((member: any, index: number) => (
              <Tr key={index}>
                <Td className='flex items-center'>
                  <Image src={member.photoUrl} fallbackSrc='/profile_picture.png'
                    objectFit='cover' className='size-10 rounded-full mr-2' />
                  <Text>{member.firstName} {member.lastName}</Text>
                </Td>
                <Td>{member.orderCount}</Td>
                <Td>{member.score.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={4} className='mr-4 mb-2 grow flex justify-center items-start'>
        <HStack spacing={2}>
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            isDisabled={currentPage === 0}
            colorScheme='xorange'
            size="sm"
          />
          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            onClick={() => handlePageChange(currentPage + 1)}
            size="sm"
            isDisabled={!hasNextPage}
            colorScheme='xorange'
          />
        </HStack>
      </Box>
    </Box>
  )
}
