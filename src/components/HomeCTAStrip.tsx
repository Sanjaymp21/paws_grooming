"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Star, Calendar, ArrowRight, Sparkles } from "lucide-react";

const tiles = [
  {
    icon: Scissors,
    eyebrow: "3 Service Tiers",
    title: "Grooming Packages",
    desc: "Basic, Premium & Luxury Spa — carefully tailored to your pet's unique coat type and temperament.",
    href: "/packages",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    glowColor: "rgba(99,102,241,0.20)",
    glowBorder: "rgba(99,102,241,0.18)",
    accent: "#3b82f6",
    tag: "Starting ₹799",
  },
  {
    icon: Star,
    eyebrow: "4.9 ★ Google Rated",
    title: "Why Coimbatore Loves Us",
    desc: "230+ verified reviews from local pet parents who bring their beloved pets back session after session.",
    href: "/reviews",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(251,146,60,0.20)",
    glowBorder: "rgba(251,146,60,0.18)",
    accent: "#F59E0B",
    tag: "230+ Reviews",
  },
  {
    icon: Calendar,
    eyebrow: "60-Min Avg · Quick Booking",
    title: "Book a Session Today",
    desc: "Reserve your preferred slot in seconds. Flexible timings, instant SMS confirmation, easy rescheduling.",
    href: "/book",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glowColor: "rgba(20,184,166,0.20)",
    glowBorder: "rgba(20,184,166,0.18)",
    accent: "#10B981",
    tag: "Mon–Sun Open",
  },
];

export default function HomeCTAStrip() {
  return (
    <section
      aria-label="Quick navigation"
      className="py-28 relative overflow-hidden"
    >
      {/* Premium background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(165deg, #F8FBFF 0%, #EEF6FF 40%, #F5F3FF 70%, #F0F9FF 100%)",
          }}
        />
        <div className="absolute right-0 top-0 w-[600px] h-[500px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[450px] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute center-0 top-1/2 w-[400px] h-[400px] rounded-full bg-blue-100/25 blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Top line */}
      <div className="section-top-line absolute" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <p className="type-eyebrow">Everything You Need</p>
          <h2 className="type-h1 mt-2 mb-5">Your Complete Pet Care Hub</h2>
          <p className="type-body text-slate-500">
            Packages, reviews, and appointment booking — all designed around your pet&apos;s comfort.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-7">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={tile.href}
                className="group relative flex flex-col gap-6 p-8 rounded-[28px] card-hover overflow-hidden h-full"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(28px)",
                  border: `1px solid ${tile.glowBorder}`,
                  boxShadow: `0 8px 40px ${tile.glowColor}, 0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
                }}
              >
                {/* Gradient top stripe */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${tile.gradient} opacity-90`} aria-hidden="true" />

                {/* Glow background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 70% at 25% 25%, ${tile.glowColor}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-250`}
                  style={{ boxShadow: `0 8px 28px ${tile.glowColor}` }}
                >
                  <tile.icon className="h-6 w-6" />
                </div>

                <div className="flex-1 relative z-10">
                  <p className="type-eyebrow mb-1.5" style={{ color: tile.accent }}>{tile.eyebrow}</p>
                  <h3 className="type-h3 mb-3 group-hover:text-[#1d4ed8] transition-colors duration-200">{tile.title}</h3>
                  <p className="type-small">{tile.desc}</p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="chip text-[10px]">
                    <Sparkles className="h-2.5 w-2.5" />
                    {tile.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-bold font-poppins group-hover:gap-2 transition-all duration-150" style={{ color: tile.accent }}>
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
