import type { Metadata } from "next";
import SafetyDashboard from "@/components/SafetyDashboard";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Safety & Hygiene Standards",
  description:
    "Discover the rigorous safety and hygiene protocols SST Groomers follows every day — autoclaved tools, UV disinfection, pet-safe products, and daily checklists.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety & Hygiene"
        title="Your Pet's Safety is Our Standard"
        subtitle="We follow medical-grade hygiene protocols daily. Every tool is sterilized, every surface sanitized, and every groomer is trained in fear-free handling."
      />
      <SafetyDashboard />
    </>
  );
}
