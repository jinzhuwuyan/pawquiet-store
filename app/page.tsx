import type { Metadata } from "next";
import Link from "next/link";
import { PriceTag } from "@/components/PriceTag";
import { ProductArt } from "@/components/ProductArt";
import { DEFAULT_COLOR, FEATURES, PRODUCT, READY_POINTS } from "@/lib/product";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Quiet LED Pet Nail Grinder",
  description: PRODUCT.subhead,
};

export default function HomePage() {
  return (
    <main>
      <section className={`shell ${styles.hero}`}>
        <div>
          <p className={styles.eyebrow}>{PRODUCT.eyebrow}</p>
          <h1>{PRODUCT.name}</h1>
          <p className={styles.subhead}>{PRODUCT.subhead}</p>
          <PriceTag />
          <p className={styles.ship}>{PRODUCT.shippingNote}</p>
          <div className={styles.actions}>
            <Link className="btn btnPrimary" href="/product">
              Shop now
            </Link>
            <Link className="btn btnSecondary" href="/#calm">
              See why it&apos;s quieter
            </Link>
          </div>
          <p className={styles.trust}>{PRODUCT.trust}</p>
        </div>
        <ProductArt color={DEFAULT_COLOR} priority />
      </section>

      <section id="calm" className={`shell ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>{PRODUCT.sectionTitle}</h2>
          <p>{PRODUCT.sectionBlurb}</p>
        </div>
        <ul className={styles.features}>
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`shell ${styles.ready}`}>
        <div>
          <h2>{PRODUCT.readyTitle}</h2>
          <ul>
            {READY_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className={styles.actions}>
          <Link className="btn btnPrimary" href="/product">
            Shop the grinder
          </Link>
          <Link className="btn btnSecondary" href="/product">
            View product details — $34.99
          </Link>
        </div>
      </section>
    </main>
  );
}
