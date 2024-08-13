'use server'

import { z } from "zod"
import { signIn } from "@/app/auth";
import { revalidatePath } from "next/cache";
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

  try {
    // Check if the user exists
    const userExistsResponse = await fetch(`http://localhost:8080/api/users/check?email=${validatedFields.data.email}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the email is verified
    const verifyResponse = await fetch(`http://localhost:8080/api/users/verify?email=${validatedFields.data.email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.isVerified) {
      return {
        isVerified: false,
        message: "Your email is not verified. Please check your email.",
      };
    }

    // Fetch user ID
    const getUser = await fetch(`http://localhost:8080/api/users/id?email=${validatedFields.data.email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userIdjson = await getUser.json();

    // Check if the user has a profile
    const checkProfileResponse = await fetch(`http://localhost:8080/api/users/profile?userId=${userIdjson.userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const checkProfile = await checkProfileResponse.json();
    console.log("checkProfile ", checkProfile);

    if (!checkProfile.isProfilePresent) {
      return {
        isVerified: false,
        message: "Your user doesn't have a profile set. Please complete your profile.",
        userId: userIdjson.userId,
      };
    }

    // Attempt to sign in
    const result = await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });

    console.log("result ", result)
    

    if (result.error) {
      return {
        isVerified: true,
        message: "Invalid credentials",
      };
    }

    return {success: true}

    
  } catch (error) {
    return {
      isVerified: true,
      message: "Invalid mail, please register",
    };
  }
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
