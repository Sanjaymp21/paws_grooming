import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Pet Grooming Gallery",
  description:
    "Browse our photo gallery of happy groomed pets, styling sessions, and our clean salon interior at SST Groomers Coimbatore.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="See the Transformations"
        subtitle="Real pets, real results. Browse before-and-after transformations and snapshots from our Coimbatore salon."
      />
      <BeforeAfter />
      <Gallery />
    </>
  );
}
