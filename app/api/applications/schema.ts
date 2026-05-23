import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  gender: z.enum(["female", "male", "others"], {
    message: "Please select a gender",
  }),
  age: z
    .number()
    .min(2, "Age must be at least 2")
    .max(80, "Age must not exceed 80"),
  address: z.string().min(5, "Residential address is required"),
  instagram: z.string().min(1, "Instagram username is required"),
  facebook: z.string().min(1, "Facebook username is required"),
  agencyOption: z.enum(["yes", "no"], { message: "Please select an option" }),
  previousAgency: z.string().optional(),
  headshot: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Headshot must be less than 5MB",
    ),
  rightSideProfile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Right side profile must be less than 5MB",
    ),
  leftSideProfile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Left side profile must be less than 5MB",
    ),
  fullLength: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Full length photo must be less than 5MB",
    ),
});
