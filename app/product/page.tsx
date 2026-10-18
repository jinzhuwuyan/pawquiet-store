import type { Metadata } from "next";
import Link from "next/link";
import { ProductStudio } from "@/components/ProductStudio";
import { FAQS, FEATURES, PRODUCT, READY_POINTS } from "@/lib/product";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: PRODUCT.name,
  description: PRODUCT.subhead,
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PRODUCT.name,
  sku: PRODUCT.sku,
  brand: { "@type": "Brand", name: PRODUCT.brand },
  description: PRODUCT.subhead,
  color: ["Sage Green", "Soft White"],
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "34.99",
    availability: "https://schema.org/InStock",
    url: "/product",
    areaServed: "US",
  },
};

export default function ProductPage() {
  return (
    <main className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className={styles.top}>
        <ProductStudio />
      </div>

      <section className={styles.block}>
        <h2>{PRODUCT.sectionTitle}</h2>
        <p className={styles.blurb}>{PRODUCT.sectionBlurb}</p>
        <ul className={styles.features}>
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2>{PRODUCT.readyTitle}</h2>
        <ul className={styles.ready}>
          {READY_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2>FAQ</h2>
        <div className={styles.faq}>
          {FAQS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <p className={styles.links}>
          <Link href="/shipping">Shipping</Link>
          <Link href="/refunds">Refunds</Link>
        </p>
      </section>
    </main>
  );
}
