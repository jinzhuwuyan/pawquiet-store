import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";
import { PRODUCT } from "@/lib/product";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "US-only shipping through dropship partners. Most U.S. orders arrive in 7–15 business days after fulfillment.",
};

export default function ShippingPage() {
  return (
    <PolicyPage eyebrow="PawQuiet" title="Shipping">
      <p>
        PawQuiet ships through dropship partners. Shipping is US-only.
      </p>
      <p>{PRODUCT.shippingNote}.</p>
      <p>
        Most U.S. orders arrive in 7–15 business days after fulfillment.
        Tracking is emailed after fulfillment.
      </p>
      <p>
        If you need delivery outside the United States,{" "}
        <Link href="/contact">contact us</Link> before ordering elsewhere.
      </p>
    </PolicyPage>
  );
}
