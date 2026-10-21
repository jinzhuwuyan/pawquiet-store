import type Stripe from "stripe";
import {
  checkoutLineItemName,
  type CatalogStyle,
} from "@/lib/catalog";

export const PREFERRED_PAYMENT_METHOD_TYPES = [
  "card",
  "link",
  "paypal",
  "cashapp",
  "amazon_pay",
] as const satisfies readonly Stripe.Checkout.SessionCreateParams.AllowedPaymentMethodType[];

export type CheckoutSessionSummary = {
  configured: boolean;
  paid: boolean;
  payment_status: string | null;
  customer_email: string | null;
  amount_total: number | null;
  currency: string | null;
  color: string | null;
  sku: string | null;
  product: string | null;
  slug: string | null;
  shipping_note: string | null;
  message?: string;
};

export function checkoutMetadata(
  style: CatalogStyle,
  color: string,
): Record<string, string> {
  return {
    sku: style.sku,
    product: style.name,
    slug: style.slug,
    color,
    line_item_name: checkoutLineItemName(style, color),
    shipping_note: style.shippingNote,
  };
}

export function isPaymentMethodRejection(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("message" in error)) {
    return false;
  }
  const message =
    typeof error.message === "string" ? error.message.toLowerCase() : "";
  const param =
    "param" in error && typeof error.param === "string" ? error.param : "";
  return (
    param.includes("payment_method") ||
    message.includes("payment method") ||
    message.includes("payment_method_types")
  );
}

export function isErrorBody(value: unknown): value is { error: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string"
  );
}

export function isCheckoutSummary(value: unknown): value is CheckoutSessionSummary {
  if (typeof value !== "object" || value === null) return false;
  if (!("configured" in value) || typeof value.configured !== "boolean") return false;
  if (!("paid" in value) || typeof value.paid !== "boolean") return false;
  return true;
}
