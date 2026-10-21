"use client";

import Image from "next/image";
import { useState } from "react";
import { PriceTag } from "@/components/PriceTag";
import type { CatalogStyle } from "@/lib/catalog";
import { isErrorBody } from "@/lib/checkout";
import { PAYMENT_CHIPS, STORE } from "@/lib/product";
import styles from "./StyleStudio.module.css";

export function StyleStudio({ style }: { style: CatalogStyle }) {
  const [color, setColor] = useState(style.defaultColor);
  const [imageIndex, setImageIndex] = useState(() => initialImageIndex(style));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const image = style.images[imageIndex] ?? style.images[0];
  const multipleColors = style.colors.length > 1;

  function onColor(next: string) {
    setColor(next);
    const match = style.images.findIndex((item) => item.color === next);
    if (match >= 0) setImageIndex(match);
  }

  async function onBuy() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: style.slug, color }),
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
      <div>
        <div className={styles.stage}>
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 880px) 42vw, 100vw"
            style={{ objectFit: "contain" }}
            preload={imageIndex === initialImageIndex(style)}
          />
        </div>
        <ul className={styles.thumbs}>
          {style.images.map((item, index) => (
            <li key={item.src}>
              <button
                type="button"
                className={styles.thumb}
                aria-label={item.alt}
                aria-current={index === imageIndex ? "true" : undefined}
                onClick={() => {
                  setImageIndex(index);
                }}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="72px"
                  style={{ objectFit: "contain" }}
                />
              </button>
            </li>
          ))}
        </ul>
        {style.photoNote ? <p className={styles.note}>{style.photoNote}</p> : null}
      </div>

      <div className={styles.details}>
        <p className={styles.badge}>{STORE.badge}</p>
        <h1>{style.name}</h1>
        <p className={styles.byline}>
          by {STORE.brand} · SKU {style.sku}
        </p>
        <PriceTag
          priceLabel={style.priceLabel}
          compareAtLabel={style.compareAtLabel}
          size="md"
        />
        <p className={styles.ship}>{style.shippingNote}</p>

        {multipleColors ? (
          <fieldset className={styles.colors}>
            <legend>Color</legend>
            <div className={styles.choices}>
              {style.colors.map((option) => (
                <label key={option.name} className={styles.choice}>
                  <input
                    type="radio"
                    name={`${style.slug}-color`}
                    value={option.name}
                    checked={color === option.name}
                    onChange={() => {
                      onColor(option.name);
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
        ) : (
          <p className={styles.singleColor}>
            <span
              className={styles.swatch}
              style={{ background: style.colors[0].swatch }}
              aria-hidden="true"
            />
            Color: {style.colors[0].name}
          </p>
        )}

        <button
          type="button"
          className="btn btnPrimary"
          onClick={onBuy}
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Opening checkout…" : STORE.buyLabel}
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
        <p className={styles.fine}>{STORE.finePrint}</p>
      </div>
    </div>
  );
}

function initialImageIndex(style: CatalogStyle): number {
  const match = style.images.findIndex((image) => image.color === style.defaultColor);
  return match >= 0 ? match : 0;
}
