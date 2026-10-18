import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Checkout canceled",
  description: "Stripe Checkout was canceled. No charge was made.",
};

export default function CanceledPage() {
  return (
    <main className={`shell ${styles.main}`}>
      <p className={styles.eyebrow}>PawQuiet</p>
      <h1>Checkout canceled</h1>
      <p>No charge was made. Your Quiet LED Pet Nail Grinder is still here when you are ready.</p>
      <div className={styles.actions}>
        <Link className="btn btnPrimary" href="/product">
          Back to the grinder
        </Link>
        <Link className="btn btnSecondary" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
