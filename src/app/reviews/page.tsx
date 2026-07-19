import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import TrustDashboard from "@/components/TrustDashboard";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Customer Reviews & Ratings",
  description:
    "Read verified reviews from Coimbatore pet owners about their experience at SST Groomers. 4.9 stars, 230+ reviews, 91% repeat customers.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trusted by Coimbatore"
        title="What Pet Parents Say"
        subtitle="230+ verified local reviews from dog and cat owners who choose SST Groomers session after session."
      />
      <TrustDashboard />
      <Testimonials />
    </>
  );
}
