export const PRODUCT = {
  brand: "PawQuiet",
  name: "Quiet LED Pet Nail Grinder",
  sku: "PNG-LED-01",
  priceCents: 3499,
  priceLabel: "$34.99",
  compareAtLabel: "$49.99",
  currency: "usd",
  shippingNote: "Ships to the US in about 7–15 business days",
  eyebrow: "New · Rechargeable · LED",
  subhead: "Gentle nail care for cats & dogs — quiet, lit, and easy to hold.",
  badge: "In stock · ships from partner warehouse",
  buyLabel: "Buy now — $34.99",
  finePrint:
    "One checkout — Stripe shows every channel that is enabled for your currency and device (*wallets need Safari/Chrome support). Preview runs in test mode. Grooming tool only — not a veterinary device.",
  sectionTitle: "Built for calm nail days",
  sectionBlurb:
    "Four things that make at-home trimming less stressful for you and your pet — without medical claims or gimmicks.",
  readyTitle: "Ready when you are",
  trust:
    "Ships to the US · 7–15 business days · 30-day returns · Dropship · no warehouse wait",
  footer:
    "Thoughtful at-home nail care for cats and dogs. © 2026 PawQuiet. For grooming use only — not a medical device.",
} as const;

export const COLORS = [
  { name: "Sage Green", swatch: "#7E967C" },
  { name: "Soft White", swatch: "#F7F4EE" },
] as const;

export type ProductColor = (typeof COLORS)[number]["name"];

export const DEFAULT_COLOR: ProductColor = "Sage Green";

export function isProductColor(value: unknown): value is ProductColor {
  return value === "Sage Green" || value === "Soft White";
}

export const FEATURES = [
  {
    title: "Quiet motor",
    body: "Low-noise design so most pets stay calm during a quick trim.",
  },
  {
    title: "LED tip light",
    body: "See the nail clearly — less guesswork, more even results.",
  },
  {
    title: "Safe grinding ports",
    body: "Sized ports help guide nails away from the spinning tip.",
  },
  {
    title: "5 speed settings",
    body: "Dial up for thick dog nails or keep it soft for cats and small breeds.",
  },
] as const;

export const READY_POINTS = [
  "Rechargeable USB charging",
  "5 adjustable speeds",
  "Built-in LED light",
  "For cats and dogs",
  "Includes replacement grinding heads",
  "Compact, one-hand grip",
] as const;

export const FAQS = [
  {
    question: "Is it safe for cats and small dogs?",
    answer:
      "Yes — start on the lowest speed, keep sessions short, and stop if your pet seems stressed. The ports help keep nails aligned with the grinding surface.",
  },
  {
    question: "How loud is it?",
    answer:
      "It is designed to run quieter than many clippers. Pets vary — introduce the sound before the first trim.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders to the United States usually arrive in 7–15 business days via our dropship partners. Tracking is emailed after fulfillment.",
  },
  {
    question: "What is your return window?",
    answer:
      "We offer a 30-day return window for unused items in original packaging. See the Refunds page for details.",
  },
  {
    question: "Does it come with batteries?",
    answer:
      "It uses a built-in rechargeable battery. Charge fully before first use with the included USB cable.",
  },
] as const;

export const PAYMENT_CHIPS = [
  "Cards",
  "Link",
  "PayPal",
  "Cash App",
  "Amazon Pay",
  "Apple Pay*",
  "Google Pay*",
] as const;

export const NAV_LINKS = [
  { href: "/product", label: "Shop" },
  { href: "/shipping", label: "Shipping" },
  { href: "/refunds", label: "Refunds" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/product", label: "Shop" },
  { href: "/shipping", label: "Shipping" },
  { href: "/refunds", label: "Refunds" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
] as const;
