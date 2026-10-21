export const PRICE_CENTS = 3499;
export const PRICE_LABEL = "$34.99";

export const STYLE_SLUGS = ["classic", "duo", "lite", "factory"] as const;

export type StyleSlug = (typeof STYLE_SLUGS)[number];

export type CatalogColor = {
  name: string;
  swatch: string;
};

export type CatalogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  color?: string;
};

export type CatalogFeature = {
  title: string;
  body: string;
};

export type CatalogFaq = {
  question: string;
  answer: string;
};

export type CatalogStyle = {
  slug: StyleSlug;
  name: string;
  sku: string;
  priceCents: number;
  priceLabel: string;
  compareAtLabel: string;
  blurb: string;
  shippingNote: string;
  photoNote?: string;
  colors: readonly CatalogColor[];
  defaultColor: string;
  specs: readonly string[];
  features: readonly CatalogFeature[];
  faqs: readonly CatalogFaq[];
  images: readonly [CatalogImage, ...CatalogImage[]];
};

const SAGE = { name: "Sage Green", swatch: "#7E967C" } as const;
const WHITE = { name: "Soft White", swatch: "#F7F4EE" } as const;
const PINK = { name: "Soft Pink", swatch: "#E7B4C4" } as const;

const RETURNS_ANSWER =
  "We offer a 30-day return window for unused items in original packaging. See the Refunds page for details.";

function shippingAnswer(note: string): string {
  return `${note}. Tracking is emailed after fulfillment.`;
}

const CLASSIC: CatalogStyle = {
  slug: "classic",
  name: "PawQuiet Classic 5-Speed",
  sku: "PNG-LED-CLASSIC",
  priceCents: PRICE_CENTS,
  priceLabel: PRICE_LABEL,
  compareAtLabel: "$49.99",
  blurb:
    "A rechargeable 5-speed LED grinder with a quiet motor, a tip light, and three grinding ports.",
  shippingNote: "Ships to the US in about 7–15 business days",
  colors: [SAGE, WHITE],
  defaultColor: SAGE.name,
  specs: [
    "USB rechargeable",
    "5 speeds",
    "LED tip light",
    "Quiet motor",
    "3 grinding ports",
    "USB cable included",
  ],
  features: [
    {
      title: "Quiet motor",
      body: "A low-noise motor for short trims, so most pets can stay nearby.",
    },
    {
      title: "LED tip light",
      body: "A light at the tip makes the nail easier to see.",
    },
    {
      title: "Three grinding ports",
      body: "Sized ports help guide the nail onto the spinning surface.",
    },
    {
      title: "Five speeds",
      body: "Use a lower speed for cats and small dogs, and a higher speed for thicker nails.",
    },
  ],
  faqs: [
    {
      question: "Is it safe for cats and small dogs?",
      answer:
        "It is a grooming tool for cats and dogs. Start on the lowest speed, keep sessions short, and stop if your pet seems stressed. It is not a veterinary device.",
    },
    {
      question: "How loud is it?",
      answer:
        "The motor is meant to run quieter than many clippers. Pets vary — let them hear it before the first trim.",
    },
    {
      question: "How long does shipping take?",
      answer: shippingAnswer("Ships to the US in about 7–15 business days"),
    },
    {
      question: "What is your return window?",
      answer: RETURNS_ANSWER,
    },
    {
      question: "Does it come with a charger?",
      answer:
        "It uses a built-in rechargeable battery. Charge fully before first use with the included USB cable.",
    },
  ],
  images: [
    {
      src: "/products/classic/sage-green.jpeg",
      alt: "Product photo of the PawQuiet Classic 5-Speed in Sage Green",
      width: 800,
      height: 800,
      color: SAGE.name,
    },
    {
      src: "/products/classic/soft-white.jpeg",
      alt: "Product photo of the PawQuiet Classic 5-Speed in Soft White",
      width: 800,
      height: 800,
      color: WHITE.name,
    },
    {
      src: "/products/classic/studio.jpg",
      alt: "Product photo of the PawQuiet Classic 5-Speed nail grinder",
      width: 1000,
      height: 1000,
    },
    {
      src: "/products/classic/lifestyle.jpg",
      alt: "Product photo of the PawQuiet Classic 5-Speed beside a pet",
      width: 970,
      height: 600,
    },
  ],
};

