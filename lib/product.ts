import { stylePriceRoster } from "@/lib/catalog";

const PRICE_ROSTER = stylePriceRoster();

export const STORE = {
  brand: "PawQuiet",
  eyebrow: "Four styles · USB rechargeable · LED",
  title: "Quiet nail care, four ways",
  subhead:
    "LED pet nail grinders for cats and dogs. Choose a style, then check out.",
  finePrint:
    "One checkout — Stripe shows every channel that is enabled for your currency and device (*wallets need Safari/Chrome support). Preview runs in test mode. Grooming tool only — not a veterinary device.",
  trust:
    "Ships to the US · 30-day returns on unused items · Grooming tool only — not a veterinary device.",
  footer:
    "Thoughtful at-home nail care for cats and dogs. © 2026 PawQuiet. For grooming use only — not a medical device.",
  badge: "In stock",
  catalogTitle: "Four styles",
  catalogBlurb: `${PRICE_ROSTER}. The shipping window is listed on the style you pick.`,
  priceRoster: PRICE_ROSTER,
  shopDescription: `Four PawQuiet LED nail-care styles for cats and dogs. ${PRICE_ROSTER}.`,
  careTitle: "Before you trim",
  careBlurb:
    "The same calm routine, whichever style you take home. These are grooming tools, not medical devices.",
} as const;

export const HOME_POINTS = [
  {
    title: "LED on every style",
    body: "Each grinder has a light so the nail is easier to see.",
  },
  {
    title: "USB rechargeable",
    body: "Charge before the first trim. No loose batteries to swap.",
  },
  {
    title: "For cats and dogs",
    body: "Keep sessions short, introduce the sound first, and stop if your pet is stressed.",
  },
  {
    title: "Grooming use only",
    body: "PawQuiet tools are for at-home nail care. They are not veterinary devices.",
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
