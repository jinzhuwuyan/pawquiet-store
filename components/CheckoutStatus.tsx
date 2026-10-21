"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  isCheckoutSummary,
  isErrorBody,
  type CheckoutSessionSummary,
} from "@/lib/checkout";
import { isStyleSlug, styleHref } from "@/lib/catalog";
import styles from "./CheckoutStatus.module.css";

type Phase =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; summary: CheckoutSessionSummary }
  | { kind: "error"; message: string };

export function CheckoutStatus() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });

  useEffect(() => {
    if (!sessionId) return;
    const controller = new AbortController();
    let ignore = false;

    async function load(id: string) {
      setPhase({ kind: "loading" });
      try {
        const response = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );
        const data: unknown = await response.json();
        if (ignore) return;
        if (!response.ok || !isCheckoutSummary(data)) {
          setPhase({
            kind: "error",
            message: isErrorBody(data)
              ? data.error
              : "Could not confirm this checkout.",
          });
          return;
        }
        setPhase({ kind: "ready", summary: data });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!ignore) {
          setPhase({
            kind: "error",
            message: "Network error while checking checkout.",
          });
        }
      }
    }

    void load(sessionId);
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [sessionId]);

  const productHref =
    phase.kind === "ready" && phase.summary.slug && isStyleSlug(phase.summary.slug)
      ? styleHref(phase.summary.slug)
      : "/product";

  return (
    <div className={styles.panel}>
      <StatusBody phase={phase} hasSession={Boolean(sessionId)} />
      <div className={styles.actions}>
        <Link className="btn btnPrimary" href="/">
          Back home
        </Link>
        <Link className="btn btnSecondary" href={productHref}>
          {productHref === "/product" ? "View the shop" : "View this style"}
        </Link>
      </div>
    </div>
  );
}

function StatusBody({
  phase,
  hasSession,
}: {
  phase: Phase;
  hasSession: boolean;
}) {
  switch (phase.kind) {
    case "idle":
      return hasSession ? (
        <p>Checking your checkout…</p>
      ) : (
        <p>
          If you completed checkout, keep the receipt Stripe emailed you. This
          page does not have a session to confirm.
        </p>
      );
    case "loading":
      return <p role="status">Checking your checkout…</p>;
    case "error":
      return (
        <p className={styles.error} role="alert">
          {phase.message}
        </p>
      );
    case "ready":
      return <ReadySummary summary={phase.summary} />;
    default: {
      const exhaustive: never = phase;
      return exhaustive;
    }
  }
}

function ReadySummary({ summary }: { summary: CheckoutSessionSummary }) {
  if (!summary.configured) {
    return <p>{summary.message}</p>;
  }

  const total = formatMoney(summary.amount_total, summary.currency);

  return (
    <div>
      <p className={summary.paid ? styles.paid : styles.pending} role="status">
        {summary.paid
          ? `Payment received. ${summary.product ?? "Your PawQuiet order"}${summary.color ? ` in ${summary.color}` : ""} is confirmed.`
          : "This checkout is not paid yet. You can return to the shop and try again."}
      </p>
      <dl className={styles.facts}>
        <div>
          <dt>Product</dt>
          <dd>{summary.product ?? "PawQuiet"}</dd>
        </div>
        <div>
          <dt>SKU</dt>
          <dd>{summary.sku ?? "—"}</dd>
        </div>
        <div>
          <dt>Color</dt>
          <dd>{summary.color ?? "—"}</dd>
        </div>
        {total ? (
          <div>
            <dt>Total</dt>
            <dd>{total}</dd>
          </div>
        ) : null}
        {summary.customer_email ? (
          <div>
            <dt>Email</dt>
            <dd>{summary.customer_email}</dd>
          </div>
        ) : null}
      </dl>
      <p>
        {summary.shipping_note
          ? `${summary.shipping_note}. Tracking is emailed after fulfillment.`
          : "Tracking is emailed after fulfillment."}
      </p>
    </div>
  );
}

function formatMoney(cents: number | null, currency: string | null): string | null {
  if (cents == null) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency ?? "usd").toUpperCase(),
    }).format(cents / 100);
  } catch {
    return null;
  }
}
