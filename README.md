# PawQuiet

Open-source single-SKU storefront for the **Quiet LED Pet Nail Grinder** ($34.99, compare-at $49.99). One product, two colors (Sage Green and Soft White), US shipping, and Stripe Checkout. No accounts, no CMS, and no inventory admin.

The shop is meant to stay free to run: [Vercel Hobby](https://vercel.com/pricing) for hosting and [Stripe test mode](https://dashboard.stripe.com/test/apikeys) until you are ready to charge real cards.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/product` | Color picker and Buy, which opens Stripe Checkout |
| `/shipping` | US dropship shipping |
| `/refunds` | 30-day unused-item window |
| `/privacy` | What we collect |
| `/contact` | Name, email, and message |
| `/success` | Return URL after payment (`?session_id=`) |
| `/canceled` | Return URL if Checkout is canceled |

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Production build:

```bash
npm run build
npm start
```

`npm start` listens on `0.0.0.0` and the `PORT` environment variable (3000 if unset).

## Stripe test keys

1. Create a free Stripe account and stay in **Test mode**.
2. Open [API keys](https://dashboard.stripe.com/test/apikeys) and copy the secret key (`sk_test_...`).
3. Put it in `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:43123
```

`STRIPE_PUBLISHABLE_KEY` is optional. Hosted Checkout does not use it.

4. In the Stripe Dashboard, turn on the payment methods you want under **Settings → Payment methods**: Card, Link, PayPal, Cash App Pay, and Amazon Pay.
5. Restart `npm run dev`, open `/product`, choose Sage Green or Soft White, and press **Buy now — $34.99**.
6. Pay with the test card `4242 4242 4242 4242`, any future expiry, any CVC, and any US ZIP. Stripe sends you to `/success?session_id=cs_test_...`.

`POST /api/checkout` creates a Checkout Session in `payment` mode for one line at 3499 cents (USD). Metadata is `sku` (`PNG-LED-01`), `product`, `color`, and `shipping_note`. The session first asks for `payment_method_types` of `card`, `link`, `paypal`, `cashapp`, and `amazon_pay`. If that Stripe API version rejects the field, it retries with `allowed_payment_method_types` (the current filter for those same methods). If a method is not enabled on the account, it opens Checkout with the methods your Dashboard already allows. Apple Pay and Google Pay are wallets on the card method; they show when the browser supports them. The page lists them as chips only.

Without `STRIPE_SECRET_KEY`, Buy stays on the product page and explains that checkout is not configured.

`GET /api/checkout/session?session_id=cs_test_...` reads payment status for the thank-you page. It does not expose the full Stripe object.

Checkout collects a US shipping address. There is no extra shipping charge in the session.

## Contact form

`POST /api/contact` checks name, email, and message, then returns success. It does **not** send email or store the note. Vercel Hobby has an ephemeral filesystem, and this app has no database. The on-page reply time matches the shop copy; connect your own inbox before you rely on messages.

## Deploy on Vercel Hobby (free)

1. Push this repo to GitHub (private is fine).
2. In Vercel, choose **Add New → Project** and import the repo. Framework preset is Next.js. Do not change the build command (`npm run build`).
3. Add environment variables for **Production** (and Preview if you use it):

| Name | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | `sk_test_...` from the Stripe test dashboard |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (no trailing slash) |
| `STRIPE_PUBLISHABLE_KEY` | optional `pk_test_...` |

4. Deploy. Hobby is enough: one Next.js app, no extra services.
5. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real `https://….vercel.app` URL if you did not know it yet, then redeploy so success and cancel URLs point at the live site.
6. Open `/product` on the deployment and complete a test payment.

When you later switch Stripe to live mode, replace the secret with `sk_live_...`, keep the same variable names, and redeploy. Do that only after refunds, shipping, and the contact inbox are ready for real orders.

## Layout

```
app/                  pages and route handlers
  api/checkout/       POST session, GET payment status
  api/contact/        form validation
components/           header, product studio, policies
lib/product.ts        price, colors, FAQ, and on-page copy
lib/stripe.ts         Stripe client
public imagery        none — the grinder is an inline SVG placeholder
```

Product art is an original illustration, not a photograph of a retail grinder.
