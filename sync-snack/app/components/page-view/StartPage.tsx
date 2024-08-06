"use client"
import { Box, Button, Image, Text, VStack, HStack, Flex, keyframes, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import Footer from './Footer'
import { useRouter } from 'next/navigation'
import hamburgerIcon from '@/public/hamburger.jpg';
import coffeCup from '@/public/paper-cup-coffee-with-beans-.jpg'

const MotionBox = motion(Box)

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

export default function StartPage() {
  const router = useRouter()

  const handleLogin = () => router.push('/login')
  const handleRegister = () => router.push('/register')

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" px={4}>
        <Flex flex={1} direction="column" align="center" justify="center" py={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            mb={16}
            w="full"
          >
            <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" px={4}>
              <Box flex={1} textAlign={{ base: 'center', md: 'left' }}>
                <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight="bold" color="orange.500">
                  Welcome to Sync Snack
                </Text>
              </Box>
              <VStack spacing={4} align="stretch" mt={{ base: 4, md: 0 }}>
                <Button colorScheme="orange" variant="outline" width={{ base: 'full', md: 'auto' }}>
                  Buy us a coffee
                </Button>
                <Button colorScheme="orange" onClick={handleLogin} width={{ base: 'full', md: 'auto' }}>
                  Login
                </Button>
                <Button colorScheme="orange" onClick={handleRegister} width={{ base: 'full', md: 'auto' }}>
                  Register
                </Button>
              </VStack>
            </Flex>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            w="full"
            mb={16}
          >
            <Flex direction={{ base: 'column', md: 'row' }} align="center">
              <Box
                flex={1}
                bg="orange.500"
                color="white"
                p={8}
                borderRightRadius={{ base: 'none', md: '50px' }}
                mb={{ base: 4, md: 0 }}
                zIndex={1}
                position="relative"
                left={0}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '-100vw',
                  width: '100vw',
                  bg: 'orange.500',
                }}
              >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>About this app</Text>
                <Text>
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Paragraph about this web app.... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Image src={coffeCup.src} alt="Coffee Cup" boxSize={{ base: '100%', md: '400px' }} objectFit="cover" />
            </Flex>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            w="full"
          >
            <Flex direction={{ base: 'column-reverse', md: 'row' }} align="center">
              <Image src={hamburgerIcon.src} alt="Hamburger" boxSize={{ base: '100%', md: '400px' }} objectFit="cover" />
              <Box
                flex={1}
                bg="orange.500"
                color="white"
                p={8}
                borderLeftRadius={{ base: 'none', md: '50px' }}
                mt={{ base: 4, md: 0 }}
                zIndex={1}
                position="relative"
                right={0}
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: '-100vw',
                  width: '100vw',
                  bg: 'orange.500',
                }}
              >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>About us</Text>
                <Text>
                  A big and cool about us paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  A big and cool about us paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  A big and cool about us paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  A big and cool about us paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  A big and cool about us paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>
          </MotionBox>
        </Flex>
      </Container>

      <Footer />
    </Box>
  )
}
