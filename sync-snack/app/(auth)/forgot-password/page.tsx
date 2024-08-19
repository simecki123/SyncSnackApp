import { Box, Button, Input, Text, VStack, Container, Heading, useToast } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { cookies } from 'next/headers'

export default function ForgotPasswordPage({ searchParams }: { searchParams: { passwordResetToken: string, resetCode: string } }) {
  async function handleSubmit(formData: FormData) {
    'use server'

    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword === confirmPassword) {
      try {
        const { passwordResetToken, resetCode } = searchParams
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/resetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            passwordResetToken,
            resetCode,
            newPassword
          }),
        })

        if (response.ok) {
          cookies().set('toast', JSON.stringify({ 
            title: 'Password Reset Successful', 
            description: 'Your password has been successfully reset.', 
            status: 'success' 
          }))
          redirect('/login')
        } else {
          cookies().set('toast', JSON.stringify({ 
            title: 'Error', 
            description: 'Something went wrong. Please try again.', 
            status: 'error' 
          }))
        }
      } catch (error: any) {
        cookies().set('toast', JSON.stringify({ 
          title: 'Error', 
          description: 'An unexpected error occurred. Please try again later.', 
          status: 'error' 
        }))
      }
    } else {
      cookies().set('toast', JSON.stringify({ 
        title: 'Password Mismatch', 
        description: 'Confirm password does not match the new password.', 
        status: 'error' 
      }))
    }

    redirect('/forgot-password')
  }

  return (
    <Container maxW="lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="orange.500">
          Reset Your Password
        </Heading>
        <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <form action={handleSubmit}>
            <VStack spacing={4}>
              <Box width="100%">
                <Text mb={2} fontWeight="medium">Enter your new password:</Text>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  bg="gray.100"
                  border="none"
                  _focus={{ bg: "gray.200" }}
                />
              </Box>
              <Box width="100%">
                <Text mb={2} fontWeight="medium">Confirm your new password:</Text>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  bg="gray.100"
                  border="none"
                  _focus={{ bg: "gray.200" }}
                />
              </Box>
              <Button
                type="submit"
                colorScheme="orange"
                width="100%"
                mt={4}
              >
                Reset Password
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  )
}

export function Toast() {
  const toast = useToast()
  const cookieStore = cookies()
  const toastData = cookieStore.get('toast')

  if (toastData) {
    const { title, description, status } = JSON.parse(toastData.value)
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top",
    })
    cookieStore.delete('toast')
  }

  return null
}