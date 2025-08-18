import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertAuditRequestSchema } from "@shared/schema";
import { z } from "zod";

// Enhanced contact form schema with validation
const contactFormSchema = insertLeadSchema.extend({
  type: z.literal("contact"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Enhanced audit form schema with validation
const auditFormSchema = insertAuditRequestSchema.extend({
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

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/lead", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Log the submission
      console.log(`New contact form submission: ${lead.email}`);
      
      res.json({ 
        success: true, 
        message: "We'll get back to you within 24 hours.",
        id: lead.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Audit form submission
  app.post("/api/audit", async (req, res) => {
    try {
      const validatedData = auditFormSchema.parse(req.body);
      const audit = await storage.createAuditRequest(validatedData);
      
      // Log the submission
      console.log(`New audit request: ${audit.email} for ${audit.website}`);
      
      res.json({ 
        success: true, 
        message: "We'll review your site and send insights within 24 hours.",
        id: audit.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating audit request:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Admin route to view submissions (optional)
  app.get("/api/admin/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/audits", async (req, res) => {
    try {
      const audits = await storage.getAuditRequests();
      res.json(audits);
    } catch (error) {
      console.error("Error fetching audit requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
