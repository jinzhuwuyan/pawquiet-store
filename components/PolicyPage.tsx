import type { ReactNode } from "react";
import styles from "./PolicyPage.module.css";

export function PolicyPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className={`shell ${styles.main}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <div className={styles.body}>{children}</div>
    </main>
  );
}