const DUO: CatalogStyle = {
  slug: "duo",
  name: "PawQuiet Duo Clip+Grind",
  sku: "PNG-LED-DUO",
  priceCents: PRICE_CENTS,
  priceLabel: PRICE_LABEL,
  compareAtLabel: "$49.99",
  blurb: "A 2-in-1 clipper and grinder with dual LED lights, for cats and dogs.",
  shippingNote: "Ships to the US in about 7–15 business days",
  photoNote:
    "The lead photo shows the clipper and grinder in Sage Green, Soft White, and Soft Pink.",
  colors: [SAGE, WHITE, PINK],
  defaultColor: SAGE.name,
  specs: [
    "2-in-1 clipper and grinder",
    "Dual LED",
    "USB rechargeable",
    "For cats and dogs",
  ],
  features: [
    {
      title: "Clipper and grinder",
      body: "One handset for clipping and grinding, so a trim can finish in one tool.",
    },
    {
      title: "Dual LED",
      body: "A light at each end helps you see the nail while you clip or grind.",
    },
    {
      title: "USB rechargeable",
      body: "Charge it with a USB cable before the first session.",
    },
    {
      title: "Cats and dogs",
      body: "Shaped for at-home nail care. Keep sessions short, and stop if your pet is stressed.",
    },
  ],
  faqs: [
    {
      question: "Is it a clipper and a grinder?",
      answer:
        "Yes. It is a 2-in-1 clipper and grinder with a light at each end, for cats and dogs.",
    },
    {
      question: "Is it safe for cats and small dogs?",
      answer:
        "It is a grooming tool. Keep sessions short, and stop if your pet seems stressed. It is not a veterinary device.",
    },
    {
      question: "How long does shipping take?",
      answer: shippingAnswer("Ships to the US in about 7–15 business days"),
    },
    {
      question: "What is your return window?",
      answer: RETURNS_ANSWER,
    },
    {
      question: "Does it come with a charger?",
      answer:
        "It uses a built-in rechargeable battery. Charge fully before first use with a USB cable.",
    },
  ],
  images: [
    {
      src: "/products/duo/hero.jpg",
      alt: "Product photo of the PawQuiet Duo Clip+Grind in Sage Green, Soft White, and Soft Pink",
      width: 751,
      height: 753,
    },
    {
      src: "/products/duo/lifestyle.jpg",
      alt: "Lifestyle photo of PawQuiet nail care at home",
      width: 970,
      height: 600,
    },
  ],
};

const LITE: CatalogStyle = {
  slug: "lite",
  name: "PawQuiet Lite Green",
  sku: "PNG-LED-LITE",
  priceCents: PRICE_CENTS,
  priceLabel: PRICE_LABEL,
  compareAtLabel: "$44.99",
  blurb:
    "An entry LED grinder for everyday trims — USB rechargeable, with an assist light.",
  shippingNote: "Ships to the US in about 7–15 business days",
  colors: [SAGE],
  defaultColor: SAGE.name,
  specs: [
    "USB rechargeable",
    "LED assist light",
    "Quiet everyday trim",
    "Entry LED grinder",
  ],
  features: [
    {
      title: "Entry LED grinder",
      body: "A simpler grinder for everyday trims, with an assist light at the tip.",
    },
    {
      title: "Quiet everyday trim",
      body: "Meant to stay gentle and low-key. Let your pet hear it before you start.",
    },
    {
      title: "USB rechargeable",
      body: "Charge fully before the first use.",
    },
    {
      title: "Sage green",
      body: "This style comes in sage green.",
    },
  ],
  faqs: [
    {
      question: "How many speeds does it have?",
      answer:
        "Speed settings are not listed for PawQuiet Lite Green. It is an entry LED grinder for short, everyday trims.",
    },
    {
      question: "Is it safe for cats and small dogs?",
      answer:
        "It is a grooming tool for short everyday trims. Keep sessions brief, and stop if your pet seems stressed. It is not a veterinary device.",
    },
    {
      question: "How loud is it?",
      answer:
        "It is meant for quiet everyday trims. Pets vary — let them hear it before you start.",
    },
    {
      question: "How long does shipping take?",
      answer: shippingAnswer("Ships to the US in about 7–15 business days"),
    },
    {
      question: "What is your return window?",
      answer: RETURNS_ANSWER,
    },
  ],
  images: [
    {
      src: "/products/lite/hero.jpeg",
      alt: "Product photo of the PawQuiet Lite Green nail grinder in Sage Green",
      width: 800,
      height: 800,
      color: SAGE.name,
    },
    {
      src: "/products/lite/studio.jpg",
      alt: "Product photo of the PawQuiet Lite Green LED nail grinder",
      width: 1000,
      height: 1000,
    },
    {
      src: "/products/lite/lifestyle.jpg",
      alt: "Product photo of PawQuiet Lite Green nail care with a pet",
      width: 970,
      height: 600,
    },
  ],
};

