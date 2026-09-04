import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.literal("contact"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;