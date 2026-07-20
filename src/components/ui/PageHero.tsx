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
      className="relative pt-24 pb-32 overflow-hidden z-10 bg-yellow-400"
      aria-label={`${title} — page header`}
    >
      {/* Aurora Radial Ambient Glow removed for flat yellow theme */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow badge style */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border"
              style={{
                background: "#FEFCE8",
                borderColor: "#FDE047",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs tracking-wider font-semibold text-black uppercase font-poppins">{eyebrow}</span>
            </span>
          </motion.div>
        )}

        {/* Title: 68px scale, Inter 800 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="type-hero-title mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle: 22px scale, Inter 500 */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="type-hero-subtitle max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Subtle Separator wave line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200/50 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
