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
    gradient: "from-sky-blue to-royal-blue",
    glowColor: "rgba(37,99,235,0.06)",
    glowBorder: "rgba(37,99,235,0.12)",
    accent: "#000000",
    tag: "Starting ₹799",
  },
  {
    icon: Star,
    eyebrow: "4.9 ★ Google Rated",
    title: "Why Coimbatore Loves Us",
    desc: "230+ verified reviews from local pet parents who bring their beloved pets back session after session.",
    href: "/reviews",
    gradient: "from-pink-custom to-coral-custom",
    glowColor: "rgba(236,72,153,0.06)",
    glowBorder: "rgba(236,72,153,0.12)",
    accent: "#EC4899",
    tag: "230+ Reviews",
  },
  {
    icon: Calendar,
    eyebrow: "60-Min Avg · Quick Booking",
    title: "Book a Session Today",
    desc: "Reserve your preferred slot in seconds. Flexible timings, instant SMS confirmation, easy rescheduling.",
    href: "/book",
    gradient: "from-mint-green to-indigo-custom",
    glowColor: "rgba(52,211,153,0.06)",
    glowBorder: "rgba(52,211,153,0.12)",
    accent: "#34D399",
    tag: "Mon–Sun Open",
  },
];

export default function HomeCTAStrip() {
  return (
    <section
      aria-label="Quick navigation"
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="section-top-line absolute" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="type-eyebrow">Explore SST Groomers</span>
          <h2 className="type-section-heading mt-2.5 mb-4">Your Complete Pet Care Hub</h2>
          <p className="type-section-subtitle max-w-xl mx-auto">
            Review packages, check rating metrics, and book your custom slots in minutes.
          </p>
        </motion.div>

        {/* Tiles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link
                href={tile.href}
                className="group relative flex flex-col gap-6 p-8 rounded-[24px] glass-card card-hover overflow-hidden h-full text-slate-800"
                style={{
                  border: `1px solid ${tile.glowBorder}`,
                  boxShadow: `0 15px 45px ${tile.glowColor}, inset 0 1px 0 rgba(255,255,255,0.7)`,
                  textDecoration: "none",
                }}
              >
                {/* Thin top gradient indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tile.gradient}`} aria-hidden="true" />

                {/* Ambient glow highlight on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 10% 10%, ${tile.glowColor}, transparent 80%)` }}
                  aria-hidden="true"
                />

                {/* Icon wrapper */}
                <div
                  className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                  style={{ width: "3.25rem", height: "3.25rem" }}
                >
                  <tile.icon className="h-6 w-6" />
                </div>

                {/* Header text */}
                <div className="flex-grow space-y-2">
                  <span className="type-eyebrow text-xs block" style={{ color: tile.accent }}>
                    {tile.eyebrow}
                  </span>
                  <h3 className="type-card-title text-slate-900 group-hover:text-zinc-900 transition-colors duration-200">
                    {tile.title}
                  </h3>
                  <p className="type-small text-slate-500 text-sm leading-relaxed">
                    {tile.desc}
                  </p>
                </div>

                {/* Footer details inside card */}
                <div className="flex items-center justify-between pt-2">
                  <span className="chip font-semibold text-[11px]">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    {tile.tag}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[13px] font-bold group-hover:gap-2 transition-all duration-200"
                    style={{ color: tile.accent }}
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
