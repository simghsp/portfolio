import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  message: z.string().trim().min(10, "Say a bit more — at least 10 characters.").max(2000),
  // Honeypot: real users never see or fill this field (hidden via CSS).
  // Any bot that fills every field on the form trips this and gets silently
  // rejected without revealing that a honeypot exists.
  company: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
