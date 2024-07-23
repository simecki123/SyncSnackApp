'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod"

export async function loginUser(prevState: any, formData: FormData) {

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(validatedFields.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    console.log(json)

    console.log(res.headers)

    revalidatePath('/')
  } catch (e) {
    console.log('failed to log in error: ', e)
    return { message: 'Failed to log in', errors: null }
  }
}

