'use client'

import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import HamburgerMenu from "./HamburgerMenu"
import NavLinks from "./NavLinks"
import SyncSnackLogo from "./SyncSnackLogo"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import NotificationBell from "../notification/NotificationBell"
import { SignOutButton } from "./SignOutButton"
import { NavLinksContext } from "@/app/providers"

export default function HeaderPhone({ activeUser }: any) {

  const [isOpenNav, setIsOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const eventContext = useContext(NavLinksContext)


  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeUser.accessToken}`
      },
    }).then((value) => {
      if (!value.ok) {
        throw new Error('no event')
      }
      eventContext.setIsEventLinkShown(true)
      return value.json()
    }).catch((_) => {
      console.log('no current event')
    });

    if (activeUser.roles.includes('ADMIN')) {
      eventContext.setIsAdminLinkShown(true)
    }
  })

  

  return (
    <Box>
      <Box className="flex items-center bg-blue-2 px-2 justify-between">
        <Box className="flex items-center">
          <SyncSnackLogo />
          <Text className="text-2xl font-semibold">SyncSnack</Text>
        </Box>
        <Box className="flex space-x-2 items-center">

          <HamburgerMenu isOpen={onOpen} setIsOpen={setIsOpen} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={4} mr={4}>
        <NotificationBell activeUser={activeUser} />
      </Box>
      <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <NavLinks setIsOpen={onClose} IsAdminLinkShown={eventContext.isAdminLinkShown} IsEventLinkShown={eventContext.isEventLinkShown} />
            <SignOutButton />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

