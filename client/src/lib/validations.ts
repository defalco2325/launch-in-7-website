import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.literal("contact"),
});

export const auditFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().url("Valid website URL is required"),
  goal: z.enum([
    "increase-traffic",
    "improve-conversions", 
    "better-performance",
    "modernize-design",
    "add-ecommerce",
    "mobile-optimization"
  ]),
  timeline: z.enum([
    "asap",
    "this-month",
    "next-month", 
    "this-quarter",
    "exploring"
  ]),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AuditFormData = z.infer<typeof auditFormSchema>;
