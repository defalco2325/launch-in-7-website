import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertAuditRequestSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import { MailService } from '@sendgrid/mail';

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

// Rate limiting store (simple in-memory)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip;
  const limit = rateLimitStore.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 3) { // Max 3 submissions per minute
    return false;
  }
  
  limit.count++;
  return true;
}

function cleanSubject(website: string, businessName: string): string {
  let subject = website || businessName;
  // Remove protocols
  subject = subject.replace(/^https?:\/\//i, '');
  // Remove trailing slash
  subject = subject.replace(/\/$/, '');
  return `New Onboarding — ${subject}`;
}

function sanitizeText(text: string): string {
  return text.trim().replace(/[<>]/g, '');
}

// Configure multer for file handling
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 20 // Max 20 files
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer file filter:', file.originalname, file.mimetype);
    
    const allowedTypes = /\.(png|jpe?g|svg|webp|pdf|docx?|ai|eps)$/i;
    const allowedMimes = [
      'image/png', 'image/jpeg', 'image/svg+xml', 'image/webp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/postscript',
      'application/illustrator'
    ];
    
    // Allow all files for now to debug
    cb(null, true);
  }
});

// Initialize SendGrid
const mailService = new MailService();
console.log('Environment check:', {
  sendGridConfigured: !!process.env.SENDGRID_API_KEY,
  sendGridKeyLength: process.env.SENDGRID_API_KEY?.length || 0,
  emailTo: process.env.EMAIL_TO,
  emailFrom: process.env.EMAIL_FROM,
  nodeEnv: process.env.NODE_ENV
});

if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API initialized successfully');
} else {
  console.warn('WARNING: SENDGRID_API_KEY not found in environment variables');
}

