'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
      message: 'Please fill out the form',
    };
  }

  try {
    await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(validatedFields.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidatePath('/')
    redirect('/home')
  } catch (e) {
    return { message: 'Failed to log in', errors: null }
  }
}

