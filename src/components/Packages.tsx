"use client";

import React from "react";
import { Check, Clock, Sparkles, ArrowRight, Star } from "lucide-react";
import { groomingPackages } from "../utils/mockData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const cardConfig = [
  {
    gradient: "from-slate-700 to-slate-900",
    stripe: "from-slate-400 via-slate-500 to-slate-600",
    glow: "rgba(71,85,105,0.35)",
    outerGlow: "rgba(71,85,105,0.15)",
    checkBg: "bg-slate-600/25",
    checkText: "text-slate-200",
    tagBg: "bg-slate-700/60",
    tagText: "text-slate-300",
    label: "Essential",
  },
  {
    gradient: "from-[#1d4ed8] via-[#1E4FD8] to-[#1E3A8A]",
    stripe: "from-sky-300 via-blue-400 to-indigo-500",
    glow: "rgba(29,78,216,0.50)",
    outerGlow: "rgba(29,78,216,0.22)",
    checkBg: "bg-sky-400/20",
    checkText: "text-sky-200",
    tagBg: "bg-sky-400/20",
    tagText: "text-sky-200",
    label: "Most Popular",
  },
  {
    gradient: "from-violet-700 via-purple-700 to-indigo-800",
    stripe: "from-violet-300 via-purple-400 to-indigo-400",
    glow: "rgba(109,40,217,0.40)",
    outerGlow: "rgba(109,40,217,0.18)",
    checkBg: "bg-violet-500/20",
    checkText: "text-violet-200",
    tagBg: "bg-violet-500/20",
    tagText: "text-violet-200",
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
    <section className="py-28 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #EEF6FF 0%, #F5F3FF 50%, #EEF2FF 100%)",
          }}
        />
        <div className="absolute top-0 right-0 w-[700px] h-[600px] rounded-full bg-sky-200/35 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="section-top-line absolute" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="type-eyebrow">Pricing Plans</p>
          <h2 className="type-h1 mt-2 mb-5">Tailored Grooming Packages</h2>
          <p className="type-body text-slate-500">
            Choose the perfect care session for your pet. We use 100% natural, hypoallergenic shampoos and sterilize all tools between every treatment.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 items-stretch">
          {groomingPackages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;
            const cfg = cardConfig[idx];
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.60, delay: idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className={`relative ${isPopular ? "md:-mt-6 md:-mb-6 z-10" : ""}`}
              >
                {/* Popular animated gradient ring */}
                {isPopular && (
                  <div
                    className="absolute -inset-[2px] rounded-[36px] z-0"
                    style={{
                      background: `linear-gradient(135deg, #60A5FA, #1E3A8A, #818cf8, #60A5FA)`,
                      backgroundSize: "300% 300%",
                      animation: "border-spin-slow 5s linear infinite",
                      opacity: 0.95,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Card */}
                <div
                  className={`relative h-full flex flex-col rounded-[34px] overflow-hidden bg-gradient-to-b ${cfg.gradient} z-10`}
                  style={{
                    boxShadow: isPopular
                      ? `0 40px 100px ${cfg.glow}, 0 12px 36px rgba(0,0,0,0.20)`
                      : `0 16px 56px ${cfg.outerGlow}, 0 4px 16px rgba(0,0,0,0.10)`,
                  }}
                >
                  {/* Shimmer top stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cfg.stripe}`} aria-hidden="true" />

                  {/* Shine overlay */}
                  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div
                      className="absolute top-0 left-0 right-0 h-1/3"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Inner content */}
                  <div className="relative p-8 sm:p-9 flex flex-col h-full">

                    {/* Popular badge */}
                    {isPopular && (
                      <div
                        className="absolute top-7 right-7 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.16)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.22)",
                        }}
                      >
                        <Star className="h-3 w-3 text-amber-300 fill-amber-300" aria-hidden="true" />
                        <span className="text-[10px] font-bold font-poppins text-white uppercase tracking-wider">Most Popular</span>
                      </div>
                    )}

                    {/* Label chip */}
                    <div className="mb-5">
                      <span
                        className="text-[10px] font-bold font-poppins uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.70)" }}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    {/* Header */}
                    <div className="mb-7">
                      <h3 className="font-poppins font-bold text-[22px] text-white mb-2">{pkg.name}</h3>
                      <p className="text-[13px] font-inter leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                        {pkg.recommendedFor}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 flex items-end gap-1.5">
                      <span className="text-[3rem] font-poppins font-extrabold text-white leading-none tabular-nums">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-[13px] mb-2.5 font-inter" style={{ color: "rgba(255,255,255,0.50)" }}>/session</span>
                    </div>

                    {/* Duration chip */}
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl ${cfg.tagBg} mb-8 w-fit`}
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <Clock className={`h-3.5 w-3.5 ${cfg.tagText}`} aria-hidden="true" />
                      <span className={`text-[12px] font-semibold font-poppins ${cfg.tagText}`}>{pkg.duration}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 mb-7" />

                    {/* Features */}
                    <ul className="space-y-4 flex-1 mb-9">
                      {pkg.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.30, delay: fIdx * 0.06 }}
                          className="flex items-start gap-3.5"
                        >
                          <div
                            className={`mt-0.5 w-5 h-5 rounded-full ${cfg.checkBg} flex items-center justify-center shrink-0`}
                            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                          >
                            <Check className={`h-3 w-3 stroke-[3px] ${cfg.checkText}`} />
                          </div>
                          <span className="text-[14px] font-inter leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 380, damping: 20 }}
                      onClick={() => handleSelectPackage(pkg.name)}
                      className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-poppins font-bold text-[14px] transition-all duration-200 ${
                        isPopular
                          ? "bg-white text-[#1E3A8A] shadow-2xl hover:shadow-[0_8px_40px_rgba(255,255,255,0.35)]"
                          : "bg-white/14 text-white border border-white/22 hover:bg-white/22"
                      }`}
                      style={isPopular ? { boxShadow: "0 8px 32px rgba(255,255,255,0.20)" } : {}}
                    >
                      {isPopular && <Sparkles className="h-4 w-4 text-sky-500" aria-hidden="true" />}
                      Book Now
                      {!isPopular && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    </motion.button>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-[13.5px] text-slate-400 font-inter">
            All sessions include a complimentary wellness assessment. Prices inclusive of all products.{" "}
            <span className="text-emerald-600 font-semibold">No hidden charges.</span>
          </p>
        </motion.div>

      </div>

      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
