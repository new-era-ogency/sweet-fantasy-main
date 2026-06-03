# Sweet Fantasy Frontend

Static Sweet Fantasy landing page with a small serverless booking endpoint.

## Contents

- `index.html` - page markup and Tailwind CDN setup
- `app.js` - Alpine.js state, translations, form logic and gallery behavior
- `images/` - site images
- `api/booking.js` - Vercel-style API route that sends booking emails with SendGrid

## Local Preview

```bash
npm install
npm run start
```

Open `http://localhost:5173`.

The booking form posts to `/api/booking`, so email sending works only in an environment that runs the serverless function, such as Vercel, or with an equivalent local API setup.

## Environment

Set these variables in the hosting provider:

- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_EMAIL`