const FACTORY: CatalogStyle = {
  slug: "factory",
  name: "PawQuiet Factory 5-Speed",
  sku: "PNG-LED-FACTORY",
  priceCents: PRICE_CENTS,
  priceLabel: PRICE_LABEL,
  compareAtLabel: "$49.99",
  blurb:
    "A USB rechargeable 5-speed grinder with a bright LED, in sage green or soft white.",
  shippingNote: "Ships to the US in about 10–20 business days",
  photoNote:
    "Photos show the sage green body. Soft White is the same grinder in white.",
  colors: [SAGE, WHITE],
  defaultColor: SAGE.name,
  specs: [
    "USB Type-C rechargeable",
    "5 speeds",
    "Bright LED",
    "Sage green or soft white body",
  ],
  features: [
    {
      title: "Five speeds",
      body: "Use a lower speed for a lighter pass, and a higher speed for thicker nails.",
    },
    {
      title: "Bright LED",
      body: "A bright tip light for a clearer view of the nail.",
    },
    {
      title: "USB rechargeable",
      body: "Charges by USB Type-C. Charge fully before the first use.",
    },
    {
      title: "Two colors",
      body: "Choose a sage green or soft white body.",
    },
  ],
  faqs: [
    {
      question: "Is it safe for cats and small dogs?",
      answer:
        "It is a grooming tool. Start on a lower speed, keep sessions short, and stop if your pet seems stressed. It is not a veterinary device.",
    },
    {
      question: "How long does shipping take?",
      answer: shippingAnswer("Ships to the US in about 10–20 business days"),
    },
    {
      question: "How does it charge?",
      answer:
        "It uses a built-in rechargeable battery and charges by USB Type-C. Charge fully before first use.",
    },
    {
      question: "What is your return window?",
      answer: RETURNS_ANSWER,
    },
  ],
  images: [
    {
      src: "/products/factory/front.jpg",
      alt: "Product photo of the PawQuiet Factory 5-Speed nail grinder",
      width: 210,
      height: 600,
    },
    {
      src: "/products/factory/detail.jpg",
      alt: "Product photo of the PawQuiet Factory 5-Speed grinding ports and LED tip",
      width: 120,
      height: 530,
    },
  ],
};

export const STYLES: readonly CatalogStyle[] = [CLASSIC, DUO, LITE, FACTORY];

export function isStyleSlug(value: unknown): value is StyleSlug {
  return (
    typeof value === "string" &&
    (STYLE_SLUGS as readonly string[]).includes(value)
  );
}

export function getStyle(slug: StyleSlug): CatalogStyle {
  switch (slug) {
    case "classic":
      return CLASSIC;
    case "duo":
      return DUO;
    case "lite":
      return LITE;
    case "factory":
      return FACTORY;
    default: {
      const exhaustive: never = slug;
      return exhaustive;
    }
  }
}

export function findStyle(slug: string): CatalogStyle | undefined {
  if (!isStyleSlug(slug)) return undefined;
  return getStyle(slug);
}

export function isStyleColor(style: CatalogStyle, value: unknown): value is string {
  return (
    typeof value === "string" && style.colors.some((color) => color.name === value)
  );
}

export function checkoutLineItemName(style: CatalogStyle, color: string): string {
  return `${style.name} — ${color}`;
}

export function styleHref(slug: StyleSlug): `/product/${StyleSlug}` {
  return `/product/${slug}`;
}

export function heroImage(style: CatalogStyle): CatalogImage {
  const match = style.images.find((image) => image.color === style.defaultColor);
  return match ?? style.images[0];
}
