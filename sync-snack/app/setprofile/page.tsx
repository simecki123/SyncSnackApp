import SetProfileComponent from '@/app/components/register/SetProfileComponent'
import { Box, Container, Heading } from '@chakra-ui/react'
import React from 'react'

export default function SetUpProfilePage() {
  return (
    <Box position="relative" minHeight="100vh" overflow="hidden" className="bg-prim-cl">
    <Container className="bg-prim-cl" maxW="container.md" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl">
          Register
        </Heading> 
      </Box>
      
        <SetProfileComponent />
      
    </Container>
    </Box>
  )
}
