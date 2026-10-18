import Link from "next/link";
import { Suspense } from "react";
import { NAV_LINKS } from "@/lib/product";
import { SiteNav } from "@/components/SiteNav";
import styles from "./SiteHeader.module.css";

function NavLinks({ current }: { current?: string }) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={current === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <PawMark />
          PawQuiet
        </Link>
        <Suspense fallback={<NavLinks />}>
          <SiteNav />
        </Suspense>
      </div>
    </header>
  );
}

function PawMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="#3F5C48" />
      <circle cx="10" cy="12" r="2.1" fill="#F3EEE4" />
      <circle cx="16" cy="10" r="2.1" fill="#F3EEE4" />
      <circle cx="22" cy="12" r="2.1" fill="#F3EEE4" />
      <ellipse cx="16" cy="20" rx="5" ry="3.8" fill="#F3EEE4" />
    </svg>
  );
}
