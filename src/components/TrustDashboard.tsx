"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Award, Heart, CheckCircle2, ShieldAlert, Sparkles, Smile } from "lucide-react";

// Smooth CountUp Component using requestAnimationFrame
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

// Circular Progress Indicator Component
function ProgressRing({ percentage, label, icon: Icon, color = "stroke-sky-500", textColor = "text-sky-500" }: { percentage: number; label: string; icon: any; color?: string; textColor?: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className="flex flex-col items-center p-6 rounded-2xl glass-card text-center hover:scale-103 transition-transform duration-300">
      <div className="relative w-24 h-24 mb-4">
        {/* SVG Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated active circle */}
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
        {/* Center Icon */}
        <div className={`absolute inset-0 flex items-center justify-center ${textColor}`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <span className="font-poppins font-bold text-xl text-navy-blue">{percentage}%</span>
      <span className="text-xs font-semibold text-slate-gray font-poppins mt-1">{label}</span>
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
    <section id="trust" className="py-24 bg-gradient-to-b from-white to-sky-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            SST Trust Center
          </h2>
          <p className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Why Local Pet Owners Trust SST Groomers
          </p>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            We operate a clean, transparent, open-concept salon at Coimbatore. 
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
            textColor="text-sky-500"
          />
          <ProgressRing
            percentage={96}
            label="On-Time Appointments"
            icon={Award}
            color="stroke-indigo-400"
            textColor="text-indigo-500"
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
            color="stroke-rose-400"
            textColor="text-rose-500"
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
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-slate-gray font-poppins">{stat.label}</span>
                <div className="p-2 rounded-xl bg-sky-50 text-sky-500">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-navy-blue font-poppins">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
                <p className="text-xs text-slate-gray mt-1 font-inter">{stat.desc}</p>
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
              transition={{ duration: 0.4, delay: (idx + 4) * 0.1 }}
              className="p-6 rounded-2xl glass-card flex items-center justify-between hover:translate-y-[-4px] hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-500">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-gray font-poppins block">{stat.label}</span>
                  <span className="text-2xl font-extrabold text-navy-blue font-poppins">
                    <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-gray font-inter max-w-[120px] text-right">{stat.desc}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
