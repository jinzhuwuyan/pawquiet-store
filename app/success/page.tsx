import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutStatus } from "@/components/CheckoutStatus";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your PawQuiet checkout return page.",
};

export default function SuccessPage() {
  return (
    <main className={`shell ${styles.main}`}>
      <p className={styles.eyebrow}>PawQuiet</p>
      <h1>Thank you</h1>
      <Suspense fallback={<p>Checking your checkout…</p>}>
        <CheckoutStatus />
      </Suspense>
    </main>
  );
}
