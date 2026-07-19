import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeStats from "@/components/HomeStats";
import HomeCTAStrip from "@/components/HomeCTAStrip";

export const metadata: Metadata = {
  title: "SST Groomers | Premium Pet Grooming — Coimbatore",
  description:
    "Coimbatore's trusted neighborhood pet grooming salon. Certified groomers, 100% hygienic, pet-safe products, stress-free care.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeStats />
      <HomeCTAStrip />
    </>
  );
}
