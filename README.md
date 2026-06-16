# Sweet Fantasy Fullstack

The Vercel production deployment uses the root-level static site and API:

- `index.html`, `app.js`, `images/` - static website
- `api/booking.js` - Vercel Serverless Function for cake order emails

The nested folders are kept as source/reference copies:

- `frontend/sweet-fantasy-vlas-main`
- `Backend/sweet-fantasy-backend`

## Frontend

```bash
cd frontend/sweet-fantasy-vlas-main
npm install
npm run start
```

## Backend

```bash
cd Backend/sweet-fantasy-backend
npm install
cp .env.example .env
npm run start:dev
```

## Vercel Environment Variables

The root `/api/booking` endpoint needs:

- `SENDGRID_API_KEY`
- `FROM_EMAIL`
- `TO_EMAIL`

Do not commit real `.env` files. Use `.env.example` as the template.
