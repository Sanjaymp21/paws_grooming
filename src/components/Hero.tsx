"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight, Star, MapPin, Bone, Scissors } from "lucide-react";

// Sourcing icons and badges
const trustBadges = [
  { icon: Award, label: "Certified Groomers", color: "text-amber-500 dark:text-yellow-400", bg: "bg-amber-50 dark:bg-slate-800/80" },
  { icon: ShieldCheck, label: "Pet-Safe Products", color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-slate-800/80" },
  { icon: Sparkles, label: "Sanitized Salon", color: "text-cyan-500 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-slate-800/80" },
  { icon: Heart, label: "Stress-Free Care", color: "text-pink-500 dark:text-pink-400", bg: "bg-pink-50 dark:bg-slate-800/80" },
];

import AnimatedBones from "./AnimatedBones";

export default function Hero() {
  // Parallax Motion Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Pointer values for AnimatedBones
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax offsets (subtle for cards, background shapes, and particle drifts)
  const petCardX = useTransform(smoothMouseX, [-400, 400], [-18, 18]);
  const petCardY = useTransform(smoothMouseY, [-400, 400], [-18, 18]);
  const bgCircleX = useTransform(smoothMouseX, [-400, 400], [-25, 25]);
  const bgCircleY = useTransform(smoothMouseY, [-400, 400], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // For original parallax components
    const centerX = e.clientX - rect.left - width / 2;
    const centerY = e.clientY - rect.top - height / 2;
    mouseX.set(centerX);
    mouseY.set(centerY);

    // Absolute pointer position for AnimatedBones
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    pointerX.set(-1000);
    pointerY.set(-1000);
  };

  return (
    <section
      aria-label="Welcome to SST Groomers"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 bg-yellow-400 dark:bg-[#0B1120] transition-colors duration-500 cursor-default"
    >
      
      {/* 1. LAYER ORDER: Background Gradient (z-0) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div
          animate={{
            x: ["-10%", "15%", "-10%"],
            y: ["-5%", "10%", "-5%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.08] dark:bg-indigo-500/[0.06] blur-[130px]"
        />
      </div>

      {/* 2. LAYER ORDER: Animated Bones (z-[2]) */}
      <AnimatedBones mouseX={pointerX} mouseY={pointerY} />

      {/* 3. LAYER ORDER: Decorative Shapes (z-[3]) */}
      <motion.div 
        style={{ x: bgCircleX, y: bgCircleY }}
        className="absolute inset-0 pointer-events-none z-[3]"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[15%] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-yellow-300/25 to-amber-500/25 dark:from-sky-500/[0.03] dark:to-indigo-500/[0.03] blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 0.95, 1.1], rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[15%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-yellow-200/20 to-yellow-300/20 dark:from-purple-500/[0.02] dark:to-indigo-500/[0.02] blur-3xl"
        />
      </motion.div>

      {/* Core Layout Containers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* 5. LAYER ORDER: Text & Buttons (z-30) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="lg:col-span-7 text-left space-y-8 z-30"
          >
            {/* Location Badge (Stagger item 1) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <span
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full font-bold text-xs shadow-sm bg-white/80 dark:bg-slate-900/80 border border-yellow-200 dark:border-white/8 text-slate-950 dark:text-yellow-400"
              >
                <MapPin className="h-3.5 w-3.5 text-zinc-900 dark:text-yellow-400" aria-hidden="true" />
                Coimbatore&apos;s Premier Pet Grooming Salon
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            {/* Title (Stagger item 2 - Fade, Slide Up, Letter Spacing) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 25, letterSpacing: "-0.04em" },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  letterSpacing: "-0.015em", 
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
                }
              }}
            >
              <h1 className="type-hero-title max-w-2xl text-slate-950 dark:text-white">
                Gentle Grooming
                <br />
                <span className="relative inline-block mt-1">
                  <span className="bg-gradient-to-r from-slate-950 to-slate-800 dark:from-yellow-300 dark:to-yellow-450 bg-clip-text text-transparent">with Love</span>
                  {/* Underline SVG */}
                  <motion.svg
                    className="absolute -bottom-2.5 left-0 w-full"
                    viewBox="0 0 300 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 9 Q75 3 150 9 Q225 15 298 7"
                      stroke="currentColor"
                      className="text-slate-950 dark:text-yellow-400"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                </span>
                {" & Care"}
              </h1>
            </motion.div>

            {/* Paragraph (Stagger item 3 - Fade in after title) */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 0.85, transition: { duration: 0.6 } }
              }}
              className="type-hero-subtitle max-w-xl text-slate-900 dark:text-slate-300"
            >
              Safe, hygienic, and completely stress-free grooming for your beloved pets — at our trusted{" "}
              <span className="font-extrabold text-zinc-950 dark:text-yellow-400">single location salon</span>{" "}in Coimbatore.
              No cages, no anxiety, just gentle hands.
            </motion.p>

            {/* Action Buttons (Stagger item 4 - Ripple and Glow animations) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-wrap items-center gap-4.5"
            >
              {/* Primary CTA (Book Appointment) */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(29,78,216,0.35)" }}
                whileTap={{ scale: 0.96 }}
                className="relative"
              >
                <Link 
                  href="/book" 
                  className="btn-primary shine type-button flex items-center justify-center gap-2 cursor-pointer font-bold px-6 py-3.5 rounded-xl text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 hover:shadow-lg transition-shadow"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #000000)" }}
                >
                  <Sparkles className="h-4.5 w-4.5 text-sky-200" aria-hidden="true" />
                  Book Appointment
                </Link>
              </motion.div>

              {/* Secondary CTA (View Packages) */}
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group"
              >
                <Link 
                  href="/packages" 
                  className="btn-secondary type-button flex items-center justify-center gap-2 cursor-pointer font-bold px-6 py-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:border-slate-800 dark:hover:border-yellow-400/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
                >
                  View Packages
                  <ArrowRight className="h-4.5 w-4.5 text-zinc-900 dark:text-slate-200 group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Google Rating badge (Stagger item 5) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="flex items-center gap-4 pt-1"
            >
              <div
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/8 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-850 dark:text-slate-200">4.9 / 5</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">230+ ratings</span>
              </div>
            </motion.div>

            {/* Stagger item 6 - Trust Badges */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.6 } }
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2.5 p-3 rounded-2xl border bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-white/8 hover:translate-y-[-3px] transition-all duration-300 shadow-sm cursor-default"
                >
                  <div className={`p-2 rounded-xl shrink-0 ${badge.bg}`} aria-hidden="true">
                    <badge.icon className={`h-4 w-4 ${badge.color}`} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 4. LAYER ORDER: Pet Cards (z-10 / z-20) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] z-20">

            {/* Parallax Container holding the card components */}
            <motion.div
              style={{ x: petCardX, y: petCardY }}
              className="relative w-full max-w-[420px] h-[480px]"
            >
              
              {/* Dog Card Container (Large Floating Card) */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-3, 3, -3],
                  scale: [1.00, 1.03, 1.00],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-8 w-[62%] rounded-[24px] overflow-hidden z-20 border bg-white/90 dark:bg-slate-900/90 border-white/80 dark:border-white/10 shadow-xl cursor-default"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-slate-800 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=700&h=875&fit=crop"
                    alt="Rocky Golden Retriever post-grooming"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent" />
                  <div
                    className="absolute bottom-3.5 inset-x-3.5 py-2 px-3.5 rounded-xl flex justify-between items-center bg-white/95 dark:bg-slate-900/95 shadow-md border border-white/10"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">Rocky</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500">Golden Retriever</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-700 to-indigo-900 text-white text-[9px] font-bold shadow-sm">
                      Groomed ✓
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Cat Card Container (Smaller Floating Card) */}
              <motion.div
                animate={{
                  x: [-8, 8, -8],
                  y: [8, -8, 8],
                  rotate: [3, -3, 3],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 bottom-8 w-[56%] rounded-[24px] overflow-hidden z-10 border bg-white/90 dark:bg-slate-900/90 border-white/80 dark:border-white/10 shadow-lg cursor-default"
              >
                <div className="aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop"
                    alt="Milo Persian Cat post-spa"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                  <div
                    className="absolute bottom-3.5 inset-x-3.5 py-2 px-3.5 rounded-xl flex justify-between items-center bg-white/95 dark:bg-slate-900/95 shadow-md border border-white/10"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">Milo</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500">Persian Cat</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-600 to-purple-800 text-white text-[9px] font-bold shadow-sm">
                      Spa ✓
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge: 100% Safe Care */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-4 z-30"
                aria-hidden="true"
              >
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-emerald-500/20 dark:border-emerald-500/10 shadow-md"
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9.5px] font-bold shrink-0">✓</div>
                  <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200">100% Safe Care</span>
                </div>
              </motion.div>

              {/* Floating Badge: 4.9 Rating */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-0 left-0 z-30"
                aria-hidden="true"
              >
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-amber-500/25 dark:border-amber-500/15 shadow-md"
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-amber-400 flex items-center justify-center text-white text-[9.5px] font-bold shrink-0">★</div>
                  <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 font-poppins">4.9 Google Rating</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
