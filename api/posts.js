const { createClient } = require('@supabase/supabase-js');

function sendJson(res, statusCode, payload) {
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json(payload);
}

function normalizeLimit(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 6;
  return Math.min(Math.max(parsed, 1), 12);
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    sendJson(res, 500, {
      success: false,
      message: 'Posts API configuration is missing',
    });
    return;
  }

  const limit = normalizeLimit(req.query && req.query.limit);
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase
    .from('posts')
    .select('id,title,slug,content,type,event_date,image_url,facebook_post_id,status,created_at')
    .eq('status', 'published')
    .order('event_date', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    sendJson(res, 500, {
      success: false,
      message: 'Failed to load posts',
      details: error.message,
    });
    return;
  }

  sendJson(res, 200, {
    success: true,
    posts: data || [],
  });
};

