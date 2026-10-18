import type { ProductColor } from "@/lib/product";
import styles from "./ProductArt.module.css";

type ArtPalette = {
  body: string;
  shade: string;
  stroke: string;
};

function palette(color: ProductColor): ArtPalette {
  switch (color) {
    case "Sage Green":
      return { body: "#7E967C", shade: "#68846A", stroke: "#314438" };
    case "Soft White":
      return { body: "#F7F4EE", shade: "#E6DFD2", stroke: "#6E7A68" };
    default: {
      const exhaustive: never = color;
      return exhaustive;
    }
  }
}

export function ProductArt({
  color,
  priority = false,
}: {
  color: ProductColor;
  priority?: boolean;
}) {
  const tones = palette(color);

  return (
    <figure className={styles.figure} data-priority={priority ? "true" : "false"}>
      <svg
        className={styles.art}
        viewBox="0 0 440 520"
        role="img"
        aria-label={`Illustrated Quiet LED Pet Nail Grinder in ${color}`}
      >
        <rect width="440" height="520" rx="36" fill="#F7F3EB" />
        <circle cx="78" cy="92" r="46" fill="#E4EFE3" />
        <circle cx="368" cy="140" r="28" fill="#EFE4D2" />
        <path
          d="M54 150c18-28 40-22 48-4 10 22-8 36-28 34-16-2-24-14-20-30z"
          fill="#A9C0AA"
        />
        <path
          d="M86 168c16-18 34-10 36 6 2 14-12 24-28 20-12-4-14-16-8-26z"
          fill="#7E967C"
        />
        <ellipse cx="220" cy="470" rx="96" ry="16" fill="rgba(36,49,43,0.08)" />
        <rect
          x="168"
          y="168"
          width="104"
          height="268"
          rx="52"
          fill={tones.body}
          stroke={tones.stroke}
          strokeWidth="3"
        />
        <rect
          x="188"
          y="118"
          width="64"
          height="72"
          rx="22"
          fill={tones.shade}
          stroke={tones.stroke}
          strokeWidth="3"
        />
        <circle cx="220" cy="104" r="40" fill="#EFE8DC" stroke={tones.stroke} strokeWidth="3" />
        <circle cx="220" cy="104" r="22" fill="#2A312E" />
        <circle cx="220" cy="104" r="9" fill="#D7C6B0" />
        <circle cx="176" cy="156" r="8" fill="#F6D98A" />
        <circle cx="264" cy="156" r="8" fill="#F6D98A" />
        <circle cx="176" cy="156" r="16" fill="#F6D98A" opacity="0.35" />
        <circle cx="264" cy="156" r="16" fill="#F6D98A" opacity="0.35" />
        <rect x="204" y="268" width="32" height="54" rx="16" fill={tones.stroke} />
        <path
          d="M198 360h44M198 376h44M198 392h44"
          stroke={tones.stroke}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M312 250c28 8 40 28 34 48-8 26-36 28-48 10"
          fill="none"
          stroke="#A9C0AA"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      <figcaption className={styles.caption}>
        Illustrated placeholder — {color}. Not a product photo.
      </figcaption>
    </figure>
  );
}
