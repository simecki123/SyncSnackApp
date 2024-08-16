'use client'

import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
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

export default function HeaderPhone({ activeUser, notifications }: any) {

  const [isOpenNav, setIsOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  function NavigationPhone() {
    return (
      <Box className="bg-orange-100 hover:scale-75 transition">
        <NavLinks setIsOpen={setIsOpen} />
      </Box>
    )
  }

  return (
    <Box>
      <Box className="flex items-center bg-orange-200 px-2 justify-between">
        <Box className="flex items-center">
          <SyncSnackLogo />
          <Text className="text-2xl font-semibold">SyncSnack</Text>
        </Box>
        <Box className="flex space-x-2 items-center">
          <NotificationBell activeUser={activeUser} notifications={notifications} />
          <HamburgerMenu isOpen={onOpen} setIsOpen={setIsOpen} />
        </Box>
      </Box>
      <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <NavLinks setIsOpen={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

