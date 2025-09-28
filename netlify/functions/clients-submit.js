exports.handler = async (event, context) => {
  // Simple CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Handle POST
  if (event.httpMethod === 'POST') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: "Function is working! Ready to process forms.",
        timestamp: new Date().toISOString()
      })
    };
  }

  // Handle other methods
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      ok: false,
      message: "Method not allowed"
    })
  };
};