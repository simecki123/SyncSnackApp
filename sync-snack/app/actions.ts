'use server'

import { z } from "zod"
import { signIn } from "@/app/auth";
import { redirect } from "next/navigation";

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
  const result = await signIn("credentials", {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    redirect: false,
  });
  if (result?.error) {
    return {
      message: result.error
    };
  }

  //Fetch user profile and check if it exists. If not redirect to /setprofile?userId=66b61229a558375b24aa822d
  
  redirect('/home');
}

export async function registerWithLink(prevState: any, formData: FormData) {


  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the form",
    };
  }

  const data: any = validatedFields.data;
  data.groupId = formData.get('groupId');
  data.groupCode = formData.get('groupCode');


  return {};
}
