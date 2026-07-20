"use client";

import React from "react";
import { HeartHandshake, Smile, ShieldAlert, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityImpact() {
  const stats = [
    { label: "Pets Groomed This Month", value: "340+", desc: "Maintained local clean coats", icon: Award, color: "text-zinc-900", bg: "bg-yellow-50" },
    { label: "Happy Families", value: "220+", desc: "Coimbatore pet parents", icon: Smile, color: "text-zinc-900", bg: "bg-yellow-100" },
    { label: "Rescue Pets Groomed", value: "48 Pets", desc: "Groomed 100% free at shelters", icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-yellow-100 shadow-md relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/10 rounded-full blur-xl -z-10" />

      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-poppins font-bold text-base text-zinc-900 flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-rose-500 animate-pulse" />
              Coimbatore Local Impact
            </h4>
            <span className="text-xs text-slate-gray font-inter">How we support stray &amp; rescue pets locally</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="space-y-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4, scale: 1.01, boxShadow: "0 10px 25px rgba(15,23,42,0.03)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex gap-4 p-4 rounded-[24px] bg-white border border-slate-100/80 hover:border-yellow-100 transition-colors duration-300 items-center"
            >
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-lg font-poppins font-black text-zinc-900">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-inter ml-2">
                  ({stat.desc})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100/50 mt-6 text-xs text-emerald-800 leading-relaxed font-inter flex gap-3 items-start">
        <span className="text-base leading-none">🤝</span>
        <p className="font-medium">
          We allocate 5% of all luxury spa packages directly to purchase hygiene products for Coimbatore local shelters. Thank you for your support!
        </p>
      </div>

    </div>
  );
}
