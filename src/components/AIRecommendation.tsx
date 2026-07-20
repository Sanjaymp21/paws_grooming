"use client";

import React, { useState } from "react";
import { calculateRecommendation, AIRecommendationResult } from "../utils/mockData";
import { Sparkles, BrainCircuit, RefreshCw, Clock, Tag, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIRecommendation() {
  const [breed, setBreed] = useState("");
  const [coatLength, setCoatLength] = useState<"short" | "medium" | "long">("medium");
  const [shedding, setShedding] = useState<"low" | "moderate" | "heavy">("moderate");
  const [age, setAge] = useState("2");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendationResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breed.trim()) {
      alert("Please enter your pet's breed.");
      return;
    }
    setLoading(true);
    setResult(null);

    // Simulate AI calculation latency
    setTimeout(() => {
      const recommendation = calculateRecommendation(breed, coatLength, shedding, age);
      setResult(recommendation);
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setBreed("");
    setCoatLength("medium");
    setShedding("moderate");
    setAge("2");
    setResult(null);
  };

  return (
    <section id="ai-recommender" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-1 uppercase">
            <BrainCircuit className="h-3.5 w-3.5 text-zinc-900" />
            AI Recommendation
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Personalized AI Grooming Wizard</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-xl mx-auto">
            Enter your pet&apos;s physical characteristics, and our smart recommendation engine will compute the ideal grooming session matching their specific coat and age needs.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-3xl mx-auto glass-card rounded-[32px] p-6 sm:p-8 border border-yellow-100/80 shadow-lg relative overflow-hidden bg-white">
          {/* Background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/10 rounded-full blur-2xl" />

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Breed */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Pet Breed</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Retriever, Persian Cat"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-zinc-900 font-inter font-semibold text-sm shadow-sm bg-white text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Age (Years)</label>
                    <input
                      type="number"
                      min="0.1"
                      max="25"
                      step="0.1"
                      placeholder="e.g. 2"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-zinc-900 font-inter font-semibold text-sm shadow-sm bg-white text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Coat Length */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Coat Length</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["short", "medium", "long"] as const).map((len) => (
                        <button
                          key={len}
                          type="button"
                          onClick={() => setCoatLength(len)}
                          className={`py-3 rounded-2xl text-xs font-poppins font-bold uppercase transition-all duration-300 border ${
                            coatLength === len
                              ? "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-2 border-zinc-900 shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-[1.03]"
                              : "bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900"
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shedding Level */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Shedding Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["low", "moderate", "heavy"] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setShedding(level)}
                          className={`py-3 rounded-2xl text-xs font-poppins font-bold uppercase transition-all duration-300 border ${
                            shedding === level
                              ? "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-2 border-zinc-900 shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-[1.03]"
                              : "bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-poppins font-bold shadow-md hover:shadow-lg hover:shadow-yellow-100 active:scale-[0.99] transition-all duration-300 disabled:opacity-80"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                        AI is Analyzing Pet Coat Vitals...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4.5 w-4.5 text-sky-200" />
                        Calculate Recommendation
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Result Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] text-zinc-900 font-bold uppercase tracking-wider font-poppins">Recommended Service</span>
                    <h4 className="text-2xl font-poppins font-black text-zinc-900">{result.packageName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-gray font-poppins font-semibold uppercase tracking-wider block">Estimated Price</span>
                    <span className="text-xl font-poppins font-extrabold text-zinc-900">₹{result.price}</span>
                  </div>
                </div>

                {/* Result Detail Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100/50 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-zinc-900">
                      <Clock className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-gray font-poppins font-semibold block leading-none">Estimated Duration</span>
                      <span className="text-sm font-poppins font-bold text-zinc-900 mt-0.5 block">{result.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-yellow-100/50 border border-yellow-200/50 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-zinc-900">
                      <Tag className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-gray font-poppins font-semibold block leading-none">Best Match Code</span>
                      <span className="text-sm font-poppins font-bold text-zinc-900 mt-0.5 block">SST-AI-{(result.packageName.split(" ")[0]).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Explanations & Reason */}
                <div className="space-y-2">
                  <span className="text-xs font-poppins font-bold text-zinc-900 uppercase">Why this is recommended:</span>
                  <p className="text-xs text-slate-gray font-inter leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {result.reason}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <span className="text-xs font-poppins font-bold text-zinc-900 uppercase">Key Benefits:</span>
                  <ul className="space-y-2">
                    {result.benefits.map((b, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-medium text-slate-700">
                        <div className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">✓</div>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Health Tip */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100/80 text-[11px] text-amber-800 leading-relaxed font-inter flex gap-2.5">
                  <ShieldAlert className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-poppins font-bold text-amber-900 block mb-0.5">Grooming Care Tip</span>
                    {result.healthTip}
                  </div>
                </div>

                {/* Reset Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-xl border border-yellow-100 text-zinc-900 font-poppins font-semibold text-xs hover:bg-yellow-50 transition-colors"
                  >
                    Calculate New Pet
                  </button>
                  <a
                    href="#book"
                    onClick={() => {
                      const event = new CustomEvent("select-package", { detail: { packageName: result.packageName } });
                      window.dispatchEvent(event);
                    }}
                    className="flex-2 text-center py-3 rounded-xl bg-zinc-900 text-white font-poppins font-semibold text-xs hover:bg-yellow-400 shadow-md transition-all"
                  >
                    Select &amp; Book Package
                  </a>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
