import type { Metadata } from "next";
import CommunityImpact from "@/components/CommunityImpact";
import BusinessInsights from "@/components/BusinessInsights";
import PageHero from "@/components/ui/PageHero";
import AboutStory from "@/components/AboutStory";

export const metadata: Metadata = {
  title: "About SST Groomers",
  description:
    "Learn the story behind SST Groomers — Coimbatore's trusted neighborhood pet salon, built on certified expertise, transparency, and genuine love for animals.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About SST Groomers"
        subtitle="We are a passionate team of certified pet groomers in the heart of Coimbatore, dedicated to making every grooming session a calm, safe, and joyful experience."
      />
      <AboutStory />
      <section className="py-20 bg-sky-50/40 border-t border-sky-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <p className="type-eyebrow">Transparency</p>
            <h2 className="type-h1">Live Business & Community Updates</h2>
            <p className="type-body max-w-xl mx-auto">
              We believe in open-concept transparency. Here are today&apos;s live stats and our local community rescue updates.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <BusinessInsights />
            <CommunityImpact />
          </div>
        </div>
      </section>
    </>
  );
}
