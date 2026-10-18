import { NextResponse, type NextRequest } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a JSON body with name, email, and message." },
      { status: 400 },
    );
  }

  const name = readField(body, "name");
  const email = readField(body, "email");
  const message = readField(body, "message");
  const errors: ContactErrors = {};

  if (!name || name.length > 80) {
    errors.name = "Enter your name.";
  }
  if (!email || email.length > 120 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email.";
  }
  if (!message || message.length > 2000) {
    errors.message = "Enter a message.";
  }

  if (errors.name || errors.email || errors.message) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

function readField(body: unknown, key: "name" | "email" | "message"): string {
  if (typeof body !== "object" || body === null) return "";
  const record = body as Record<string, unknown>;
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}
