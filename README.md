# My Family Companion

The MFC website combines family-health storytelling, book checkout, and the Health Advocate experience. The frontend is React, TypeScript, Vite, and React Router. Payment initialization and verification run in server-side handlers under `api/payments`.

## Local setup

```sh
npm install
cp -n .env.example .env.local
npm run dev -- --port 5174
```

Set `APP_BASE_URL` to the exact local origin Vite prints (for example, `http://127.0.0.1:5174`). Use Paystack **test** keys for local checkout. Put secret values only in `.env.local` or the hosting provider’s server-side environment settings; never use a `VITE_` prefix for a secret.

## Environment variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Browser | MFC account API base; auth requests use `/auth/register` and `/auth/login`. |
| `VITE_PAYMENT_API_BASE_URL` | Browser | Optional payment API base; when blank, checkout uses this app's same-origin `/api/payments/initialize` and `/api/payments/verify` routes. |
| `VITE_PAYSTACK_PUBLIC_KEY` | Browser | Public key for existing inline Paystack overlays. |
| `VITE_AMAZON_LINK` | Browser | Optional external book purchase link. |
| `PAYSTACK_SECRET_KEY` | Server only | Initializes and verifies Paystack checkout. |
| `APP_BASE_URL` | Server only | Origin Paystack returns to after checkout. |
| `MFC_API_BASE_URL` | Server only | MFC order API base used by book fulfillment. |
| `MFC_FULFILLMENT_TOKEN` | Server only | Bearer credential for server-to-server order fulfillment. |
| `MFC_PROMOTER_REGISTRATION_URL` | Server only | Backend endpoint to activate a Health Advocate after payment. |

Checkout sends initialization and verification requests to `VITE_PAYMENT_API_BASE_URL` when configured, or to this app's same-origin payment routes by default. The local Vite middleware exposes `/api/payments/initialize` and `/api/payments/verify`. Production deployment must run payment handlers server-side; the Paystack secret must never be sent to the browser.

## Main routes

| Route | Purpose |
| --- | --- |
| `/landing` | MFC story, book purchase, and advocate entry points. |
| `/checkout?product=book` | Direct book checkout (₦30,000). Add a valid `ref` to show the advocate price (₦25,000). |
| `/checkout?product=promoter` | Health Advocate registration checkout (₦5,000). |
| `/advocate/join` | Account registration after verified advocate payment. |
| `/advocate/login` | Existing MFC account sign-in. |
| `/AffiliateExperience` | Advocate hub interface. Its sales and leaderboard content is currently demo data. |

## Current integration boundaries

- Paystack payment initialization and verification are server-side and use minor units (kobo) for NGN amounts.
- Verified advocate payments currently continue to the MFC account registration form. The frontend does not create an account automatically or send a password setup email; that requires a supported backend registration/activation and secure email setup flow.
- The backend must provide `MFC_PROMOTER_REGISTRATION_URL` before paid advocates can be activated automatically.
- Book payment is blocked until fulfillment configuration is present. A successful payment must not be treated as an order delivered until the fulfillment API confirms it.
- Advocate dashboard metrics, leaderboard entries, rank, and payout figures are illustrative until connected to an authenticated platform data API.

## Quality checks

```sh
npm run check
```

`npm run check` runs ESLint and the production build. The build runs TypeScript project checks before Vite bundles the application. The same command runs for pull requests and pushes in GitHub Actions.
