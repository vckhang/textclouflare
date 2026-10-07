export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Endpoint /api/posts
    if (url.pathname === '/api/posts') {
      try {
        const { results } = await env.DB.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
        return new Response(JSON.stringify({ success: true, data: results }), {
          status: 200,
          headers: corsHeaders,
        });
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // Phục vụ giao diện ReactJS
    return env.ASSETS.fetch(request);
  },
};