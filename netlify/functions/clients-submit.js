// Netlify Function - completely standalone
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Get basic info from the request
    const timestamp = new Date().toISOString();
    const userAgent = event.headers['user-agent'] || 'unknown';
    
    // For now, just return success to test if function works
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: 'Function is working! Form submission received.',
        debug: {
          timestamp,
          userAgent,
          method: event.httpMethod,
          hasBody: !!event.body
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        message: 'Function error: ' + error.message
      })
    };
  }
};