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
    
    // Validation
    if (!data.name || !data.email || !data.website) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Name, email, and website are required." })
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

    // Goal and timeline labels
    const goalLabels = {
      'increase-traffic': 'Increase Traffic',
      'improve-conversions': 'Improve Conversions',
      'better-performance': 'Better Performance',
      'modernize-design': 'Modernize Design',
      'add-ecommerce': 'Add E-commerce',
      'mobile-optimization': 'Mobile Optimization'
    };

    const timelineLabels = {
      'asap': 'ASAP',
      'this-month': 'This Month',
      'next-month': 'Next Month',
      'this-quarter': 'This Quarter',
      'exploring': 'Just Exploring'
    };

    const emailBody = `
<h2>New Website Audit Request</h2>

<p><strong>Name:</strong> ${sanitizeText(data.name)}</p>
<p><strong>Email:</strong> ${sanitizeText(data.email)}</p>
<p><strong>Website:</strong> ${sanitizeText(data.website)}</p>

<h3>Project Details:</h3>
<p><strong>Primary Goal:</strong> ${goalLabels[data.goal] || sanitizeText(data.goal)}</p>
<p><strong>Timeline:</strong> ${timelineLabels[data.timeline] || sanitizeText(data.timeline)}</p>

<hr>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
<p><em>IP Address: ${clientIP}</em></p>
`;

    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: `New Audit Request from ${data.name} - ${data.website}`,
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
      body: JSON.stringify({ message: "Thank you! We'll send your free audit report within 24 hours." })
    };

  } catch (error) {
    console.error('Audit form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "There was an error processing your request. Please try again." })
    };
  }
};