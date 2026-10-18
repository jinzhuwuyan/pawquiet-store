import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What PawQuiet collects at checkout and through the contact form, and how card payments are handled.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage eyebrow="PawQuiet" title="Privacy">
      <p>
        We collect your name, email, shipping address, and messages you send
        us so we can fulfill orders and reply to you.
      </p>
      <p>
        Cards are handled by our payment provider (Stripe). PawQuiet does not
        store full card numbers.
      </p>
      <p>We do not sell personal information.</p>
      <p>
        For privacy questions, use <Link href="/contact">Contact</Link>.
      </p>
    </PolicyPage>
  );
}
