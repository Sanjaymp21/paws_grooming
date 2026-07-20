"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight, Star, MapPin } from "lucide-react";

const badges = [
  { icon: Award, label: "Certified Groomers", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", glow: "rgba(245,158,11,0.15)" },
  { icon: ShieldCheck, label: "Pet-Safe Products", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", glow: "rgba(16,185,129,0.15)" },
  { icon: Sparkles, label: "Sanitized Equipment", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100", glow: "rgba(14,165,233,0.15)" },
  { icon: Heart, label: "Friendly Staff", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", glow: "rgba(244,63,94,0.15)" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const container: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10 } },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const item: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      aria-label="Welcome to SST Groomers"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
    >
      {/* ── Premium layered mesh background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #EEF6FF 0%, #F8FAFF 40%, #EEF2FF 70%, #F0F9FF 100%)",
          }}
        />
        {/* Large ambient blobs */}
        <div className="absolute top-0 right-0 w-[900px] h-[800px] rounded-full bg-sky-200/55 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[600px] rounded-full bg-indigo-200/40 blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-100/35 blur-[120px]" />
        {/* Extra depth blob */}
        <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-100/30 blur-[90px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative w-full">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-8 items-center">

          {/* ── Left Content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 text-left space-y-8"
          >
            {/* Location pill */}
            <motion.div variants={item}>
              <span
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full font-bold font-poppins tracking-wide text-[11px]"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(96,165,250,0.30)",
                  color: "#1E3A8A",
                  boxShadow: "0 4px 20px rgba(30,58,138,0.10), 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <MapPin className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                Coimbatore&apos;s Premier Pet Grooming Salon
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="space-y-3">
              <h1 className="type-display max-w-2xl" style={{ textShadow: "0 2px 24px rgba(30,58,138,0.06)" }}>
                Gentle Grooming
                <br />
                <span className="relative">
                  <span className="gradient-text">with Love</span>
                  {/* Underline decoration */}
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.3, delay: 0.8, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 9 Q75 3 150 9 Q225 15 298 7"
                      stroke="url(#blue-grad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.3, delay: 0.8 }}
                    />
                    <defs>
                      <linearGradient id="blue-grad" x1="0" y1="0" x2="300" y2="0">
                        <stop stopColor="#60A5FA" />
                        <stop offset="0.5" stopColor="#6366f1" />
                        <stop offset="1" stopColor="#1E3A8A" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                {" & Care"}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={item} className="type-body max-w-lg" style={{ color: "#4B5E80" }}>
              Safe, hygienic, and completely stress-free grooming for your beloved pets — at our trusted{" "}
              <span className="font-semibold text-[#1E3A8A]">single neighbourhood salon</span>{" "}in Coimbatore.
              No cages, no strangers, just warmth.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <Link href="/book" className="btn-primary shine">
                <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                Book Appointment
              </Link>
              <Link href="/packages" className="btn-secondary group">
                View Packages
                <ArrowRight className="h-4 w-4 text-sky-500 group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Rating bar */}
            <motion.div variants={item} className="flex items-center gap-4 pt-1">
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(96,165,250,0.20)",
                  boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
                }}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1E3A8A] font-poppins">4.9 / 5</span>
                <span className="text-xs text-slate-400 font-inter">230+ reviews</span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2.5 p-3.5 rounded-2xl card-hover cursor-default border ${badge.border}`}
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 4px 20px ${badge.glow}, 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.90)`,
                  }}
                >
                  <div className={`p-2 rounded-xl ${badge.bg} ${badge.color} shrink-0`} aria-hidden="true">
                    <badge.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1E3A8A] font-poppins leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Visuals ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
            {/* Glowing ring decorations */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-[400px] h-[400px] rounded-full border border-sky-200/35 animate-[spin_25s_linear_infinite]" />
              <div className="absolute w-[470px] h-[470px] rounded-full border border-dashed border-sky-100/30 animate-[spin_38s_linear_infinite_reverse]" />
              {/* Center glow */}
              <div className="absolute w-[320px] h-[320px] rounded-full bg-sky-200/20 blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.90 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[420px] h-[460px]"
            >
              {/* Dog card */}
              <motion.div
                initial={{ rotate: -7, x: -10 }}
                animate={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.05, z: 10 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute left-0 top-6 w-[62%] rounded-[28px] overflow-hidden z-20 cursor-default"
                style={{
                  boxShadow: "0 24px 72px rgba(30,58,138,0.18), 0 6px 20px rgba(0,0,0,0.10)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-sky-50 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=700&h=875&fit=crop"
                    alt="Happy golden retriever Rocky freshly groomed at SST Groomers"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent" />
                  <div
                    className="absolute bottom-3 inset-x-3 py-2 px-3 rounded-xl flex justify-between items-center"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div>
                      <span className="font-poppins font-bold text-xs text-[#1E3A8A] block">Rocky</span>
                      <span className="text-[9px] text-slate-400 font-inter">Golden Retriever</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[9px] font-bold shadow-sm">
                      Groomed ✓
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Cat card */}
              <motion.div
                initial={{ rotate: 8, x: 10 }}
                animate={{ rotate: 6 }}
                whileHover={{ rotate: 0, scale: 1.05, z: 10 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute right-0 bottom-6 w-[55%] rounded-[28px] overflow-hidden z-10 cursor-default"
                style={{
                  boxShadow: "0 20px 60px rgba(30,58,138,0.16), 0 4px 16px rgba(0,0,0,0.09)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="aspect-square overflow-hidden bg-sky-50 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop"
                    alt="Fluffy Persian cat Milo post-spa at SST Groomers"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
                  <div
                    className="absolute bottom-3 inset-x-3 py-2 px-3 rounded-xl flex justify-between items-center"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div>
                      <span className="font-poppins font-bold text-xs text-[#1E3A8A] block">Milo</span>
                      <span className="text-[9px] text-slate-400 font-inter">Persian Cat</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-[9px] font-bold shadow-sm">
                      Spa ✓
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating pill — safe care */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-4 z-30"
                aria-hidden="true"
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(16,185,129,0.20)",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">✓</div>
                  <span className="text-[11px] font-bold text-[#1E3A8A] font-poppins">100% Safe Care</span>
                </div>
              </motion.div>

              {/* Floating pill — rating */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 z-30"
                aria-hidden="true"
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(245,158,11,0.20)",
                    boxShadow: "0 8px 28px rgba(245,158,11,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">★</div>
                  <span className="text-[11px] font-bold text-[#1E3A8A] font-poppins">4.9 Google Rating</span>
                </div>
              </motion.div>

              {/* Floating pill — Coimbatore */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-6 z-30"
                aria-hidden="true"
              >
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(96,165,250,0.25)",
                    boxShadow: "0 6px 20px rgba(96,165,250,0.18), 0 2px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <MapPin className="h-3.5 w-3.5 text-sky-500" />
                  <span className="text-[10px] font-bold text-[#1E3A8A] font-poppins">Coimbatore</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path fill="rgba(240,249,255,0.65)" d="M0,35 C360,0 1080,70 1440,25 L1440,70 L0,70 Z" />
          <path fill="rgba(248,252,255,0.45)" d="M0,50 C480,20 960,70 1440,45 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  );
}
