export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Only POST requests allowed', { status: 405 });
    }

    try {
      // Use your actual ngrok URL here
      const modifiedRequest = new Request('https://70ad-2001-861-4080-fa60-6951-ab47-171e-59af.ngrok-free.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: request.body,
      });

      // Forward the request to your L3 node
      const response = await fetch(modifiedRequest);
      
      // Clone the response with CORS headers
      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal error',
        },
        id: null
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
}; 