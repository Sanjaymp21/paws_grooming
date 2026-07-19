"use client";

import React from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import { groomingPackages } from "../utils/mockData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Packages() {
  const router = useRouter();

  const handleSelectPackage = (packageName: string) => {
    // Save selected package so AppointmentForm can pre-select it
    if (typeof window !== "undefined") {
      localStorage.setItem("selected-package", packageName);
      // Also dispatch custom event for same-page use
      const event = new CustomEvent("select-package", { detail: { packageName } });
      window.dispatchEvent(event);
    }
    // Navigate to the booking page
    router.push("/book");
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="type-eyebrow">Pricing Plans</p>
          <h2 className="type-h1">Tailored Grooming Packages</h2>
          <p className="type-body max-w-2xl mx-auto">
            Choose the perfect care session for your pet. We use 100% natural, hypoallergenic shampoos and sterilize all tools between every treatment.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {groomingPackages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? "bg-gradient-to-b from-[#1E3A8A] to-[#0f1d4a] text-white shadow-2xl shadow-[#1E3A8A]/20 z-10 scale-[1.02]"
                    : "glass-card text-slate-800 border border-sky-100/60 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider font-poppins">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Name */}
                  <h4 className={`text-xl font-poppins font-bold ${isPopular ? "text-white" : "text-navy-blue"}`}>
                    {pkg.name}
                  </h4>
                  
                  {/* Recommended For */}
                  <p className={`text-xs mt-1.5 ${isPopular ? "text-sky-200" : "text-slate-gray"} font-inter min-h-[32px]`}>
                    {pkg.recommendedFor}
                  </p>

                  {/* Price */}
                  <div className="my-6 flex items-baseline">
                    <span className="text-3xl font-poppins font-extrabold">₹{pkg.price}</span>
                    <span className={`text-xs ml-1 ${isPopular ? "text-sky-200" : "text-slate-gray"}`}>/ session</span>
                  </div>

                  {/* Duration */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/10 text-sky-400 text-xs font-semibold mb-6">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{pkg.duration}</span>
                  </div>

                  <hr className={`border-t my-6 ${isPopular ? "border-white/10" : "border-slate-100"}`} />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm font-medium">
                        <div className={`mt-0.5 rounded-full p-0.5 flex items-center justify-center ${
                          isPopular ? "bg-sky-400/20 text-sky-400" : "bg-sky-50 text-sky-500"
                        }`}>
                          <Check className="h-3.5 w-3.5 stroke-[3px]" />
                        </div>
                        <span className={isPopular ? "text-slate-200" : "text-slate-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-4 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 active:scale-98 ${
                    isPopular
                      ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg hover:shadow-sky-400/35 hover:-translate-y-0.5"
                      : "bg-navy-blue text-white shadow-sm hover:shadow-md hover:bg-[#152a65] hover:-translate-y-0.5"
                  }`}
                >
                  Book Now
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
