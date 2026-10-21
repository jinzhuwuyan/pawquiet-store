import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import {
  checkoutMetadata,
  isPaymentMethodRejection,
  PREFERRED_PAYMENT_METHOD_TYPES,
} from "@/lib/checkout";
import {
  checkoutLineItemName,
  findStyle,
  isStyleColor,
  isStyleSlug,
} from "@/lib/catalog";
import { resolveSiteUrl } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a JSON body with a style and a color." },
      { status: 400 },
    );
  }

  const slug = readField(body, "slug");
  const color = readField(body, "color");

  if (!isStyleSlug(slug)) {
    return NextResponse.json(
      { error: "Choose a PawQuiet style." },
      { status: 400 },
    );
  }

  const style = findStyle(slug);
  if (!style || !isStyleColor(style, color)) {
    return NextResponse.json(
      { error: "Choose a color for this style." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured yet. Add STRIPE_SECRET_KEY to enable Stripe Checkout.",
      },
      { status: 503 },
    );
  }

  const siteUrl = resolveSiteUrl(request);
  const metadata = checkoutMetadata(style, color);
  const base: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: style.priceCents,
          product_data: {
            name: checkoutLineItemName(style, color),
            description: style.shippingNote,
            metadata: {
              sku: style.sku,
              slug: style.slug,
              color,
            },
          },
        },
      },
    ],
    metadata,
    payment_intent_data: { metadata },
    shipping_address_collection: { allowed_countries: ["US"] },
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/canceled`,
  };

  try {
    const session = await createCheckoutSession(stripe, base);
    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Stripe could not open checkout.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

function readField(body: unknown, key: string): unknown {
  if (typeof body !== "object" || body === null || !(key in body)) {
    return undefined;
  }
  const record = body as Record<string, unknown>;
  return record[key];
}

async function createCheckoutSession(
  stripe: Stripe,
  base: Stripe.Checkout.SessionCreateParams,
) {
  const preferred = [...PREFERRED_PAYMENT_METHOD_TYPES];
  try {
    return await stripe.checkout.sessions.create({
      ...base,
      payment_method_types: preferred,
    } as Stripe.Checkout.SessionCreateParams);
  } catch (error) {
    if (!isPaymentMethodRejection(error)) throw error;
  }

  try {
    return await stripe.checkout.sessions.create({
      ...base,
      allowed_payment_method_types: preferred,
    });
  } catch (error) {
    if (!isPaymentMethodRejection(error)) throw error;
    return stripe.checkout.sessions.create(base);
  }
}
