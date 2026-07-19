import type { Metadata } from "next";
import Faq from "@/components/Faq";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about pet grooming at SST Groomers — grooming frequency, safety, anxious pets, cat grooming, rescheduling, and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before booking your pet's grooming session at SST Groomers."
      />
      <Faq />
    </>
  );
}
