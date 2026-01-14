import { z } from "zod";

const email = z.string().trim().toLowerCase().pipe(z.email("Invalid email"));
const password = z.string().min(8, "Password must be at least 8 characters");

export const signInEmailSchema = z.object({
  email,
  password,
  rememberMe: z.boolean().optional(),
});

export const signUpEmailSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email,
    password,
    passwordConfirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
  });

export const requestPasswordResetSchema = z.object({
  email,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Invalid or missing token"),
    newPassword: password,
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type SignInEmailInput = z.infer<typeof signInEmailSchema>;
export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;
export type RequestPasswordResetInput = z.infer<
  typeof requestPasswordResetSchema
>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
