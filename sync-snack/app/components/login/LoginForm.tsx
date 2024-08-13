'use client'

import { loginUser } from "@/app/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Box, Button, Card, CardBody, CardHeader, Input, Link, Text, useToast } from '@chakra-ui/react'
import { useEffect, useCallback } from 'react'
import { useRouter } from "next/navigation"

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
  }, []);

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
    
    
  }, [state.message, state.isVerified, toast, state.timestamp, state.redirectURL, router]);

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
