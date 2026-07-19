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
      className="relative pt-14 pb-20 overflow-hidden"
      aria-label={`${title} — page header`}
    >
      {/* Rich gradient mesh background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/30" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-sky-100/60 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-50/50 blur-[80px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Top line accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-300 to-transparent" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200/60 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" aria-hidden="true" />
              <span className="type-eyebrow">{eyebrow}</span>
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="type-h1 mb-5"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="type-body max-w-2xl mx-auto text-slate-500"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path fill="white" d="M0,20 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
