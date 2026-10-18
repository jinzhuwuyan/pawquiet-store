import { NextResponse, type NextRequest } from "next/server";
import type { CheckoutSessionSummary } from "@/lib/checkout";
import { getStripe, isCheckoutSessionId } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") ?? "";
  if (!isCheckoutSessionId(sessionId)) {
    return NextResponse.json(
      { error: "Missing a valid session_id." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    const summary: CheckoutSessionSummary = {
      configured: false,
      paid: false,
      payment_status: null,
      customer_email: null,
      amount_total: null,
      currency: null,
      color: null,
      sku: null,
      product: null,
      message:
        "Stripe is not configured, so payment status cannot be verified.",
    };
    return NextResponse.json(summary);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const summary: CheckoutSessionSummary = {
      configured: true,
      paid: session.payment_status === "paid",
      payment_status: session.payment_status,
      customer_email:
        session.customer_details?.email ?? session.customer_email ?? null,
      amount_total: session.amount_total,
      currency: session.currency,
      color: session.metadata?.color ?? null,
      sku: session.metadata?.sku ?? null,
      product: session.metadata?.product ?? null,
    };
    return NextResponse.json(summary, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load that checkout session." },
      { status: 404 },
    );
  }
}
