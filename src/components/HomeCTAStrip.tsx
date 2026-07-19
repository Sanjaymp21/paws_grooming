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
    glowColor: "rgba(99,102,241,0.25)",
    accent: "#60A5FA",
    tag: "Starting ₹799",
  },
  {
    icon: Star,
    eyebrow: "4.9 ★ Google Rated",
    title: "Why Coimbatore Loves Us",
    desc: "230+ verified reviews from local pet parents who bring their beloved pets back session after session.",
    href: "/reviews",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(251,146,60,0.25)",
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
    glowColor: "rgba(20,184,166,0.25)",
    accent: "#10B981",
    tag: "Mon–Sun Open",
  },
];

export default function HomeCTAStrip() {
  return (
    <section aria-label="Quick navigation" className="py-24 bg-gradient-to-b from-sky-50/40 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-[500px] h-[400px] rounded-full bg-sky-100/30 blur-3xl" />
        <div className="absolute left-0 bottom-0 w-[400px] h-[350px] rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="type-eyebrow mb-2">Everything You Need</p>
          <h2 className="type-h2">Your Complete Pet Care Hub</h2>
          <p className="type-small mt-3 max-w-lg mx-auto">
            Packages, reviews, and appointment booking — all at your fingertips.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22,1,0.36,1] }}
            >
              <Link
                href={tile.href}
                className="group relative flex flex-col gap-5 p-7 rounded-[28px] bg-white border border-slate-100 hover:border-slate-200 card-hover overflow-hidden h-full shadow-sm hover:shadow-xl transition-shadow duration-300"
                style={{ boxShadow: `0 2px 16px rgba(30,58,138,0.05)` }}
              >
                {/* Gradient top stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tile.gradient} opacity-80`} aria-hidden="true" />

                {/* Glow background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 60% 60% at 30% 30%, ${tile.glowColor}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <tile.icon className="h-5 w-5" />
                </div>

                <div className="flex-1 relative z-10">
                  <p className="type-eyebrow mb-1" style={{ color: tile.accent }}>{tile.eyebrow}</p>
                  <h3 className="type-h3 mb-2 group-hover:text-[#1d4ed8] transition-colors duration-200">{tile.title}</h3>
                  <p className="type-small">{tile.desc}</p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="chip text-[10px]">
                    <Sparkles className="h-2.5 w-2.5" />
                    {tile.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#60A5FA] font-poppins group-hover:gap-2 transition-all duration-150">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
