const { createClient } = require('@supabase/supabase-js');

const POST_TYPES = new Set(['news', 'event']);
const POST_STATUSES = new Set(['draft', 'published']);
const FACEBOOK_PAGE_ID = '1697441158067983';
const FACEBOOK_FEED_URL = `https://graph.facebook.com/v25.0/${FACEBOOK_PAGE_ID}/feed`;

function sendJson(res, statusCode, payload) {
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json(payload);
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return '';
  return header.slice('Bearer '.length).trim();
}

function slugify(value) {
  const slug = String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return slug || `post-${Date.now()}`;
}

function excerpt(markdown, maxLength = 220) {
  const text = String(markdown || '')
    .replace(/[#>*_`~[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

async function parseBody(req) {
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  return req.body || {};
}

function validatePayload(body) {
  const type = body.type || 'news';
  const status = body.status || 'draft';

  if (!body.title || typeof body.title !== 'string') return 'Title is required';
  if (!body.content || typeof body.content !== 'string') return 'Content is required';
  if (!body.image_url || typeof body.image_url !== 'string') return 'Cover image URL is required';
  if (!POST_TYPES.has(type)) return 'Type must be news or event';
  if (!POST_STATUSES.has(status)) return 'Status must be draft or published';

  if (type === 'event') {
    const eventDate = new Date(body.event_date || '');
    if (!body.event_date || Number.isNaN(eventDate.getTime())) {
      return 'Event date is required for events';
    }
  }

  return '';
}

function createMetaGraphError(response, data) {
  const metaError = data && data.error ? data.error : {};
  const message = metaError.message || `Meta Graph API returned ${response.status}`;
  const details = {
    status: response.status,
    type: metaError.type || null,
    code: metaError.code || null,
    subcode: metaError.error_subcode || metaError.subcode || null,
    fbtraceId: metaError.fbtrace_id || null,
  };
  const error = new Error(message);
  error.meta = details;
  return error;
}

function logMetaGraphError(error) {
  const meta = error && error.meta ? error.meta : {};
  console.error('Meta Graph API publish failed', {
    message: error.message,
    status: meta.status || null,
    type: meta.type || null,
    code: meta.code || null,
    subcode: meta.subcode || null,
    fbtraceId: meta.fbtraceId || null,
    requiredScopes: ['pages_manage_posts', 'publish_video'],
  });
}

function formatMetaWarning(error) {
  const meta = error && error.meta ? error.meta : {};
  const parts = [error.message];

  if (meta.code) parts.push(`code ${meta.code}`);
  if (meta.subcode) parts.push(`subcode ${meta.subcode}`);
  if (meta.fbtraceId) parts.push(`fbtrace_id ${meta.fbtraceId}`);

  return parts.join(' | ');
}

async function postToFacebook({ accessToken, siteUrl, post }) {
  const articleUrl = `${siteUrl.replace(/\/$/, '')}/news/${post.slug}`;
  const message = `${post.title}\n\n${excerpt(post.content)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(FACEBOOK_FEED_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        message,
        link: articleUrl,
        access_token: accessToken,
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw createMetaGraphError(response, data);
    }

    if (!data.id) {
      throw new Error('Meta Graph API did not return a post id');
    }

    return data.id;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    ADMIN_PUBLISH_TOKEN,
    FACEBOOK_USER_ACCESS_TOKEN,
    SITE_URL = 'https://sweet-fantasy-vlas.vercel.app',
  } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_PUBLISH_TOKEN) {
    sendJson(res, 500, {
      success: false,
      message: 'Publishing API configuration is missing',
    });
    return;
  }

  const token = req.headers['x-admin-token'] || getBearerToken(req);
  if (token !== ADMIN_PUBLISH_TOKEN) {
    sendJson(res, 401, { success: false, message: 'Unauthorized' });
    return;
  }

  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    sendJson(res, 400, { success: false, message: 'Invalid JSON body' });
    return;
  }

  const validationError = validatePayload(body);
  if (validationError) {
    sendJson(res, 400, { success: false, message: validationError });
    return;
  }

  const status = body.status || 'draft';
  const type = body.type || 'news';
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const postPayload = {
    title: body.title.trim(),
    slug: slugify(body.slug || body.title),
    content: body.content.trim(),
    type,
    event_date: type === 'event' ? new Date(body.event_date).toISOString() : null,
    image_url: body.image_url.trim(),
    status,
  };

  const { data: post, error: insertError } = await supabase
    .from('posts')
    .insert(postPayload)
    .select('*')
    .single();

  if (insertError) {
    const isDuplicateSlug = insertError.code === '23505';
    sendJson(res, isDuplicateSlug ? 409 : 500, {
      success: false,
      message: isDuplicateSlug ? 'A post with this slug already exists' : 'Failed to save post',
      details: insertError.message,
    });
    return;
  }

  let warning = null;
  let facebookPostId = null;
  const shouldPostToFacebook = Boolean(body.syncToFacebook) && status === 'published';

  if (shouldPostToFacebook) {
    if (!FACEBOOK_USER_ACCESS_TOKEN) {
      warning = 'Post was saved, but Facebook sync is not configured';
    } else {
      try {
        facebookPostId = await postToFacebook({
          accessToken: FACEBOOK_USER_ACCESS_TOKEN,
          siteUrl: SITE_URL,
          post,
        });

        const { error: updateError } = await supabase
          .from('posts')
          .update({ facebook_post_id: facebookPostId })
          .eq('id', post.id);

        if (updateError) {
          warning = `Facebook post was created, but facebook_post_id was not saved: ${updateError.message}`;
        }
      } catch (error) {
        logMetaGraphError(error);
        warning = `Post was saved, but Facebook sync failed: ${formatMetaWarning(error)}`;
      }
    }
  }

  sendJson(res, 200, {
    success: true,
    post: {
      ...post,
      facebook_post_id: facebookPostId || post.facebook_post_id,
    },
    warning,
  });
};

