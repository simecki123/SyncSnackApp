'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod"

export async function loginUser(formData: FormData) {

  console.log('inside server action..');

  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const data = schema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  try {
    // here a we make the post request do the backend
    fetch(`${process.env.BACKEND_URL}/login`)

    revalidatePath('/')

    return { message: 'Logged in user' }
  } catch (e) {
    return { message: 'Failed to log in' }
  }
}



