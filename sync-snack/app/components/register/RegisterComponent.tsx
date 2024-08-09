"use client";
import React, { useState } from 'react';
import { Box, useToast, Button, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function RegisterComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showToast = (title: string, description: string, status: 'success' | 'error' | 'info' | 'warning') => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const isEmailValid = await isUserEmailValid();
      console.log(isEmailValid)
      if (isEmailValid) {
        showToast('Error', "Your email is not valid", 'error');
        return;
      }

      const userData = await registerUser();

      if (!userData.userId) {
        showToast('Error', 'Failed to register user', 'error');
        return;
      }

      showToast('Success', 'We have sent you an email verification. Please verify your email.', 'success');
      setTimeout(() => {
        router.push('https://mail.google.com/mail/u/0/#inbox');
      }, 2000);
    } catch (error: any) {
      if (error.message === 'EmailAlreadyInUse') {
        showToast('Error', 'This email is already in use.', 'error');
      } else {
        console.error('Registration error:', error);
        showToast('Error', 'An unexpected error occurred. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async () => {
    const response = await fetch(`http://localhost:8080/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.status === 400) {
      throw new Error('EmailAlreadyInUse');
    }

    if (!response.ok) {
      throw new Error('Failed to register user');
    }


    return response.json();
  };

  const isUserEmailValid = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(formData.email)) {
      return true;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/users/check', {
        method: 'GET',
        body: formData.email,
      });
  
      return response.ok;
    } catch {
      return false;
    }
  };
  

  return (
    <Box className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <FormControl className="mb-4">
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
        />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
        />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel>Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          type="password"
        />
      </FormControl>
      <Flex justifyContent="center" mt={6}>
        <Button
          colorScheme="orange"
          onClick={handleSubmit}
          isDisabled={isLoading || !(formData.email && formData.password && formData.password === formData.confirmPassword)}
          isLoading={isLoading}
          loadingText="Registering"
        >
          Register
        </Button>
      </Flex>
    </Box>
  );
}
