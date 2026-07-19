"use client";

import React from "react";
import { HeartHandshake, Smile, ShieldAlert, Award } from "lucide-react";

export default function CommunityImpact() {
  const stats = [
    { label: "Pets Groomed This Month", value: "340+", desc: "Maintained local clean coats", icon: Award, color: "text-sky-500", bg: "bg-sky-50" },
    { label: "Happy Families", value: "220+", desc: "Coimbatore pet parents", icon: Smile, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Rescue Pets Groomed", value: "48 Pets", desc: "Groomed 100% free at shelters", icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-md relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/10 rounded-full blur-xl -z-10" />

      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-poppins font-bold text-sm text-navy-blue flex items-center gap-1.5">
              <HeartHandshake className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
              Coimbatore Local Impact
            </h4>
            <span className="text-[10px] text-slate-gray font-inter">How we support stray &amp; rescue pets locally</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="space-y-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:shadow-sm transition-all duration-300 items-center">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-md font-poppins font-black text-navy-blue">
                  {stat.value}
                </span>
                <span className="text-[9px] text-slate-gray font-inter ml-1.5">
                  ({stat.desc})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100/50 mt-6 text-[10px] text-emerald-800 leading-relaxed font-inter flex gap-2">
        <span className="text-sm">🤝</span>
        <p>
          We allocate 5% of all luxury spa packages directly to purchase hygiene products for Coimbatore local shelters. Thank you for your support!
        </p>
      </div>

    </div>
  );
}
