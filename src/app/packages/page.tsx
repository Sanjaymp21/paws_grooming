import type { Metadata } from "next";
import Packages from "@/components/Packages";
import Membership from "@/components/Membership";
import AIRecommendation from "@/components/AIRecommendation";
import RewardsDashboard from "@/components/RewardsDashboard";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Grooming Packages & Pricing",
  description:
    "Explore SST Groomers' tailored grooming packages — Basic, Premium, and Luxury Spa. All packages use 100% natural, hypoallergenic products. Book online today.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing Plans"
        title="Find the Perfect Package"
        subtitle="From routine hygiene to a full luxury spa day — we have a session tailored to your pet's coat type, temperament, and needs."
      />
      <Packages />
      <AIRecommendation />
      <Membership />
      <RewardsDashboard />
    </>
  );
}
