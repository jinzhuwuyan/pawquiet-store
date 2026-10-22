import type { Metadata } from "next";
import Link from "next/link";
import { StyleGrid } from "@/components/StyleGrid";
import { HOME_POINTS, STORE } from "@/lib/product";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Quiet LED pet nail grinders",
  description: STORE.subhead,
};

export default function HomePage() {
  return (
    <main>
      <section className={`shell ${styles.hero}`}>
        <p className={styles.eyebrow}>{STORE.eyebrow}</p>
        <h1>{STORE.title}</h1>
        <p className={styles.subhead}>{STORE.subhead}</p>
        <div className={styles.actions}>
          <Link className="btn btnPrimary" href="/#styles">
            Shop the four styles
          </Link>
          <Link className="btn btnSecondary" href="/shipping">
            Shipping times
          </Link>
        </div>
        <p className={styles.trust}>{STORE.trust}</p>
      </section>

      <section id="styles" className={`shell ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>{STORE.catalogTitle}</h2>
          <p>{STORE.catalogBlurb}</p>
        </div>
        <StyleGrid titleAs="h3" />
      </section>

      <section id="calm" className={`shell ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>{STORE.careTitle}</h2>
          <p>{STORE.careBlurb}</p>
        </div>
        <ul className={styles.features}>
          {HOME_POINTS.map((point) => (
            <li key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`shell ${styles.ready}`}>
        <div>
          <h2>Ready when you are</h2>
          <ul>
            <li>Four styles — {STORE.priceRoster}</li>
            <li>US shipping, with the window listed on each style</li>
            <li>30-day returns on unused items</li>
            <li>Grooming tool only — not a veterinary device</li>
          </ul>
        </div>
        <div className={styles.actions}>
          <Link className="btn btnPrimary" href="/product">
            Shop all styles
          </Link>
          <Link className="btn btnSecondary" href="/#styles">
            Compare on this page
          </Link>
        </div>
      </section>
    </main>
  );
}
