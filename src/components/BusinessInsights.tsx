"use client";

import React from "react";
import { Landmark, TrendingUp, Calendar, Smile, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function BusinessInsights() {
  const cards = [
    { title: "Appointments Today", value: "18 / 20", desc: "90% occupancy rate", icon: Calendar, color: "text-zinc-900", bg: "bg-yellow-50" },
    { title: "Revenue Today (Est)", value: "₹18,250", desc: "+12% from last Saturday", icon: Landmark, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Customer Satisfaction", value: "98.4%", desc: "Based on feedback today", icon: Smile, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Active Memberships", value: "148 Members", desc: "+14 joins this month", icon: ShieldCheck, color: "text-zinc-900", bg: "bg-yellow-100" },
  ];

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-yellow-100 shadow-md relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/10 rounded-full blur-xl -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="font-poppins font-bold text-base text-zinc-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-zinc-900" />
            Salon Business Vitals
          </h4>
          <span className="text-xs text-slate-gray font-inter">Live updates for today&apos;s operation cycles</span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-white text-[9px] font-bold tracking-wide uppercase font-poppins animate-pulse">
          Live Feed
        </span>
      </div>

      {/* Stats list */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, scale: 1.01, boxShadow: "0 10px 25px rgba(15,23,42,0.03)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-5 rounded-[24px] bg-white border border-slate-100/80 hover:border-yellow-100 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] text-slate-gray font-poppins font-bold uppercase tracking-wider block max-w-[100px]">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <span className="text-xl font-poppins font-black text-zinc-900 block leading-none">
              {card.value}
            </span>
            <p className="text-[11px] text-slate-400 font-inter mt-2 leading-none">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
