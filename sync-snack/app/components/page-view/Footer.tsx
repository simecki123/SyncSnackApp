// Footer.js
import { Box, Image, Text, Flex, HStack, Link, Icon } from '@chakra-ui/react'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'
import React from 'react'

export default function Footer() {
  return (
    <Box bg="black" color="white" py={8}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={8}
      >
        <Flex align="center" mb={{ base: 4, md: 0 }}>
          <Image src="/logo.png" alt="Logo" boxSize="100px" mr={4} />
          <Box>
            <Text fontWeight="bold">Made by:</Text>
            <Text>Andrija Škontra</Text>
            <Text>Karlo Kovačević</Text>
            <Text>Teo Jakšić</Text>
            <Text>Šime Rončević</Text>
          </Box>
        </Flex>
        <Box textAlign={{ base: 'center', md: 'right' }}>
          <Text fontWeight="bold" mb={2}>Follow us on social media:</Text>
          <HStack spacing={4} justify={{ base: 'center', md: 'flex-end' }}>
            <Link href="#" isExternal>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}