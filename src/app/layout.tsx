import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import PageTransition from "@/components/ui/PageTransition";
import BackgroundDecorations from "@/components/ui/BackgroundDecorations";
import CursorPawTrail from "@/components/ui/CursorPawTrail";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SST Groomers | Premium Pet Grooming — Coimbatore",
    template: "%s | SST Groomers Coimbatore",
  },
  description:
    "Coimbatore's trusted neighborhood pet grooming salon. Certified groomers, 100% hygienic environment, pet-safe products, and premium spa packages for dogs and cats.",
  keywords: [
    "pet grooming Coimbatore",
    "dog grooming Coimbatore",
    "cat grooming Coimbatore",
    "pet spa Coimbatore",
    "SST Groomers",
    "pet salon Tamil Nadu",
  ],
  openGraph: {
    title: "SST Groomers | Premium Pet Grooming — Coimbatore",
    description: "Safe, hygienic, and gentle grooming for your beloved pets.",
    siteName: "SST Groomers",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter min-h-screen flex flex-col text-slate-900 antialiased relative`}
      >
        {/* Skipping to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        {/* Global Premium Background Layers */}
        <BackgroundDecorations />

        <Navbar />

        <main id="main-content" className="flex-1 flex flex-col pt-24 relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
        <AIAssistant />
        <CursorPawTrail />
      </body>
    </html>
  );
}
