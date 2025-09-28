const sgMail = require('@sendgrid/mail');
const multipartParser = require('aws-lambda-multipart-parser');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API initialized successfully');
} else {
  console.warn('WARNING: SENDGRID_API_KEY not found in environment variables');
}

// Rate limiting store (simple in-memory for demo)
const rateLimitStore = new Map();

function checkRateLimit(ip) {
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

function cleanSubject(website, businessName) {
  let subject = website || businessName;
  // Remove protocols
  subject = subject.replace(/^https?:\/\//i, '');
  // Remove trailing slash
  subject = subject.replace(/\/$/, '');
  return `New Onboarding — ${subject}`;
}

function sanitizeText(text) {
  return text.trim().replace(/[<>]/g, '');
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    
    // Get client IP for rate limiting
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    
    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Too many submissions. Please wait a moment before trying again." 
        })
      };
    }

    // Parse multipart form data for Netlify Functions
    let parsed;
    try {
      parsed = multipartParser.parse(event, true);
    } catch (error) {
      console.error('Form parsing error:', error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Error parsing form data. Please try again." 
        })
      };
    }


    // Extract form data using the correct field names from frontend
    const formData = {
      businessName: parsed.businessName,
      tagline: parsed.tagline,
      website: parsed.website,
      shortDescription: parsed.shortDescription,
      contactName: parsed.contactName,
      email: parsed.email,
      phone: parsed.phone,
      pages: parsed.pagesSelected ? parsed.pagesSelected.split(',') : [],
      features: parsed.featuresSelected ? parsed.featuresSelected.split(',') : [],
      copywriting: parsed.copywriting,
      seo: parsed.seo,
      timeline: parsed.timeline,
      packageInterest: parsed.packageInterest,
      honeypot: parsed['bot-field'] || parsed.honeypot
    };

    // Honeypot check
    if (formData.honeypot) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Invalid submission detected." 
        })
      };
    }

    // Basic validation
    if (!formData.businessName || !formData.email || !formData.contactName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Missing required fields: Business Name, Contact Name, and Email are required." 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Please provide a valid email address." 
        })
      };
    }

    // Prepare email content
    const subject = cleanSubject(formData.website, formData.businessName);
    
    let emailBody = `
<h2>New Client Onboarding Submission</h2>

<h3>Business Information</h3>
<p><strong>Business Name:</strong> ${sanitizeText(formData.businessName)}</p>
<p><strong>Tagline:</strong> ${sanitizeText(formData.tagline || 'Not provided')}</p>
<p><strong>Website:</strong> ${sanitizeText(formData.website || 'Not provided')}</p>
<p><strong>Description:</strong> ${sanitizeText(formData.shortDescription || 'Not provided')}</p>

<h3>Contact Information</h3>
<p><strong>Contact Name:</strong> ${sanitizeText(formData.contactName)}</p>
<p><strong>Email:</strong> ${sanitizeText(formData.email)}</p>
<p><strong>Phone:</strong> ${sanitizeText(formData.phone || 'Not provided')}</p>

<h3>Project Details</h3>
<p><strong>Pages Needed:</strong> ${formData.pages.map(p => sanitizeText(p)).join(', ') || 'None specified'}</p>
<p><strong>Features:</strong> ${formData.features.map(f => sanitizeText(f)).join(', ') || 'None specified'}</p>
<p><strong>Copywriting:</strong> ${sanitizeText(formData.copywriting || 'Not specified')}</p>
<p><strong>SEO Level:</strong> ${sanitizeText(formData.seo || 'Not specified')}</p>
<p><strong>Timeline:</strong> ${sanitizeText(formData.timeline || 'Not specified')}</p>
<p><strong>Package Interest:</strong> ${sanitizeText(formData.packageInterest || 'Not specified')}</p>

<h3>Submitted Files</h3>
`;

    // Process file attachments
    const attachments = [];
    
    if (parsed.files && parsed.files.length > 0) {
      parsed.files.forEach(file => {
        if (file && file.content && file.content.length > 0) {
          
          attachments.push({
            content: Buffer.from(file.content).toString('base64'),
            filename: file.filename,
            type: file.contentType,
            disposition: 'attachment'
          });
          
          emailBody += `<p>• ${file.filename}</p>`;
        }
      });
    }

    if (attachments.length === 0) {
      emailBody += '<p>No files were uploaded.</p>';
    }

    emailBody += `
<hr>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
<p><em>IP Address: ${clientIP}</em></p>
`;

    // Send email via SendGrid
    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: subject,
      html: emailBody,
      attachments: attachments
    };

    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Email service not configured. Please try again later." 
        })
      };
    }

    await sgMail.send(msg);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        ok: true, 
        message: "Thank you! Your submission has been received and we'll be in touch soon." 
      })
    };

  } catch (error) {
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "There was an error processing your submission. Please try again." 
      })
    };
  }
};