'use client'
import { loginUser } from "@/app/actions"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
  message: '',
}

export default function LoginForm() {

  // const [state, formAction] = useFormState(loginUser, initialState)

  return (
    <form action={loginUser}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">password:</label>
      <input type="password" id="password" name="password" required />
      <SubmitButton />
    </form>

  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      Login
    </button>
  )
}
