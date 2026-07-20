"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative pt-28 pb-36 overflow-hidden"
      aria-label={`${title} — page header`}
    >
      {/* Rich layered background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #dbeafe 0%, #f0f4ff 35%, #ede9fe 65%, #dbeafe 100%)",
          }}
        />
        {/* Large ambient blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full bg-blue-200/55 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-violet-200/45 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-sky-200/35 blur-[90px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(96,165,250,0.70) 25%, rgba(99,102,241,0.60) 50%, rgba(96,165,250,0.70) 75%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border shadow-md"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(96,165,250,0.30)",
                boxShadow: "0 4px 20px rgba(30,58,138,0.10), 0 1px 0 rgba(255,255,255,0.90)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                aria-hidden="true"
              />
              <span className="type-eyebrow">{eyebrow}</span>
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="type-h1 mb-7"
          style={{ textShadow: "0 2px 20px rgba(30,58,138,0.06)" }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="type-body max-w-2xl mx-auto text-slate-500"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative floating elements */}
        <div className="absolute -right-8 top-12 w-24 h-24 rounded-full bg-sky-200/30 blur-2xl float-slow" aria-hidden="true" />
        <div className="absolute -left-8 bottom-8 w-20 h-20 rounded-full bg-violet-200/30 blur-xl float-slow-rev" aria-hidden="true" />
      </div>

      {/* Bottom wave — seamlessly blends into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path fill="#FAFCFF" d="M0,25 C240,70 480,0 720,35 C960,70 1200,10 1440,35 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  );
}
