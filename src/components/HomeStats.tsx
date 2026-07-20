"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Heart, CheckCircle2, Award, Smile } from "lucide-react";

function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setCount(eased * to);
      if (p < 1) requestAnimationFrame(tick);
      else setCount(to);
    };
    requestAnimationFrame(tick);
  }, [isInView, to]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

const stats = [
  {
    label: "Happy Pets Groomed",
    value: 1250, suffix: "+", decimals: 0,
    icon: Users,
    gradient: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.22)",
    borderColor: "rgba(14,165,233,0.15)",
  },
  {
    label: "Google Rating",
    value: 4.9, suffix: "★", decimals: 1,
    icon: Star,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.22)",
    borderColor: "rgba(245,158,11,0.15)",
  },
  {
    label: "Repeat Customers",
    value: 91, suffix: "%", decimals: 0,
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.22)",
    borderColor: "rgba(244,63,94,0.15)",
  },
  {
    label: "Daily Hygiene Score",
    value: 100, suffix: "%", decimals: 0,
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.22)",
    borderColor: "rgba(16,185,129,0.15)",
  },
  {
    label: "Certified Groomers",
    value: 3, suffix: "", decimals: 0,
    icon: Award,
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.22)",
    borderColor: "rgba(99,102,241,0.15)",
  },
  {
    label: "Customer Satisfaction",
    value: 98, suffix: "%", decimals: 0,
    icon: Smile,
    gradient: "from-sky-400 to-cyan-500",
    glow: "rgba(6,182,212,0.22)",
    borderColor: "rgba(6,182,212,0.15)",
  },
];

export default function HomeStats() {
  return (
    <section
      aria-label="Key statistics"
      className="py-28 relative overflow-hidden"
    >
      {/* Rich premium background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(240,249,255,0.65) 0%, #F0F7FF 40%, rgba(238,242,255,0.80) 100%)",
          }}
        />
        {/* Blobs */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute left-0 bottom-0 w-[350px] h-[350px] rounded-full bg-blue-100/30 blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      {/* Top line separator */}
      <div className="section-top-line absolute" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <p className="type-eyebrow">By the Numbers</p>
          <h2 className="type-h1 mt-2 mb-5">Trusted by Coimbatore&apos;s Pet Parents</h2>
          <p className="type-body text-slate-500">
            Numbers that reflect our commitment to excellence — session after session, year after year.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.50, delay: i * 0.08 }}
              className="group relative"
            >
              <div
                className="relative flex flex-col items-center text-center gap-4 p-6 rounded-3xl card-hover overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${stat.borderColor}`,
                  boxShadow: `0 8px 32px ${stat.glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
                }}
              >
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${stat.gradient}`} aria-hidden="true" />

                {/* Icon */}
                <div
                  className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-250`}
                  style={{ boxShadow: `0 6px 24px ${stat.glow}`, width: "3.25rem", height: "3.25rem" }}
                  aria-hidden="true"
                >
                  <stat.icon className="h-5 w-5" />
                </div>

                {/* Value */}
                <p className="counter-value">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>

                {/* Label */}
                <p className="text-[10.5px] font-semibold text-slate-500 font-poppins leading-snug">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line separator */}
      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
