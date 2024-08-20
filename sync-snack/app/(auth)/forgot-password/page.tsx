import { Box, Button, Input, Text, VStack, Container, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { cookies } from 'next/headers';
import PasswordResetForm from '@/app/components/change-password/PsswordResetForm';


export default function ForgotPasswordPage({ searchParams }: { searchParams: { passwordResetTokenId: string, resetCode: string } }) {
 

  return (
    <Container maxW="lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="orange.500">
          Reset Your Password
        </Heading>
        <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <PasswordResetForm searchParams={searchParams} />
        </Box>
      </VStack>
    </Container>
  );
}
