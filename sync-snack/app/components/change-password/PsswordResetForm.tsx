"use client";

import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';


export default function PasswordResetForm({ searchParams }: { searchParams: any }) {
  const toast = useToast();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    

    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    console.log("new password: ", newPassword);
    console.log("confirm password: ", confirmPassword);
    console.log(searchParams)
    

    if (newPassword === confirmPassword) {
      try {
        const { passwordResetTokenId, resetCode } = searchParams;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            passwordResetTokenId,
            resetCode,
            newPassword,
          }),
        });

        console.log("Response ", response);
        
        if (response.ok) {
            toast({
                title: "Success",
                description: "Your new password has been successfully updated",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            router.push('/login');
          
        } else {
            toast({
                title: "Server error",
                description: "Your new password cant be updated please try again later",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
        }
      } catch (error) {
        toast({
            title: "Error",
            description: "Something went wrong, please try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
      }
    } else {
        toast({
            title: "Error",
            description: "Your new password and confirm password must be the same",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
    }

    
  }

  

  return (
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
  );
}
