// Netlify Function for client onboarding form submission
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('WARNING: SENDGRID_API_KEY not found in environment variables');
}

// Rate limiting store (simple in-memory)
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

function cleanSubject(website, businessName) {
  let subject = website || businessName;
  subject = subject.replace(/^https?:\/\//i, '');
  subject = subject.replace(/\/$/, '');
  return `New Onboarding — ${subject}`;
}

function sanitizeText(text) {
  return text.toString().trim().replace(/[<>]/g, '');
}

// Parse multipart form data from Netlify
function parseMultipart(body, boundary) {
  const parts = body.split(`--${boundary}`);
  const fields = {};
  const files = [];

  parts.forEach(part => {
    if (!part.includes('Content-Disposition')) return;

    const lines = part.split('\r\n');
    const disposition = lines.find(line => line.includes('Content-Disposition'));
    if (!disposition) return;

    const nameMatch = disposition.match(/name="([^"]+)"/);
    if (!nameMatch) return;

    const fieldName = nameMatch[1];
    const contentStart = lines.findIndex(line => line === '') + 1;
    const content = lines.slice(contentStart, -1).join('\r\n');

    if (disposition.includes('filename=')) {
      const filenameMatch = disposition.match(/filename="([^"]+)"/);
      const contentTypeMatch = lines.find(line => line.includes('Content-Type:'));
      
      if (filenameMatch && content.length > 0) {
        files.push({
          filename: filenameMatch[1],
          content: content,
          contentType: contentTypeMatch ? contentTypeMatch.split(':')[1].trim() : 'application/octet-stream'
        });
      }
    } else {
      fields[fieldName] = content;
    }
  });

  return { fields, files };
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    
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

    // Parse the request body
    let fields = {};
    let files = [];
    
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    
    if (contentType.includes('multipart/form-data')) {
      const boundary = contentType.split('boundary=')[1];
      if (boundary) {
        const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
        const parsed = parseMultipart(body, boundary);
        fields = parsed.fields;
        files = parsed.files;
      }
    } else {
      // Fallback to URL-encoded data
      const params = new URLSearchParams(event.body);
      for (const [key, value] of params) {
        fields[key] = value;
      }
    }

    // Extract form data
    const formData = {
      businessName: fields.businessName || '',
      tagline: fields.tagline || '',
      website: fields.website || '',
      shortDescription: fields.shortDescription || '',
      contactName: fields.contactName || '',
      email: fields.email || '',
      phone: fields.phone || '',
      pages: fields.pagesSelected ? fields.pagesSelected.split(',') : [],
      features: fields.featuresSelected ? fields.featuresSelected.split(',') : [],
      copywriting: fields.copywriting || '',
      seo: fields.seo || '',
      timeline: fields.timeline || '',
      packageInterest: fields.packageInterest || '',
      honeypot: fields['bot-field'] || fields.honeypot || ''
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

    // Validation
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

    // Prepare email
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

    // Process attachments
    const attachments = [];
    files.forEach(file => {
      if (file && file.content && file.filename) {
        try {
          attachments.push({
            content: Buffer.from(file.content, 'binary').toString('base64'),
            filename: file.filename,
            type: file.contentType,
            disposition: 'attachment'
          });
          emailBody += `<p>• ${file.filename}</p>`;
        } catch (error) {
          emailBody += `<p>• ${file.filename} (processing error)</p>`;
        }
      }
    });

    if (attachments.length === 0) {
      emailBody += '<p>No files were uploaded.</p>';
    }

    emailBody += `
<hr>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
<p><em>IP Address: ${clientIP}</em></p>
`;

    if (!process.env.SENDGRID_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Email service not configured. Please try again later." 
        })
      };
    }

    // Send email
    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: subject,
      html: emailBody,
      attachments: attachments
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
    console.error('Function error:', error);
    
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