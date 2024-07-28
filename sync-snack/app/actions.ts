'use server'

import { z } from "zod"
import { signIn } from "@/app/auth";

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

  await signIn("credentials", {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    redirectTo: '/home',
  });
}
