import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServicesOverview from "@/components/ServicesOverview";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata: Metadata = {
  title: "Pet Grooming Services",
  description:
    "Discover the full range of pet grooming services at SST Groomers Coimbatore — dog grooming, cat grooming, nail trimming, ear cleaning, spa baths, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Our Grooming Services"
        subtitle="Comprehensive dog and cat grooming services using pet-safe, hypoallergenic products — tailored to every breed and coat type."
      />
      <ServicesOverview />
      <BeforeAfter />
    </>
  );
}
