import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(3, "First name should be at least 3 characters"),
    lastName: z.string().min(3, "Last name should be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should contain at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Password should contain at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
