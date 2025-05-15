import { z } from "zod";

export const createStep1Schema = (interestsOptions: string[]) => {
  const interestsEnum = z.enum(interestsOptions as [string, ...string[]]);

  return z
    .object({
      firstName: z
        .string()
        .min(1, "First name is required.")
        .max(50, "First name is too long."),
      lastName: z
        .string()
        .min(1, "Last name is required.")
        .max(50, "Last name is too long."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
      confirmPassword: z
        .string()
        .min(8, "Password confirmation must be at least 8 characters long."),
      interests: z
        .array(interestsEnum)
        .min(1, "You must select at least one interest.")
        .max(2, "You can select a maximum of 2 interests."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match.",
      path: ["confirmPassword"],
    });
};
