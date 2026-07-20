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
    gradient: "from-sky-blue to-royal-blue",
    glow: "rgba(37,99,235,0.08)",
    borderColor: "rgba(37,99,235,0.12)",
  },
  {
    label: "Google Rating",
    value: 4.9, suffix: "★", decimals: 1,
    icon: Star,
    gradient: "from-peach-custom to-soft-yellow",
    glow: "rgba(245,158,11,0.08)",
    borderColor: "rgba(245,158,11,0.12)",
  },
  {
    label: "Repeat Customers",
    value: 91, suffix: "%", decimals: 0,
    icon: Heart,
    gradient: "from-pink-custom to-coral-custom",
    glow: "rgba(236,72,153,0.08)",
    borderColor: "rgba(236,72,153,0.12)",
  },
  {
    label: "Daily Hygiene Score",
    value: 100, suffix: "%", decimals: 0,
    icon: CheckCircle2,
    gradient: "from-mint-green to-sky-blue",
    glow: "rgba(52,211,153,0.08)",
    borderColor: "rgba(52,211,153,0.12)",
  },
  {
    label: "Certified Groomers",
    value: 3, suffix: "", decimals: 0,
    icon: Award,
    gradient: "from-indigo-custom to-purple-custom",
    glow: "rgba(67,56,202,0.08)",
    borderColor: "rgba(67,56,202,0.12)",
  },
  {
    label: "Satisfaction Score",
    value: 98, suffix: "%", decimals: 0,
    icon: Smile,
    gradient: "from-cyan-custom to-sky-blue",
    glow: "rgba(34,211,238,0.08)",
    borderColor: "rgba(34,211,238,0.12)",
  },
];

export default function HomeStats() {
  return (
    <section
      aria-label="Key statistics"
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/80 blur-2xl rounded-full" />
      </div>

      <div className="section-top-line absolute animate-pulse" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (Section Heading: 48px, Section Subtitle: 22px) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="type-eyebrow">By the Numbers</span>
          <h2 className="type-section-heading mt-2.5 mb-4">Trusted by Coimbatore&apos;s Pet Parents</h2>
          <p className="type-section-subtitle max-w-xl mx-auto">
            Stats reflecting our dedication to quality grooming care, pet hygiene, and parent satisfaction.
          </p>
        </motion.div>

        {/* Grid of cards with 16-24px rounded corners and glassmorphism */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative group"
            >
              <div
                className="relative flex flex-col items-center text-center gap-4.5 p-6 rounded-[20px] glass-card card-hover overflow-hidden"
                style={{
                  border: `1px solid ${stat.borderColor}`,
                  boxShadow: `0 10px 30px ${stat.glow}, inset 0 1px 0 rgba(255,255,255,0.7)`,
                }}
              >
                {/* Thin top gradient indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} aria-hidden="true" />

                {/* Icon wrapper */}
                <div
                  className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  <stat.icon className="h-5.5 w-5.5" />
                </div>

                {/* Counter value */}
                <span className="type-card-title text-slate-900 font-extrabold text-3xl">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </span>

                {/* Label text */}
                <span className="type-small text-slate-500 font-medium text-xs">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-bottom-line absolute" aria-hidden="true" />
    </section>
  );
}
