# PawQuiet

Storefront for four PawQuiet LED pet nail-care styles. Each style is **$34.99**. US shipping and Stripe Checkout. No accounts, no CMS, and no inventory admin.

| Style | Path | Public SKU | Colors | Compare at |
| --- | --- | --- | --- | --- |
| PawQuiet Classic 5-Speed | `/product/classic` | `PNG-LED-CLASSIC` | Sage Green, Soft White | $49.99 |
| PawQuiet Duo Clip+Grind | `/product/duo` | `PNG-LED-DUO` | Sage Green, Soft White, Soft Pink | $49.99 |
| PawQuiet Lite Green | `/product/lite` | `PNG-LED-LITE` | Sage Green | $44.99 |
| PawQuiet Factory 5-Speed | `/product/factory` | `PNG-LED-FACTORY` | Sage Green, Soft White | $49.99 |

Classic, Duo, and Lite ship to the US in about 7–15 business days. Factory 5-Speed ships in about 10–20 business days. Lite Green is the entry LED grinder and does not list a speed count.

The shop is meant to stay free to run: [Render](https://render.com) or [Vercel Hobby](https://vercel.com/pricing) for hosting, and [Stripe test mode](https://dashboard.stripe.com/test/apikeys) until you are ready to charge real cards.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home, with all four styles |
| `/product` | Shop grid |
| `/product/classic` | Classic 5-Speed |
| `/product/duo` | Duo Clip+Grind |
| `/product/lite` | Lite Green |
| `/product/factory` | Factory 5-Speed |
| `/shipping` | US shipping windows |
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
5. Restart `npm run dev`, open a style such as `/product/classic`, choose a color, and press **Buy now — $34.99**.
6. Pay with the test card `4242 4242 4242 4242`, any future expiry, any CVC, and any US ZIP. Stripe sends you to `/success?session_id=cs_test_...`.

`POST /api/checkout` expects JSON `{ "slug": "classic", "color": "Sage Green" }`. It creates a Checkout Session in `payment` mode for one line at 3499 cents (USD). The line item name is the style plus the color, for example `PawQuiet Classic 5-Speed — Sage Green`. Metadata is `sku`, `product`, `slug`, `color`, `line_item_name`, and `shipping_note`. The session first asks for `payment_method_types` of `card`, `link`, `paypal`, `cashapp`, and `amazon_pay`. If that Stripe API version rejects the field, it retries with `allowed_payment_method_types`. If a method is not enabled on the account, it opens Checkout with the methods your Dashboard already allows. Apple Pay and Google Pay are wallets on the card method; they show when the browser supports them. The page lists them as chips only.

Without `STRIPE_SECRET_KEY`, Buy stays on the product page and explains that checkout is not configured.

`GET /api/checkout/session?session_id=cs_test_...` reads payment status for the thank-you page. It does not expose the full Stripe object.

Checkout collects a US shipping address. There is no extra shipping charge in the session. This app does not create supplier orders.

## Contact form

`POST /api/contact` checks name, email, and message, then returns success. It does **not** send email or store the note. This app has no database. The on-page reply time matches the shop copy; connect your own inbox before you rely on messages.

## Deploy

The live shop is a Render web service. Pushing the default branch should redeploy if auto-deploy is on. If the service does not rebuild, trigger a deploy for `pawquiet-store` from the Render dashboard.

Vercel Hobby also works:

1. Push this repo to GitHub (private is fine).
2. In Vercel, choose **Add New → Project** and import the repo. Framework preset is Next.js. Do not change the build command (`npm run build`).
3. Add environment variables for **Production** (and Preview if you use it):

| Name | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | `sk_test_...` from the Stripe test dashboard |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (no trailing slash) |
| `STRIPE_PUBLISHABLE_KEY` | optional `pk_test_...` |

4. Deploy. One Next.js app, no extra services.
5. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real URL if you did not know it yet, then redeploy so success and cancel URLs point at the live site.
6. Open `/product/classic` on the deployment and complete a test payment.

When you later switch Stripe to live mode, replace the secret with `sk_live_...`, keep the same variable names, and redeploy. Do that only after refunds, shipping, and the contact inbox are ready for real orders.

## Layout

```
app/                  pages and route handlers
  product/[slug]/     one page per style
  api/checkout/       POST session, GET payment status
  api/contact/        form validation
components/           header, style grid, product studio, policies
lib/catalog.ts        four styles, copy, and public image paths
lib/stripe.ts         Stripe client
public/products/      product photos, one folder per slug
docs/internal-source-map.md
                      operator notes — not used by the UI
```