export async function registerRoutes(app: Express): Promise<Server> {
  console.log('=== REGISTERING ROUTES ===');
  
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

  // Test endpoint without multer first
  app.post("/api/clients/test", async (req, res) => {
    console.log("=== TEST ENDPOINT HIT ===");
    res.json({ ok: true, message: "Test endpoint working" });
  });
  console.log('Registered route: POST /api/clients/test');

  // Client project form submission with optional file uploads
  app.post("/api/clients/submit", upload.any(), async (req, res) => {
    console.log('=== CLIENT SUBMISSION ENDPOINT HIT ===');
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Content-Type:', req.get('Content-Type'));
    
    try {
      // Rate limiting
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
          ok: false, 
          message: "Too many requests. Please try again later." 
        });
      }

      // Honeypot check
      if (req.body.botField || req.body['bot-field']) {
        return res.status(400).json({ ok: false, message: "Invalid request" });
      }

      // Validate required fields
      const businessName = sanitizeText(req.body.businessName || '');
      const website = sanitizeText(req.body.website || '');
      const contactName = sanitizeText(req.body.contactName || '');
      const email = sanitizeText(req.body.email || '');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ ok: false, message: "Valid email is required" });
      }

      if (!contactName) {
        return res.status(400).json({ ok: false, message: "Contact name is required" });
      }

      if (!businessName && !website) {
        return res.status(400).json({ ok: false, message: "Business name or website is required" });
      }

      // Get environment variables
      const emailTo = process.env.EMAIL_TO || 'team@launchin7.io';
      const emailFrom = process.env.EMAIL_FROM || 'onboarding@launchin7.io';
      
      if (!process.env.SENDGRID_API_KEY) {
        console.error('SENDGRID_API_KEY not configured');
        return res.status(500).json({ ok: false, message: "Email service not configured" });
      }

      // Process files
      const files = req.files as Express.Multer.File[] || [];
      let totalSize = 0;
      const attachments: any[] = [];
      let attachmentsTooBig = false;
      const fileList: string[] = [];

      for (const file of files) {
        const sizeInMB = file.size / (1024 * 1024);
        totalSize += file.size;
        fileList.push(`${file.originalname} (${sizeInMB.toFixed(2)}MB)`);
        
        // Check if total size exceeds 28MB (SendGrid limit buffer)
        if (totalSize <= 28 * 1024 * 1024) {
          attachments.push({
            content: file.buffer.toString('base64'),
            filename: file.originalname,
            type: file.mimetype,
            disposition: 'attachment'
          });
        } else {
          attachmentsTooBig = true;
        }
      }

      // Build HTML email body
      const htmlBody = `
        <h2>New Client Onboarding Submission</h2>
        
        <h3>Business Basics</h3>
        <ul>
          <li><strong>Business Name:</strong> ${businessName}</li>
          <li><strong>Website:</strong> ${website}</li>
          <li><strong>Short Description:</strong> ${sanitizeText(req.body.shortDescription || 'Not provided')}</li>
          <li><strong>Biggest Challenge:</strong> ${sanitizeText(req.body.biggestChallenge || 'Not provided')}</li>
        </ul>

        <h3>Contact Information</h3>
        <ul>
          <li><strong>Contact Name:</strong> ${contactName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${sanitizeText(req.body.phone || 'Not provided')}</li>
        </ul>

        <h3>Project Details</h3>
        <ul>
          <li><strong>Systems of Interest:</strong> ${sanitizeText(req.body.solutionsInterested || 'Not specified')}</li>
          <li><strong>Business Objectives:</strong> ${sanitizeText(req.body.objectives || 'Not specified')}</li>
          <li><strong>Timeline:</strong> ${sanitizeText(req.body.timeline || 'Not specified')}</li>
          <li><strong>Budget / Package:</strong> ${sanitizeText(req.body.budget || 'Not specified')}</li>
        </ul>

        ${attachmentsTooBig ? `
        <h3>⚠️ Attachments Too Large</h3>
        <p>The following files were uploaded but exceeded the email size limit:</p>
        <ul>
          ${fileList.map(file => `<li>${file}</li>`).join('')}
        </ul>
        <p>Please contact the client directly to obtain these files.</p>
        ` : fileList.length > 0 ? `
        <h3>Uploaded Files</h3>
        <ul>
          ${fileList.map(file => `<li>${file}</li>`).join('')}
        </ul>
        ` : '<p><em>No files uploaded</em></p>'}
      `;

      // Send email
      const emailData = {
        to: emailTo,
        from: emailFrom,
        subject: cleanSubject(website, businessName),
        html: htmlBody,
        attachments: attachmentsTooBig ? [] : attachments
      };

      await mailService.send(emailData);
      
      console.log(`Client onboarding submission sent: ${email} for ${website || businessName}`);
      
      res.json({ ok: true });

    } catch (error) {
      console.error("Client submission error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        sendGridConfigured: !!process.env.SENDGRID_API_KEY,
        emailTo: process.env.EMAIL_TO || 'team@launchin7.io',
        emailFrom: process.env.EMAIL_FROM || 'onboarding@launchin7.io'
      });
      res.status(500).json({ 
        ok: false, 
        message: "There was an error processing your submission. Please try again." 
      });
    }
  });
  console.log('Registered route: POST /api/clients/submit');

  // Add CORS middleware for API routes
  app.use('/api/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Catch-all route for API endpoints to debug what's being requested
  app.all('/api/*', (req, res, next) => {
    console.log(`=== API CATCH-ALL ===`);
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    next();
  });

  // Fallback for unmatched API routes
  app.all('/api/*', (req, res) => {
    console.log(`=== UNMATCHED API ROUTE ===`);
    console.log(`${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: 'API endpoint not found',
      method: req.method,
      path: req.originalUrl,
      availableEndpoints: [
        'POST /api/clients/test',
        'POST /api/clients/submit',
        'POST /api/lead',
        'POST /api/audit'
      ]
    });
  });

  console.log('=== ALL ROUTES REGISTERED ===');
  const httpServer = createServer(app);
  return httpServer;
}
