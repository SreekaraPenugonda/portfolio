import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sreekara Penugonda. I'm open to new opportunities, collaborations, and conversations.",
  alternates: { canonical: "https://sreekara.dev/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-14">
      <ContactSection />
    </div>
  );
}