'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"
import { signIn, signOut } from "@/app/auth";

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

    cookies().set('jwt', json.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
    });


    console.log('working like charm')
    await signIn("credentials", validatedFields.data)
    console.log('working like wood')

    revalidatePath('/')
  } catch (e) {
    let message = null;
    setTimeout(() => {
      message = 'Failed to log in'
    }, 500)
    return { message: message, errors: null }
  }
  redirect('/home')
}