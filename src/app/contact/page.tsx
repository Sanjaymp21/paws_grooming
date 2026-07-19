import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SST Groomers in Coimbatore. Call, email, or visit us at 12 Park Road. Mon–Sat 9 AM–7 PM, Sun 10 AM–4 PM.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We're Here to Help"
        subtitle="Have questions about grooming styles, pricing, or your pet's specific needs? Reach out — we'll respond quickly."
      />
      <Contact />
      <Faq />
    </>
  );
}
