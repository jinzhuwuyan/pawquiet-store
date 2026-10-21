import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "US-only shipping. Classic, Duo, and Lite arrive in about 7–15 business days. Factory 5-Speed arrives in about 10–20 business days.",
};

export default function ShippingPage() {
  return (
    <PolicyPage eyebrow="PawQuiet" title="Shipping">
      <p>
        PawQuiet ships through dropship partners. Shipping is US-only.
      </p>
      <p>
        PawQuiet Classic 5-Speed, PawQuiet Duo Clip+Grind, and PawQuiet Lite
        Green ship to the US in about 7–15 business days.
      </p>
      <p>
        PawQuiet Factory 5-Speed ships to the US in about 10–20 business days.
      </p>
      <p>Tracking is emailed after fulfillment.</p>
      <p>
        If you need delivery outside the United States,{" "}
        <Link href="/contact">contact us</Link> before ordering elsewhere.
      </p>
    </PolicyPage>
  );
}
