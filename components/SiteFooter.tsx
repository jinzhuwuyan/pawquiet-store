import Link from "next/link";
import { FOOTER_LINKS, STORE } from "@/lib/product";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div>
          <p className={styles.brand}>PawQuiet</p>
          <p className={styles.copy}>{STORE.footer}</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
