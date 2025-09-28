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
    // Step 1: Check environment variables
    const envCheck = {
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      keyPrefix: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 8) + '...' : 'none',
      nodeEnv: process.env.NODE_ENV || 'undefined'
    };

    // Step 2: Test SendGrid import
    let sgMailTest = 'not tested';
    try {
      const sgMail = require('@sendgrid/mail');
      sgMailTest = 'import successful';
      
      if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMailTest = 'configured successfully';
      }
    } catch (sgError) {
      sgMailTest = 'failed: ' + sgError.message;
    }

    // Step 3: Extract basic form data
    let formExtraction = 'not tested';
    let extractedEmail = 'none';
    try {
      const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
      
      const emailMatch = body.match(/name="email"[^]*?\r\n\r\n([^]*?)\r\n--/);
      if (emailMatch && emailMatch[1]) {
        extractedEmail = emailMatch[1].trim();
        formExtraction = 'successful';
      } else {
        formExtraction = 'no email field found';
      }
    } catch (extractError) {
      formExtraction = 'failed: ' + extractError.message;
    }

    // For now, return diagnostic info instead of sending email
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        ok: true, 
        message: "Diagnostic mode - function is working",
        diagnostics: {
          environment: envCheck,
          sendgrid: sgMailTest,
          formParsing: formExtraction,
          extractedEmail: extractedEmail,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "Diagnostic error: " + error.message,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack ? error.stack.substring(0, 300) : 'no stack'
        }
      })
    };
  }
};