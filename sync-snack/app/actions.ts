'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod"

// login function
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


interface RegisterForm {
  email: string,
  password: string
}
// register function
export async function registerUser(registerForm: RegisterForm) {
  try {
    fetch(`${process.env.BACKEND_URL}/api/auth/register`);
    revalidatePath('/');
    return {message: "User registered"}
  } catch (e) {
    return {message: 'Failed to register'}
  }
}

interface ProfileForm {
  firstName: string,
  lastName:string
}
interface JoinGroupForm {
  groupName: string,
  groupPassword: string,
}

export async function patchUserProfile(userProfileForm:ProfileForm, JoinGroupForm: JoinGroupForm ) {
  const groupResponse = await fetch(`${process.env.BACKEND_URL}/getGroup`);
  //const groupId = groupResponse.data._id;
  await fetch(`${process.env.BACKEND_URL}/updateUserProfile`);
}

interface CreateGroupForm {
  groupName: string,
  groupPassword: string,
  groupDescription: string,
}
export async function createNewGroup(groupForm:CreateGroupForm) {
  await fetch(`${process.env.BACKEND_URL}/createNewGroup`);
}



