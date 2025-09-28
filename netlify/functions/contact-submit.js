const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('WARNING: SENDGRID_API_KEY not found in environment variables');
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
  return text.trim().replace(/[<>]/g, '');
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
        body: JSON.stringify({ message: "Too many submissions. Please wait a moment." })
      };
    }

    const data = JSON.parse(event.body);
    
    // Honeypot check
    if (data.honeypot) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Invalid submission detected." })
      };
    }

    // Validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Name, email, and message are required." })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Please provide a valid email address." })
      };
    }

    const emailBody = `
<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> ${sanitizeText(data.name)}</p>
<p><strong>Email:</strong> ${sanitizeText(data.email)}</p>
<p><strong>Phone:</strong> ${sanitizeText(data.phone || 'Not provided')}</p>
<p><strong>Website:</strong> ${sanitizeText(data.website || 'Not provided')}</p>

<h3>Message:</h3>
<p>${sanitizeText(data.message)}</p>

<hr>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
<p><em>IP Address: ${clientIP}</em></p>
`;

    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: `New Contact Form Submission from ${data.name}`,
      html: emailBody
    };

    if (!process.env.SENDGRID_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: "Email service not configured." })
      };
    }

    await sgMail.send(msg);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Thank you for your message! We'll get back to you soon." })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "There was an error sending your message. Please try again." })
    };
  }
};