import styles from "./PriceTag.module.css";

export function PriceTag({
  priceLabel,
  compareAtLabel,
  size = "lg",
}: {
  priceLabel: string;
  compareAtLabel: string;
  size?: "lg" | "md";
}) {
  return (
    <p className={size === "lg" ? styles.lg : styles.md}>
      <span className={styles.now}>
        <span className="sr-only">Price </span>
        {priceLabel}
      </span>
      <s className={styles.was}>
        <span className="sr-only">Compare at </span>
        {compareAtLabel}
      </s>
    </p>
  );
}
