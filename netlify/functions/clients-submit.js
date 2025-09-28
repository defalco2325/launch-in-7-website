// Minimal Netlify function for debugging
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
    // Test basic functionality first
    console.log('Function called successfully');
    console.log('Event headers:', JSON.stringify(event.headers, null, 2));
    console.log('Event body length:', event.body ? event.body.length : 0);
    
    // Check environment variables
    const hasApiKey = !!process.env.SENDGRID_API_KEY;
    console.log('SendGrid API key present:', hasApiKey);
    
    // Basic form data extraction (without complex parsing)
    let basicData = {};
    
    try {
      if (event.body) {
        // Try to extract some basic fields for testing
        const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
        console.log('Body preview:', body.substring(0, 200));
        
        // Very simple field extraction
        if (body.includes('businessName')) {
          basicData.hasBusinessName = true;
        }
        if (body.includes('email')) {
          basicData.hasEmail = true;
        }
      }
    } catch (parseError) {
      console.error('Parsing error:', parseError.message);
      basicData.parseError = parseError.message;
    }
    
    // Test SendGrid import (but don't send email yet)
    let sendGridTest = 'not tested';
    try {
      const sgMail = require('@sendgrid/mail');
      sendGridTest = 'import successful';
      
      if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sendGridTest = 'configured successfully';
      } else {
        sendGridTest = 'no API key';
      }
    } catch (sgError) {
      console.error('SendGrid error:', sgError.message);
      sendGridTest = 'import failed: ' + sgError.message;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        ok: true, 
        message: "Debug mode - function is working",
        debug: {
          hasApiKey,
          sendGridTest,
          basicData,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        ok: false, 
        message: "Debug error: " + error.message,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack.substring(0, 500)
        }
      })
    };
  }
};