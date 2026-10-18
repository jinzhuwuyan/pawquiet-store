import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Refunds",
  description:
    "30-day return window from delivery for unused items in original packaging.",
};

export default function RefundsPage() {
  return (
    <PolicyPage eyebrow="PawQuiet" title="Refunds">
      <p>
        We offer a 30-day return window from delivery for unused items in
        original packaging.
      </p>
      <p>
        Start a return via <Link href="/contact">Contact</Link>. For order
        issues, include the checkout email.
      </p>
      <p>We do not accept:</p>
      <ul>
        <li>worn grinding heads</li>
        <li>returns with no prior contact</li>
        <li>refused packages without notice</li>
      </ul>
    </PolicyPage>
  );
}
