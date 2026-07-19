"use client";

import React from "react";
import { Landmark, TrendingUp, Calendar, Smile, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function BusinessInsights() {
  const cards = [
    { title: "Appointments Today", value: "18 / 20", desc: "90% occupancy rate", icon: Calendar, color: "text-sky-500", bg: "bg-sky-50" },
    { title: "Revenue Today (Est)", value: "₹18,250", desc: "+12% from last Saturday", icon: Landmark, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Customer Satisfaction", value: "98.4%", desc: "Based on feedback today", icon: Smile, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Active Memberships", value: "148 Members", desc: "+14 joins this month", icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-md relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/10 rounded-full blur-xl -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="font-poppins font-bold text-sm text-navy-blue flex items-center gap-1.5">
            <TrendingUp className="h-4.5 w-4.5 text-sky-500" />
            Salon Business Vitals
          </h4>
          <span className="text-[10px] text-slate-gray font-inter">Live updates for today&apos;s operation cycles</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-[9px] font-bold tracking-wide uppercase font-poppins animate-pulse">
          Live feed
        </span>
      </div>

      {/* Stats list */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 hover:shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] text-slate-gray font-poppins font-bold uppercase tracking-wider block max-w-[100px]">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg ${card.bg} ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <span className="text-lg font-poppins font-black text-navy-blue block leading-none">
              {card.value}
            </span>
            <p className="text-[9px] text-slate-gray font-inter mt-1.5 leading-none">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
