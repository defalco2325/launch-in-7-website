const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Rate limiting store
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const key = ip;
  const limit = rateLimitStore.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + 60000 });
    return true;
  }
  
  if (limit.count >= 3) {
    return false;
  }
  
  limit.count++;
  return true;
}

function sanitizeText(text) {
  if (!text) return '';
  return text.toString().trim().replace(/[<>]/g, '');
}

function cleanSubject(website, businessName) {
  let subject = website || businessName || 'New Client';
  subject = subject.replace(/^https?:\/\//i, '');
  subject = subject.replace(/\/$/, '');
  return `New Onboarding — ${subject}`;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
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
      body: JSON.stringify({ 
        ok: false, 
        error: 'Method not allowed' 
      })
    };
  }

  try {
    // Basic setup
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    
    // Rate limiting
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

    // For now, let's simplify and just handle the form data without files
    // This will help us identify if the issue is with file parsing
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    
    let formData = {};
    
    if (contentType.includes('multipart/form-data')) {
      // Simplified approach - extract text fields only for now
      const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
      
      // Extract basic form fields using regex (simple approach)
      const extractField = (fieldName) => {
        const regex = new RegExp(`name="${fieldName}"[\\s\\S]*?\\r\\n\\r\\n([\\s\\S]*?)\\r\\n--`, 'i');
        const match = body.match(regex);
        return match ? match[1].trim() : '';
      };
      
      formData = {
        businessName: extractField('businessName'),
        tagline: extractField('tagline'),
        website: extractField('website'),
        shortDescription: extractField('shortDescription'),
        contactName: extractField('contactName'),
        email: extractField('email'),
        phone: extractField('phone'),
        pagesSelected: extractField('pagesSelected'),
        featuresSelected: extractField('featuresSelected'),
        copywriting: extractField('copywriting'),
        seo: extractField('seo'),
        timeline: extractField('timeline'),
        packageInterest: extractField('packageInterest'),
        honeypot: extractField('bot-field') || extractField('honeypot')
      };
    } else {
      // URL-encoded fallback
      const params = new URLSearchParams(event.body);
      for (const [key, value] of params) {
        formData[key] = value;
      }
    }

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

    // Email validation
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

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Email service not configured. Please contact support." 
        })
      };
    }

    // Prepare email content
    const subject = cleanSubject(formData.website, formData.businessName);
    
    const pages = formData.pagesSelected ? formData.pagesSelected.split(',').map(p => p.trim()) : [];
    const features = formData.featuresSelected ? formData.featuresSelected.split(',').map(f => f.trim()) : [];
    
    const emailBody = `
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
<p><strong>Pages Needed:</strong> ${pages.map(p => sanitizeText(p)).join(', ') || 'None specified'}</p>
<p><strong>Features:</strong> ${features.map(f => sanitizeText(f)).join(', ') || 'None specified'}</p>
<p><strong>Copywriting:</strong> ${sanitizeText(formData.copywriting || 'Not specified')}</p>
<p><strong>SEO Level:</strong> ${sanitizeText(formData.seo || 'Not specified')}</p>
<p><strong>Timeline:</strong> ${sanitizeText(formData.timeline || 'Not specified')}</p>
<p><strong>Package Interest:</strong> ${sanitizeText(formData.packageInterest || 'Not specified')}</p>

<h3>Files</h3>
<p><em>File attachments will be supported in the next version.</em></p>

<hr>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
<p><em>IP Address: ${clientIP}</em></p>
`;

    // Send email via SendGrid
    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: subject,
      html: emailBody
    };

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
    // More detailed error logging for debugging
    console.error('Function error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Check if it's a SendGrid specific error
    if (error.code && error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "There was an error processing your submission. Please try again or contact support if the problem persists." 
      })
    };
  }
};