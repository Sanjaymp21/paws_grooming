"use client";

import React, { useState } from "react";
import { safetyChecklist } from "../utils/mockData";
import { ShieldCheck, Heart, Thermometer, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";
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
    { title: "Pet Safe Products", desc: "100% organic, natural, chemical-free herbal shampoos", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Certified Groomers", desc: "Trained in canine first-aid & low-stress handling", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Sanitized Equipment", desc: "Tubs & scissors sterilized via autoclave after every dog", icon: Sparkles, color: "text-sky-500", bg: "bg-sky-50" },
  ];

  return (
    <section id="safety" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Strict Standards
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Our 100% Hygiene &amp; Safety Protocol
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            At SST Groomers, safety is built into everything we do. We enforce strict medical-grade sanitization protocols to protect your pets from cross-infection.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Safety Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-poppins font-bold text-sm text-navy-blue">Today&apos;s Hygiene Checklist</h4>
                  <span className="text-[10px] text-slate-gray font-inter">Updated daily by our head safety inspector</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-poppins font-black text-emerald-600">{hygienePercentage}%</span>
                  <span className="text-[9px] text-slate-gray block font-poppins font-semibold uppercase">Score</span>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {list.map((item, idx) => {
                  const isDone = item.status === "Completed";
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isDone
                          ? "bg-emerald-50/30 border-emerald-100/50"
                          : "bg-slate-50/50 border-slate-100 opacity-70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-md flex items-center justify-center border transition-colors ${
                          isDone ? "bg-emerald-500 border-emerald-400 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isDone && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <span className={`text-xs font-medium font-inter transition-all ${
                          isDone ? "text-slate-800 line-through" : "text-slate-700"
                        }`}>
                          {item.item}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-400">{item.time}</span>
                        <span className={`text-[9px] font-bold font-poppins px-2 py-0.5 rounded-full ${
                          isDone ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Environmental Stats */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Environmental Thermometer widget */}
            <div className="p-6 rounded-[28px] glass-card border border-sky-100/80 shadow-md">
              <h5 className="font-poppins font-bold text-sm text-navy-blue mb-4 flex items-center gap-1.5">
                <Thermometer className="h-5 w-5 text-sky-500" />
                Salon Environmental Control
              </h5>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100/50">
                  <span className="text-[9px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">Grooming Bay</span>
                  <span className="text-xl font-poppins font-extrabold text-navy-blue block mt-1">24.2 °C</span>
                  <span className="text-[9px] text-emerald-600 font-semibold font-inter mt-1 block">✓ Optimal Climate</span>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                  <span className="text-[9px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">Relaxation Bay</span>
                  <span className="text-xl font-poppins font-extrabold text-navy-blue block mt-1">23.8 °C</span>
                  <span className="text-[9px] text-emerald-600 font-semibold font-inter mt-1 block">✓ Safe Humidity (52%)</span>
                </div>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl glass-card border border-sky-50">
                  <div className={`p-2.5 rounded-xl ${pillar.bg} ${pillar.color} shrink-0`}>
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-sm text-navy-blue">{pillar.title}</h5>
                    <p className="text-[11px] text-slate-gray font-inter mt-1 leading-normal">{pillar.desc}</p>
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
