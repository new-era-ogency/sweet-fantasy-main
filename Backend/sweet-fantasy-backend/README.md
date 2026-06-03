# Sweet Fantasy Backend

NestJS API for Sweet Fantasy cake booking requests. The API accepts booking form data and sends email notifications through SendGrid.

## Requirements

- Node.js 20+
- npm
- SendGrid API key

## Setup

```bash
npm install
cp .env.example .env
npm run start:dev
```

Required environment variables:

- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_EMAIL`
- `PORT` optional, defaults to `3000`

## Scripts

```bash
npm run start:dev
npm run build
npm run start:prod
npm run lint
```

## API

`POST /booking`

Expected JSON body:

```json
{
  "customerName": "Customer Name",
  "customerEmail": "customer@example.com",
  "deliveryDate": "2026-06-10T12:00:00.000Z",
  "weightInKg": 2.5,
  "filling": "Chocolate mousse",
  "designComment": "Optional order details"
}
```

`config/` and `routes/` contain a small Laravel mail compatibility layer for Laravel Cloud style deployments. If you deploy only the NestJS API, those files can be ignored.
