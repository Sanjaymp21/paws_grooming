"use client";

import React, { useState } from "react";
import { safetyChecklist } from "../utils/mockData";
import { ShieldCheck, Heart, Thermometer, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SafetyDashboard() {
  const [list, setList] = useState(safetyChecklist);

  const toggleCheck = (idx: number) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, status: item.status === "Completed" ? "Pending" : "Completed" }
          : item
      )
    );
  };

  const completedCount = list.filter((item) => item.status === "Completed").length;
  const hygienePercentage = Math.round((completedCount / list.length) * 100);

  const pillars = [
    { title: "Pet Safe Products", desc: "100% organic, natural, chemical-free herbal shampoos", icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
    { title: "Certified Groomers", desc: "Trained in canine first-aid & low-stress handling", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Sanitized Equipment", desc: "Tubs & scissors sterilized via autoclave after every dog", icon: Sparkles, color: "text-sky-blue", bg: "bg-yellow-50" },
  ];

  return (
    <section id="safety" className="py-24 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-900" />
            Strict Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Our 100% Hygiene &amp; Safety Protocol</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-2xl mx-auto">
            At SST Groomers, safety is built into everything we do. We enforce strict medical-grade sanitization protocols to protect your pets from cross-infection.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Safety Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-yellow-100 shadow-md overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-zinc-800" aria-hidden="true" />
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-poppins font-bold text-base text-zinc-900">Today&apos;s Hygiene Checklist</h4>
                  <span className="text-xs text-slate-400 font-inter">Updated daily by our head safety inspector</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-poppins font-black text-emerald-500">{hygienePercentage}%</span>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mt-1">Score</span>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {list.map((item, idx) => {
                  const isDone = item.status === "Completed";
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      whileHover={{ scale: 1.005 }}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${isDone
                          ? "bg-emerald-50/20 border-emerald-100/50"
                          : "bg-slate-50/50 border-slate-100 opacity-80"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5.5 w-5.5 rounded-lg flex items-center justify-center border transition-all ${isDone ? "bg-emerald-500 border-emerald-400 text-white shadow-sm" : "border-slate-300 bg-white"
                          }`}>
                          {isDone && <CheckCircle className="h-4.5 w-4.5" />}
                        </div>
                        <span className={`text-sm font-inter font-semibold transition-all ${isDone ? "text-slate-400 line-through" : "text-zinc-900"
                          }`}>
                          {item.item}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-inter">{item.time}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${isDone ? "bg-emerald-100 border-emerald-200 text-emerald-700" : "bg-amber-100 border-amber-200 text-amber-700"
                          }`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Environmental Stats */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">

            {/* Environmental Thermometer widget */}
            <div className="p-6 sm:p-8 rounded-[32px] glass-card border border-yellow-100 shadow-md flex-grow">
              <h5 className="font-poppins font-bold text-base text-zinc-900 mb-6 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-zinc-900" />
                Salon Environmental Control
              </h5>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-yellow-50/40 border border-yellow-100/50">
                  <span className="text-[10px] text-slate-400 font-poppins font-bold uppercase tracking-wider block">Grooming Bay</span>
                  <span className="text-2xl font-poppins font-black text-zinc-900 block mt-1.5">24.2 °C</span>
                  <span className="text-[11px] text-emerald-600 font-semibold font-inter mt-1.5 block">✓ Optimal Climate</span>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-yellow-100/30 border border-yellow-200/30">
                  <span className="text-[10px] text-slate-400 font-poppins font-bold uppercase tracking-wider block">Relaxation Bay</span>
                  <span className="text-2xl font-poppins font-black text-zinc-900 block mt-1.5">23.8 °C</span>
                  <span className="text-[11px] text-emerald-600 font-semibold font-inter mt-1.5 block">✓ Safe Humidity (52%)</span>
                </div>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-[24px] bg-white border border-slate-100">
                  <div className={`p-2.5 rounded-xl ${pillar.bg} ${pillar.color} shrink-0`}>
                    <pillar.icon className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-sm text-zinc-900">{pillar.title}</h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-inter">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
