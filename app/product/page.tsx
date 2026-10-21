import type { Metadata } from "next";
import { StyleGrid } from "@/components/StyleGrid";
import { STORE } from "@/lib/product";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Four PawQuiet LED nail-care styles for cats and dogs. $34.99 each.",
};

export default function ShopPage() {
  return (
    <main className={`shell ${styles.shop}`}>
      <p className={styles.eyebrow}>{STORE.brand}</p>
      <h1>Shop</h1>
      <p className={styles.intro}>{STORE.catalogBlurb}</p>
      <StyleGrid titleAs="h2" />
    </main>
  );
}
