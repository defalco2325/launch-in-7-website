const sgMail = require('@sendgrid/mail');

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
      body: JSON.stringify({ ok: false, error: 'Method not allowed' })
    };
  }

  try {
    // Configure SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "SendGrid API key not configured in Netlify environment variables" 
        })
      };
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Extract form data
    const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
    
    // Simple field extraction
    const extractField = (name) => {
      const regex = new RegExp(`name="${name}"[\\s\\S]*?\\r\\n\\r\\n([\\s\\S]*?)\\r\\n--`, 'i');
      const match = body.match(regex);
      return match ? match[1].trim() : '';
    };

    const formData = {
      businessName: extractField('businessName') || 'Unknown Business',
      email: extractField('email'),
      contactName: extractField('contactName'),
      phone: extractField('phone'),
      website: extractField('website'),
      shortDescription: extractField('shortDescription'),
      pagesSelected: extractField('pagesSelected'),
      featuresSelected: extractField('featuresSelected'),
      copywriting: extractField('copywriting'),
      seo: extractField('seo'),
      timeline: extractField('timeline'),
      packageInterest: extractField('packageInterest')
    };

    // Basic validation
    if (!formData.email || !formData.contactName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Email and contact name are required" 
        })
      };
    }

    // Create email
    const emailBody = `
<h2>New Client Onboarding Submission</h2>

<h3>Business Information</h3>
<p><strong>Business Name:</strong> ${formData.businessName}</p>
<p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
<p><strong>Description:</strong> ${formData.shortDescription || 'Not provided'}</p>

<h3>Contact Information</h3>
<p><strong>Contact Name:</strong> ${formData.contactName}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>

<h3>Project Details</h3>
<p><strong>Pages Needed:</strong> ${formData.pagesSelected || 'Not specified'}</p>
<p><strong>Features:</strong> ${formData.featuresSelected || 'Not specified'}</p>
<p><strong>Copywriting:</strong> ${formData.copywriting || 'Not specified'}</p>
<p><strong>SEO Level:</strong> ${formData.seo || 'Not specified'}</p>
<p><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</p>
<p><strong>Package Interest:</strong> ${formData.packageInterest || 'Not specified'}</p>

<hr>
<p><em>Submitted: ${new Date().toLocaleString()}</em></p>
`;

    // Send email
    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: `New Onboarding — ${formData.businessName}`,
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
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "Error processing submission. Please try again." 
      })
    };
  }
};