import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import {
  checkoutMetadata,
  isPaymentMethodRejection,
  PREFERRED_PAYMENT_METHOD_TYPES,
} from "@/lib/checkout";
import { isProductColor, PRODUCT } from "@/lib/product";
import { resolveSiteUrl } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a JSON body with a color." },
      { status: 400 },
    );
  }

  const color =
    typeof body === "object" && body !== null && "color" in body
      ? body.color
      : undefined;

  if (!isProductColor(color)) {
    return NextResponse.json(
      { error: "Choose Sage Green or Soft White." },
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
  const metadata = checkoutMetadata(color);
  const base: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: PRODUCT.priceCents,
          product_data: {
            name: PRODUCT.name,
            description: `${color}. ${PRODUCT.shippingNote}`,
            metadata: {
              sku: PRODUCT.sku,
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
