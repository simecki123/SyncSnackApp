import { z } from "zod"

export const signInSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string()
    .min(3, "Password must be at least 3 charactes long")
})


