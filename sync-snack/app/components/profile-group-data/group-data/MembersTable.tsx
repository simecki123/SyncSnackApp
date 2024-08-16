'use client'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Image,
  Box,
  Button,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function MembersTable({ members, userToken }: any) {

  const [sortStrategy, setSortStrategy] = useState('Score')

  const [data, setData] = useState([])

  useEffect(() => {
    let strategyModifed = "ORDER_COUNT"
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/group?sortCondition=${strategyModifed}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data in fetch')
        setData(data);
      })
  }, [sortStrategy]);

  const MEMBERS_PER_PAGE = 5

  const numberOfPaginationButtons = Math.ceil(data.length / MEMBERS_PER_PAGE)

  const [currentPage, setCurrentPage] = useState(1)

  const [shownMembers, setShownMembers] = useState(data.slice(0, MEMBERS_PER_PAGE * currentPage))

  const headers = ['Name', 'Orders', 'Score']

  useEffect(() => {
    const lastMemberNumber = MEMBERS_PER_PAGE * currentPage;
    setShownMembers(data.slice(lastMemberNumber - MEMBERS_PER_PAGE, lastMemberNumber));
  }, [data, currentPage]);

  function TableHeader({ value }: any) {
    return (
      <Th
        className={clsx('hover:cursor-pointer', {
          ' bg-orange-300': sortStrategy === value,
        })}
        onClick={() => setSortStrategy(value)}>{value}</Th>
    )
  }

  return (
    <Box className='w-full flex flex-col'>
      <TableContainer className='w-full p-10'>
        <Text className='text-xl font-semibold mb-2 ml-2'>Members</Text>
        <Table variant='simple' className='shadow-lg'>
          <Thead className='bg-orange-200 text-white'>
            <Tr>
              {headers.map((header: any, index: number) => {
                return (
                  <TableHeader key={index} value={header} />
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {shownMembers.map((member: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td className='flex items-center'>
                    <Image src={member.photoUrl} fallbackSrc='/profile_picture.png'
                      objectFit='cover' className='size-10 rounded-full mr-2' />
                    <Text>{member.firstName} {member.lastName}</Text>
                  </Td>
                  <Td>{member.orderCount}</Td>
                  <Td>{member.score.toFixed(2)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box className={clsx('flex grow justify-center items-end', { 'hidden': numberOfPaginationButtons === 1 })}>
        {Array.from({ length: numberOfPaginationButtons }).map((_, index) => {
          return (
            <Button
              key={index}
              className={clsx(
                'mx-1 mb-5',
                {
                  'border-orange-400 border-2': currentPage === index + 1,
                }
              )}
              onClick={() => {
                setCurrentPage(index + 1)
                const lastMemberNumber: number = MEMBERS_PER_PAGE * (index + 1)
                setShownMembers(data.slice(lastMemberNumber - MEMBERS_PER_PAGE, lastMemberNumber))
              }
              }>{index + 1}</Button>
          )
        })}
      </Box>
    </Box>
  )
}

