import Image from "next/image";
import Link from "next/link";
import { heroImage, STYLES, styleHref } from "@/lib/catalog";
import { PriceTag } from "@/components/PriceTag";
import styles from "./StyleGrid.module.css";

export function StyleGrid({ titleAs = "h3" }: { titleAs?: "h2" | "h3" }) {
  const TitleTag = titleAs;

  return (
    <ul className={styles.grid}>
      {STYLES.map((style) => {
        const hero = heroImage(style);
        return (
          <li key={style.slug}>
            <article className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.body}>
                <TitleTag className={styles.name}>
                  <Link href={styleHref(style.slug)}>{style.name}</Link>
                </TitleTag>
                <p className={styles.blurb}>{style.blurb}</p>
                <PriceTag
                  priceLabel={style.priceLabel}
                  compareAtLabel={style.compareAtLabel}
                  size="md"
                />
                <p className={styles.colors}>
                  {style.colors.map((color) => color.name).join(" · ")}
                </p>
                <p className={styles.ship}>{style.shippingNote}</p>
                <Link className={`btn btnSecondary ${styles.more}`} href={styleHref(style.slug)}>
                  View details
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
