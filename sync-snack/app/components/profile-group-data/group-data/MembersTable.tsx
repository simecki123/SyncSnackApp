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
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { GrUserAdmin } from "react-icons/gr";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import React from 'react'
import MemberCard from './MemberCard'

export default function MembersTable({ members, futureMembers, user, currentPage }: any) {
  const router = useRouter();
  const [sortStrategy, setSortStrategy] = useState('Score')
  const [data, setData] = useState(members)
  const [hasNextPage, setHasNextPage] = useState(true)

  const { isOpen: isKickOpen, onOpen: onKickOpen, onClose: onKickClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  console.log("Members ", members)

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
        'Authorization': `Bearer ${user.accessToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setHasNextPage(futureMembers.length > 0);
      });
  }, [sortStrategy, currentPage]);

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

  function AdminButtons() {
    return (
      <Box className='flex space-x-2 w-full justify-around'>
        <IconButton onClick={onKickOpen} aria-label='Kick User' colorScheme='xred' variant='outline' icon={<XMarkIcon />} />
        <IconButton onClick={onAddOpen} aria-label='Give Admin' colorScheme='xblue' variant='outline' icon={<GrUserAdmin />} />
      </Box>
    )
  }

  return (
    <>
    <Box className="md:hidden grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
          {members.map((user: any, index: number) => {
            return (
              <MemberCard user={user} key={index} index={index}></MemberCard>
            )
          })}
      </Box>

    <Box className='hidden md:flex md:justify-center w-full flex-col h-full  '>
      <TableContainer className='w-full pt-10 pb-4 px-6'>
        <Text className='text-xl font-semibold mb-2 ml-2'>Members</Text>
        <Table variant='simple' className='shadow-lg'>
          <Thead className='bg-orange-light-1 text-white'>
            <Tr>
              {['Name', 'Orders', 'Score'].map((header: any, index: number) => (
                <TableHeader key={index} value={header} />
              ))}
              {user.roles.includes('ADMIN') && <TableHeader value={'Actions'} />}
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
                {user.roles.includes('ADMIN') && <Td className='w-56'><AdminButtons /></Td>}
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
      <AlertDialog
        isOpen={isKickOpen}
        leastDestructiveRef={cancelRef}
        onClose={onKickClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Kick User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onKickClose}>
                Cancel
              </Button>
              <Button colorScheme='xred' onClick={onKickClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isAddOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAddClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Give Admin To User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to give admin rights to this user?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAddClose}>
                Cancel
              </Button>
              <Button colorScheme='xblue' ml={3} onClick={onAddClose}>
                Give Admin
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
    </>
  )
}



