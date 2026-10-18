import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send PawQuiet a note. We reply within 1–2 business days. Include the checkout email for order issues.",
};

export default function ContactPage() {
  return (
    <PolicyPage eyebrow="PawQuiet" title="Contact">
      <p>We reply within 1–2 business days.</p>
      <p>For order issues, include the checkout email.</p>
      <ContactForm />
    </PolicyPage>
  );
}
