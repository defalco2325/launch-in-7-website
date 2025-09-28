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
      body: JSON.stringify({ 
        ok: false, 
        error: 'Method not allowed' 
      })
    };
  }

  try {
    // Test 1: Check if SendGrid module can be imported
    let sgMail;
    try {
      sgMail = require('@sendgrid/mail');
    } catch (importError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "SendGrid import failed: " + importError.message
        })
      };
    }

    // Test 2: Check if API key exists
    const hasApiKey = !!process.env.SENDGRID_API_KEY;
    if (!hasApiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "SendGrid API key not found in environment variables"
        })
      };
    }

    // Test 3: Try to set API key
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    } catch (keyError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: "Failed to set SendGrid API key: " + keyError.message
        })
      };
    }

    // Test 4: Extract basic form data
    let email = 'test@example.com';
    let businessName = 'Test Business';
    
    try {
      const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
      
      // Simple extraction
      const emailMatch = body.match(/name="email"[^]*?\r\n\r\n([^]*?)\r\n--/);
      const businessMatch = body.match(/name="businessName"[^]*?\r\n\r\n([^]*?)\r\n--/);
      
      if (emailMatch && emailMatch[1]) {
        email = emailMatch[1].trim();
      }
      if (businessMatch && businessMatch[1]) {
        businessName = businessMatch[1].trim();
      }
    } catch (parseError) {
      // Continue with test values if parsing fails
    }

    // Test 5: Try to send a simple email
    const msg = {
      to: 'team@launchin7.io',
      from: 'noreply@launchin7.io',
      subject: `Test Submission from ${businessName}`,
      html: `
        <h2>Test Client Submission</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><em>This is a test email from the Netlify function.</em></p>
      `
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        ok: true, 
        message: "Test email sent successfully! Check team@launchin7.io for the email."
      })
    };

  } catch (error) {
    // Detailed error logging
    let errorDetails = {
      name: error.name,
      message: error.message
    };

    // SendGrid specific error details
    if (error.response && error.response.body) {
      errorDetails.sendgrid = error.response.body;
    }

    if (error.code) {
      errorDetails.code = error.code;
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "Error: " + error.message,
        details: errorDetails
      })
    };
  }
};