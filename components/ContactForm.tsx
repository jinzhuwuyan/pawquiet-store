"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormPhase =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; errors?: FieldErrors };

export function ContactForm() {
  const [phase, setPhase] = useState<FormPhase>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPhase({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const body: unknown = await response.json();
      if (!response.ok) {
        const errors = readErrors(body);
        setPhase({
          kind: "error",
          message: "Check the form and try again.",
          errors,
        });
        return;
      }
      form.reset();
      setPhase({ kind: "success" });
    } catch {
      setPhase({
        kind: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  const errors = phase.kind === "error" ? phase.errors : undefined;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required maxLength={80} />
        {errors?.name ? <span className={styles.fieldError}>{errors.name}</span> : null}
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
        />
        {errors?.email ? <span className={styles.fieldError}>{errors.email}</span> : null}
      </label>
      <label>
        Message
        <textarea name="message" rows={6} required maxLength={2000} />
        {errors?.message ? (
          <span className={styles.fieldError}>{errors.message}</span>
        ) : null}
      </label>
      <button
        className="btn btnPrimary"
        type="submit"
        disabled={phase.kind === "submitting"}
      >
        {phase.kind === "submitting" ? "Sending…" : "Send message"}
      </button>
      {phase.kind === "success" ? (
        <p className={styles.success} role="status">
          Thanks. We reply within 1–2 business days.
        </p>
      ) : null}
      {phase.kind === "error" ? (
        <p className={styles.error} role="alert">
          {phase.message}
        </p>
      ) : null}
    </form>
  );
}

function readErrors(body: unknown): FieldErrors | undefined {
  if (typeof body !== "object" || body === null || !("errors" in body)) {
    return undefined;
  }
  const errors = body.errors;
  if (typeof errors !== "object" || errors === null) return undefined;
  const result: FieldErrors = {};
  if ("name" in errors && typeof errors.name === "string") result.name = errors.name;
  if ("email" in errors && typeof errors.email === "string") result.email = errors.email;
  if ("message" in errors && typeof errors.message === "string") {
    result.message = errors.message;
  }
  return result;
}
