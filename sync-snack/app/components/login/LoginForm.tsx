'use client'
import { loginUser } from "@/app/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Box, Button, Card, CardBody, CardHeader, Input, Link, Text, useTimeout } from '@chakra-ui/react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const initialState: any = {
  message: null,
  errors: null,
}

export default function LoginForm() {

  const [state, formAction] = useFormState(loginUser, initialState);

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
      {state?.errors?.email && !state.message ?
        state.errors.email.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        )) : null
      }
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button colorScheme='blue' type="submit" aria-disabled={pending}
      className="w-full">
      Login
    </Button>
  )
}


function PasswordInput({ state }: { state: any }) {
  return (
    <>
      <Input type="password" id="password" name="password" placeholder="Password" />
      {state?.errors?.password && !state.message ?
        state.errors.password.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        )) : null
      }
    </>
  )
}
