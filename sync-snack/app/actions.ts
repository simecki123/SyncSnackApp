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

interface RegisterForm {
  email: string,
  password: string
}
// register function
export async function registerUser(registerForm: RegisterForm) {
  try {
    fetch(`${process.env.BACKEND_URL}/api/auth/register`);
    revalidatePath('/');
    return { message: "User registered" }
  } catch (e) {
    return { message: 'Failed to register' }
  }
}

interface ProfileForm {
  firstName: string,
  lastName: string
}
interface JoinGroupForm {
  groupName: string,
  groupPassword: string,
}

export async function patchUserProfile(userProfileForm: ProfileForm, JoinGroupForm: JoinGroupForm) {
  const groupResponse = await fetch(`${process.env.BACKEND_URL}/getGroup`);
  //const groupId = groupResponse.data._id;
  await fetch(`${process.env.BACKEND_URL}/updateUserProfile`);
}

interface CreateGroupForm {
  groupName: string,
  groupPassword: string,
  groupDescription: string,
}
export async function createNewGroup(groupForm: CreateGroupForm) {
  await fetch(`${process.env.BACKEND_URL}/createNewGroup`);
}




