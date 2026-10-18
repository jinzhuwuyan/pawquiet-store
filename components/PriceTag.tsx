import { PRODUCT } from "@/lib/product";
import styles from "./PriceTag.module.css";

export function PriceTag({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <p className={size === "lg" ? styles.lg : styles.md}>
      <span className={styles.now}>
        <span className="sr-only">Price </span>
        {PRODUCT.priceLabel}
      </span>
      <s className={styles.was}>
        <span className="sr-only">Compare at </span>
        {PRODUCT.compareAtLabel}
      </s>
    </p>
  );
}
