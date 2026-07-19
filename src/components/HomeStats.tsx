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
    const duration = 1600;
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
    glow: "shadow-sky-200",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    label: "Google Rating",
    value: 4.9, suffix: "★", decimals: 1,
    icon: Star,
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    label: "Repeat Customers",
    value: 91, suffix: "%", decimals: 0,
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    glow: "shadow-rose-200",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    label: "Daily Hygiene Score",
    value: 100, suffix: "%", decimals: 0,
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    label: "Certified Groomers",
    value: 3, suffix: "", decimals: 0,
    icon: Award,
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-200",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    label: "Customer Satisfaction",
    value: 98, suffix: "%", decimals: 0,
    icon: Smile,
    gradient: "from-sky-400 to-cyan-500",
    glow: "shadow-sky-200",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
];

export default function HomeStats() {
  return (
    <section aria-label="Key statistics" className="py-20 bg-white relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-50/80 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="type-eyebrow mb-2">By the Numbers</p>
          <h2 className="type-h2">Trusted by Coimbatore&apos;s Pet Parents</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative"
            >
              <div className={`relative flex flex-col items-center text-center gap-3 p-6 rounded-3xl glass-card border border-sky-100/50 card-hover overflow-hidden`}>
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-70`} aria-hidden="true" />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg ${stat.glow} shadow-md`} aria-hidden="true">
                  <stat.icon className="h-5 w-5" />
                </div>

                {/* Value */}
                <p className="text-2xl font-poppins font-extrabold text-[#1E3A8A] tabular-nums leading-none">
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

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
    </section>
  );
}
