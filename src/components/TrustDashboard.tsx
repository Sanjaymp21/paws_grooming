"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Award, Heart, CheckCircle2, Sparkles, Smile } from "lucide-react";

function CountUp({ to, duration = 1.5, suffix = "", decimals = 0 }: { to: string; duration?: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const startTime = performance.now();
      const endValue = parseFloat(to);
      
      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function: easeOutQuad
        const easeProgress = progress * (2 - progress);
        const currentValue = easeProgress * endValue;
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function ProgressRing({ percentage, label, icon: Icon, color = "stroke-sky-500", textColor = "text-zinc-900" }: { percentage: number; label: string; icon: any; color?: string; textColor?: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className="flex flex-col items-center p-6 rounded-[20px] glass-card text-center hover:scale-[1.02] transition-transform duration-300 border border-slate-200/50">
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            className={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${textColor}`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <span className="font-extrabold text-xl text-slate-900">{percentage}%</span>
      <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function TrustDashboard() {
  const stats = [
    { label: "Happy Pets Groomed", value: "1250", suffix: "+", decimals: 0, icon: Users, desc: "Beloved local pets treated gently" },
    { label: "Customer Rating", value: "4.9", suffix: " / 5", decimals: 1, icon: Star, desc: "Based on 200+ local reviews" },
    { label: "Returning Customers", value: "91", suffix: "%", decimals: 0, icon: Heart, desc: "Loyal pet owners in Coimbatore" },
    { label: "Daily Hygiene Score", value: "100", suffix: "%", decimals: 0, icon: CheckCircle2, desc: "Audited fresh status checklist" },
    { label: "Certified Groomers", value: "3", suffix: "", decimals: 0, icon: Award, desc: "Trained in canine psychology & care" },
    { label: "Average Grooming Time", value: "60", suffix: " Min", decimals: 0, icon: Sparkles, desc: "Efficient, stress-free slots" },
    { label: "Customer Satisfaction", value: "98", suffix: "%", decimals: 0, icon: Smile, desc: "Verified satisfaction ratings" },
  ];

  return (
    <section id="trust" className="py-24 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="type-eyebrow">SST Trust Center</span>
          <h2 className="type-section-heading">
            Why Local Pet Owners Trust SST Groomers
          </h2>
          <p className="type-section-subtitle max-w-xl mx-auto">
            We operate a clean, transparent, open-concept salon in Coimbatore. 
            Pet parents can see exactly how we groom their loved ones. Here is our live trust metrics dashboard.
          </p>
        </div>

        {/* Progress Rings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <ProgressRing
            percentage={100}
            label="Hygiene Score"
            icon={CheckCircle2}
            color="stroke-sky-400"
            textColor="text-zinc-900"
          />
          <ProgressRing
            percentage={96}
            label="On-Time Appointments"
            icon={Award}
            color="stroke-indigo-500"
            textColor="text-indigo-600"
          />
          <ProgressRing
            percentage={98}
            label="Customer Happiness"
            icon={Smile}
            color="stroke-emerald-400"
            textColor="text-emerald-500"
          />
          <ProgressRing
            percentage={91}
            label="Repeat Customers"
            icon={Heart}
            color="stroke-pink-500"
            textColor="text-pink-500"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.slice(0, 4).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-[20px] glass-card flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-md transition-all duration-300 border border-slate-200/50"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className="p-2 rounded-xl bg-yellow-50 text-zinc-900">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-normal">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {stats.slice(4).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx + 4) * 0.08 }}
              className="p-6 rounded-[20px] glass-card flex items-center justify-between hover:translate-y-[-4px] hover:shadow-md transition-all duration-300 border border-slate-200/50"
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-yellow-100 text-indigo-600">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400 text-right font-medium max-w-[120px]">{stat.desc}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
