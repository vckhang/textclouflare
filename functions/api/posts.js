export async function onRequest(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    return Response.json({ success: true, data: results });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}