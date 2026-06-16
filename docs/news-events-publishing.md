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
FACEBOOK_PAGE_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=
SITE_URL=https://sweet-fantasy-vlas.vercel.app
```

Keep `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PUBLISH_TOKEN`, and `FACEBOOK_PAGE_ACCESS_TOKEN` server-side only.

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
https://graph.facebook.com/v20.0/{FACEBOOK_PAGE_ID}/feed
```

It sends:

- `message`: title plus content excerpt
- `link`: `${SITE_URL}/news/${slug}`
- `access_token`: `FACEBOOK_PAGE_ACCESS_TOKEN`

The returned Meta post `id` is saved to `posts.facebook_post_id`.

