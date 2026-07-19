import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentTracker from "@/components/AppointmentTracker";
import PetHealthDashboard from "@/components/PetHealthDashboard";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Book a Grooming Appointment",
  description:
    "Book your pet's grooming session at SST Groomers Coimbatore. Choose a package, pick a date and time, and receive instant SMS confirmation.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book Your Pet's Session"
        subtitle="Choose your preferred package and timeslot. We'll send a confirmation SMS immediately. Cancellations accepted up to 12 hours in advance."
      />
      <AppointmentForm />
      <AppointmentTracker />
      <PetHealthDashboard />
    </>
  );
}
