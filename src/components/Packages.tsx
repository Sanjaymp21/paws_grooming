"use client";

import React from "react";
import { Check, Clock, Sparkles, ArrowRight, Star } from "lucide-react";
import { groomingPackages } from "../utils/mockData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const cardConfig = [
  {
    gradient: "from-white to-slate-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    borderColor: "border-slate-200",
    shadowColor: "rgba(0,0,0,0.04)",
    stripe: "from-yellow-400 to-blue-500",
    checkBg: "bg-yellow-50",
    checkText: "text-zinc-900",
    tagBg: "bg-yellow-50",
    tagText: "text-zinc-900",
    btnStyle: "bg-slate-900 text-white hover:bg-slate-800",
    label: "Essential",
  },
  {
    gradient: "from-blue-600 to-indigo-950",
    textPrimary: "text-white",
    textSecondary: "text-slate-300",
    borderColor: "border-blue-500/20",
    shadowColor: "rgba(37,99,235,0.15)",
    stripe: "from-sky-300 via-blue-400 to-indigo-400",
    checkBg: "bg-yellow-500/20",
    checkText: "text-yellow-100",
    tagBg: "bg-yellow-500/25",
    tagText: "text-sky-200",
    btnStyle: "bg-white text-zinc-900 hover:bg-slate-50",
    label: "Most Popular",
  },
  {
    gradient: "from-indigo-900 to-slate-900",
    textPrimary: "text-white",
    textSecondary: "text-slate-400",
    borderColor: "border-indigo-500/20",
    shadowColor: "rgba(99,102,241,0.12)",
    stripe: "from-indigo-400 via-purple-400 to-pink-500",
    checkBg: "bg-yellow-1000/20",
    checkText: "text-indigo-300",
    tagBg: "bg-yellow-1000/25",
    tagText: "text-indigo-200",
    btnStyle: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
    label: "Premium",
  },
];

export default function Packages() {
  const router = useRouter();

  const handleSelectPackage = (packageName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected-package", packageName);
      const event = new CustomEvent("select-package", { detail: { packageName } });
      window.dispatchEvent(event);
    }
    router.push("/book");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="section-top-line absolute" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <span className="type-eyebrow">Pricing Plans</span>
          <h2 className="type-section-heading mt-2.5 mb-4">Tailored Grooming Packages</h2>
          <p className="type-section-subtitle max-w-xl mx-auto">
            Find the right level of care for your dog or cat. All options utilize 100% natural, hypoallergenic products.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {groomingPackages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;
            const cfg = cardConfig[idx];
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative ${isPopular ? "md:-mt-4 md:-mb-4 z-10" : ""}`}
              >
                {/* Popular animated outer border glow */}
                {isPopular && (
                  <div
                    className="absolute -inset-[2px] rounded-[28px] z-0"
                    style={{
                      background: "linear-gradient(135deg, #000000, #FACC15, #EC4899, #000000)",
                      backgroundSize: "300% 300%",
                      animation: "border-spin-slow 6s linear infinite",
                      opacity: 0.85,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Card Container */}
                <div
                  className={`relative h-full flex flex-col rounded-[26px] overflow-hidden bg-gradient-to-b ${cfg.gradient} z-10 border ${cfg.borderColor}`}
                  style={{
                    boxShadow: `0 20px 50px ${cfg.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                  }}
                >
                  {/* Shimmer top stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.stripe}`} aria-hidden="true" />

                  {/* Inner card padding */}
                  <div className="relative p-8 sm:p-9 flex flex-col h-full">

                    {/* Popular banner chip */}
                    {isPopular && (
                      <div
                        className="absolute top-7 right-7 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300" aria-hidden="true" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Popular Choice</span>
                      </div>
                    )}

                    {/* Service Level label */}
                    <div className="mb-4.5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-slate-100 text-slate-600"
                        style={isPopular ? { background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" } : {}}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    {/* Card Title & Recommended target info */}
                    <div className="mb-6">
                      <h3 className={`type-card-title font-extrabold mb-1.5 ${cfg.textPrimary}`}>
                        {pkg.name}
                      </h3>
                      <p className={`type-small text-xs leading-relaxed ${cfg.textSecondary}`}>
                        {pkg.recommendedFor}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-5 flex items-end gap-1">
                      <span className={`text-[3.25rem] font-extrabold leading-none ${cfg.textPrimary}`}>
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className={`text-xs mb-2 font-medium ${cfg.textSecondary}`}>/session</span>
                    </div>

                    {/* Duration badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${cfg.tagBg} mb-7 w-fit border border-transparent`}
                      style={isPopular ? { borderColor: "rgba(255,255,255,0.1)" } : { borderColor: "rgba(0,0,0,0.04)" }}
                    >
                      <Clock className={`h-3.5 w-3.5 ${cfg.tagText}`} aria-hidden="true" />
                      <span className={`text-xs font-semibold ${cfg.tagText}`}>{pkg.duration}</span>
                    </div>

                    {/* Divider line */}
                    <div className="border-t border-slate-200/60 mb-6" style={isPopular ? { borderColor: "rgba(255,255,255,0.1)" } : {}} />

                    {/* Feature bullet items */}
                    <ul className="space-y-3.5 flex-grow mb-8">
                      {pkg.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: fIdx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded-full ${cfg.checkBg} flex items-center justify-center shrink-0`}>
                            <Check className={`h-3 w-3 stroke-[3px] ${cfg.checkText}`} />
                          </div>
                          <span className={`type-small text-sm leading-snug ${cfg.textPrimary} opacity-90`}>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Card Booking CTA button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectPackage(pkg.name)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${cfg.btnStyle}`}
                      style={isPopular ? { boxShadow: "0 8px 24px rgba(255,255,255,0.15)" } : {}}
                    >
                      {isPopular && <Sparkles className="h-4 w-4 text-sky-400" aria-hidden="true" />}
                      Book Session
                    </motion.button>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer trust notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="type-small text-slate-400 text-sm">
            Complimentary grooming assessment included with every package.{" "}
            <span className="text-emerald-500 font-semibold">No hidden fees.</span>
          </p>
        </motion.div>

      </div>

      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
