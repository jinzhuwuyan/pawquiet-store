"use client";

import { useState } from "react";
import { PriceTag } from "@/components/PriceTag";
import { ProductArt } from "@/components/ProductArt";
import { isErrorBody } from "@/lib/checkout";
import {
  COLORS,
  DEFAULT_COLOR,
  PAYMENT_CHIPS,
  PRODUCT,
  type ProductColor,
} from "@/lib/product";
import styles from "./ProductStudio.module.css";

export function ProductStudio() {
  const [color, setColor] = useState<ProductColor>(DEFAULT_COLOR);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onBuy() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
      const data: unknown = await response.json();
      if (
        !response.ok ||
        typeof data !== "object" ||
        data === null ||
        !("url" in data) ||
        typeof data.url !== "string"
      ) {
        setError(
          isErrorBody(data)
            ? data.error
            : "Checkout could not start. Please try again.",
        );
        setPending(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className={styles.grid}>
      <ProductArt color={color} priority />
      <div className={styles.details}>
        <p className={styles.badge}>{PRODUCT.badge}</p>
        <h1>{PRODUCT.name}</h1>
        <p className={styles.byline}>
          by {PRODUCT.brand} · SKU {PRODUCT.sku}
        </p>
        <PriceTag size="md" />
        <p className={styles.ship}>{PRODUCT.shippingNote}</p>

        <fieldset className={styles.colors}>
          <legend>Color</legend>
          <div className={styles.choices}>
            {COLORS.map((option) => (
              <label key={option.name} className={styles.choice}>
                <input
                  type="radio"
                  name="color"
                  value={option.name}
                  checked={color === option.name}
                  onChange={() => {
                    setColor(option.name);
                  }}
                />
                <span
                  className={styles.swatch}
                  style={{ background: option.swatch }}
                  aria-hidden="true"
                />
                {option.name}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className="btn btnPrimary"
          onClick={onBuy}
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Opening checkout…" : PRODUCT.buyLabel}
        </button>
        {error ? (
          <p className={styles.alert} role="alert">
            {error}
          </p>
        ) : null}

        <ul className={styles.chips} aria-label="Payment methods">
          {PAYMENT_CHIPS.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <p className={styles.fine}>{PRODUCT.finePrint}</p>
      </div>
    </div>
  );
}
