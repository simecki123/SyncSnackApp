"use client"
import { registerWithLink } from "@/app/actions";
import { Box, Button, Card, CardBody, CardHeader, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState: any = {
  message: null,
  errors: null,
}

export default function RegisterWithLinkForm({ searchParams }: any) {


  const [state, formAction] = useFormState(registerWithLink, initialState);

  useEffect(() => {
  }, [state])

  function handleSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('groupId', searchParams.groupId)
    formData.append('groupCode', searchParams.groupCode)
    formAction(formData)
  }

  return (
    <Card className="w-96" colorScheme="red">
      <CardHeader>
        <Box className="flex justify-center">
          <Text className="text-2xl font-semibold">Register</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <Box>
            <Input type="text" id="email" name="email" placeholder="Email" />
            <Box className="text-red-500 text-sm">
              {state?.errors?.email && state.errors.email[0]}
            </Box>
          </Box>
          <Box>
            <Input type="password" id="password" name="password" placeholder="Password" />
            <Box className="text-red-500 text-sm">
              {state?.errors?.password && state.errors.password[0]}
            </Box>
          </Box>
          <Box>
            <Input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" />
            <Box className="text-red-500 text-sm">
              {state?.errors?.confirmPassword && state.errors.confirmPassword.map((error: string) => { return error })}
            </Box>
          </Box>
          <Box>
            <Input type="text" id="first-name" name="first-name" placeholder="First Name" />
            <Box className="text-red-500 text-sm">
              {state?.errors?.firstName && state.errors.firstName[0]}
            </Box>
          </Box>
          <Box>
            <Input type="text" id="last-name" name="last-name" placeholder="Last Name" />
            <Box className="text-red-500 text-sm">
              {state?.errors?.lastName && state.errors.lastName[0]}
            </Box>
          </Box>
          <Button
            type="submit"
            colorScheme="green"
            bg={'orange.300'}
            _hover={{
              background: "orange.400",
              color: "white",
            }}
          >Register</Button>
        </form>
      </CardBody>
    </Card >
  )
}
