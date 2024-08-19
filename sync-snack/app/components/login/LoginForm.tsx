'use client'

import { loginUser } from "@/app/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Box, Button, Card, CardBody, CardHeader, Input, Link, Text, useToast } from '@chakra-ui/react'
import { useEffect, useCallback } from 'react'
import { useRouter } from "next/navigation"
import { fetchImproved } from "@/app/fetch"

const initialState: any = {
  message: null,
  errors: null,
  isVerified: true,
  userId: null,
}

export default function LoginForm() {
  const toast = useToast();
  const router = useRouter();

  const handleLogin = useCallback(async (prevState: any, formData: FormData) => {
    const result = await loginUser(prevState, formData);
    if (result.success){
      router.push("/home");
    }
    return { ...result, timestamp: Date.now() }; // Force state update with timestamp
  }, [router]);

  const [state, formAction] = useFormState(handleLogin, initialState);

  useEffect(() => {
    console.log(state);
    
    if (state.message) {
      toast({
        title: state.message,
        status: state.isVerified === false ? "error" : "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } 

    if (state.message === "Your user doesn't have a profile set. Please complete your profile.") {
      router.push(`/setprofile?userId=${state.userId}`)
    }
    
  }, [state.message, state.isVerified, toast, state.timestamp, state.userId, router]);

  async function handleForgotYourPassword() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const mail = emailInput?.value;

    if (mail && mail.trim() !== "") {
      try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password-request`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: mail
            }),
        }
        
        )

        if (response.ok) {
          toast({
            title: "Password reset email sent",
            description: "Please check your email for further instructions.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });

          window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        } else {
          const errorData = await response.json();
          if (response.status === 404) {
            toast({
              title: "User not found",
              description: "There is no account associated with this email address.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          } else {
            toast({
              title: "Error",
              description: errorData.message || "Something went wrong. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
        }
      } catch (error: any) {
        console.error("Error during password reset request:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: "Email required",
        description: "Please enter your email address before requesting a password reset.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Card className="w-96" colorScheme="red">
      <CardHeader>
        <Box className="flex justify-center items-center">
          <Text className="font-bold text-xl">Log Into SyncSnack</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <form action={formAction}>
          <Box className="px-4 py-4">
            <Box className="my-4">
              <EmailInput state={state} />
            </Box>
            <Box className="my-4">
              <PasswordInput state={state} />
            </Box>
            <Box className="flex justify-center items-center">
              <SubmitButton />
            </Box>
            <Box className="flex justify-center items-center mt-4">
              <Text 
                onClick={handleForgotYourPassword}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </Text>
            </Box>
            <Box className="flex justify-center items-center mt-4">
              <Link href="/register">Sign up for SyncSnack</Link>
            </Box>
          </Box>
        </form>
      </CardBody>
    </Card>
  )
}

function EmailInput({ state }: { state: any }) {
  return (
    <>
      <Input type="email" id="email" name="email" placeholder="Email" />
      {state?.errors?.email && (
        <p className="mt-2 text-sm text-red-500">
          {state.errors.email[0]}
        </p>
      )}
    </>
  )
}

function PasswordInput({ state }: { state: any }) {
  return (
    <>
      <Input type="password" id="password" name="password" placeholder="Password" />
      {state?.errors?.password && (
        <p className="mt-2 text-sm text-red-500">
          {state.errors.password[0]}
        </p>
      )}
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button 
      colorScheme='blue' 
      type="submit" 
      isDisabled={pending}
      className="w-full"
    >
      Login
    </Button>
  )
}