import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password should contain at least 8 character"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});
