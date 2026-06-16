# News & Events Publishing Setup

This repo currently uses Vercel Serverless Functions, not a Next.js `app/api` route. The publishing endpoint is implemented at:

```text
api/publish.js
```

## 1. Supabase Database

Run the migration in Supabase SQL Editor or through the Supabase CLI:

```text
supabase/migrations/20260616120500_create_posts.sql
```

It creates:

- `post_type` enum: `news`, `event`
- `post_status` enum: `draft`, `published`
- `posts` table with slug uniqueness, event date validation, timestamps, and `facebook_post_id`
- public read policy for `published` posts

## 2. Vercel Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PUBLISH_TOKEN=
FACEBOOK_PAGE_ID=1697441158067983
FACEBOOK_USER_ACCESS_TOKEN=
SITE_URL=https://sweet-fantasy-vlas.vercel.app
```

Rename the old `FACEBOOK_PAGE_ACCESS_TOKEN` variable to `FACEBOOK_USER_ACCESS_TOKEN`.
Use the User Access Token from the direct Page admin account for `FACEBOOK_USER_ACCESS_TOKEN`.

For local development, mirror the same values in `.env.local`:

```env
FACEBOOK_PAGE_ID=1697441158067983
FACEBOOK_USER_ACCESS_TOKEN=<paste-your-user-access-token-here>
```

Keep `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PUBLISH_TOKEN`, and `FACEBOOK_USER_ACCESS_TOKEN` server-side only. Do not commit the real token value to GitHub.

## 3. Publish API

Endpoint:

```http
POST /api/publish
Authorization: Bearer <ADMIN_PUBLISH_TOKEN>
Content-Type: application/json
```

Body:

```json
{
  "title": "Summer cake tasting",
  "content": "Join us for fresh cakes and coffee in Sveti Vlas.",
  "type": "event",
  "event_date": "2026-07-10T17:00:00.000Z",
  "image_url": "https://sweet-fantasy-vlas.vercel.app/images/photo_phistashko-cake.jpg",
  "status": "published",
  "syncToFacebook": true
}
```

The API saves to Supabase first. If Facebook sync fails, the post remains saved and the response includes a `warning`.

## 4. Meta Graph API

The function posts to:

```text
https://graph.facebook.com/v25.0/1697441158067983/feed
```

It sends:

- `message`: title plus content excerpt
- `link`: `${SITE_URL}/news/${slug}`
- `access_token`: `FACEBOOK_USER_ACCESS_TOKEN`

The returned Meta post `id` is saved to `posts.facebook_post_id`.

If Meta rejects the token, the API logs the exact Graph API `code`, `subcode`, and `fbtrace_id` in the server logs. Permission-related failures usually mean the User Access Token is missing a publishing scope such as `pages_manage_posts` or, for video publishing, `publish_video`.

