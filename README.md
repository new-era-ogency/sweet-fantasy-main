# Sweet Fantasy Fullstack

Project split into two parts:

- `frontend/sweet-fantasy-vlas-main` - static landing page with a Vercel-style booking API endpoint
- `Backend/sweet-fantasy-backend` - NestJS booking API for email notifications

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

## Environment Variables

Both email endpoints need:

- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_EMAIL`

Do not commit real `.env` files. Use `.env.example` as the template.
