import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StyleStudio } from "@/components/StyleStudio";
import { findStyle } from "@/lib/catalog";
import { STORE } from "@/lib/product";
import styles from "./page.module.css";

export function generateStaticParams() {
  return [
    { slug: "classic" },
    { slug: "duo" },
    { slug: "lite" },
    { slug: "factory" },
  ];
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const style = findStyle(slug);
  if (!style) {
    return { title: "Not found" };
  }
  return {
    title: style.name,
    description: style.blurb,
  };
}

export default async function ProductStylePage(
  props: PageProps<"/product/[slug]">,
) {
  const { slug } = await props.params;
  const style = findStyle(slug);
  if (!style) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: style.name,
    sku: style.sku,
    brand: { "@type": "Brand", name: STORE.brand },
    description: style.blurb,
    image: style.images.map((image) => image.src),
    color: style.colors.map((color) => color.name),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "34.99",
      availability: "https://schema.org/InStock",
      url: `/product/${style.slug}`,
      areaServed: "US",
    },
  };

  return (
    <main className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className={styles.top}>
        <p className={styles.back}>
          <Link href="/product">All styles</Link>
        </p>
        <StyleStudio style={style} />
      </div>

      <section className={styles.block}>
        <h2>What you get</h2>
        <p className={styles.blurb}>{style.blurb}</p>
        <ul className={styles.features}>
          {style.features.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2>Specs</h2>
        <ul className={styles.ready}>
          {style.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2>FAQ</h2>
        <div className={styles.faq}>
          {style.faqs.map((item) => (
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
