"use client";

import React, { useState } from "react";
import { faqList } from "../utils/mockData";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open

  const toggle = (idx: number) => setActiveIndex((p) => (p === idx ? null : idx));

  return (
    <section className="py-24 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-1 uppercase">
            Help Centre
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-lg mx-auto">
            Everything you need to know about our gentle grooming methods, safe handling, and policies.
          </p>
        </motion.div>

        {/* Accordions List (Inter Typography) */}
        <div className="space-y-4" role="list">
          {faqList.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                role="listitem"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-[24px] border transition-all duration-250 overflow-hidden ${
                  isOpen
                    ? "border-yellow-100 bg-gradient-to-br from-sky-50/20 to-white shadow-md shadow-yellow-100/10"
                    : "border-slate-200/60 bg-white/80 hover:border-sky-300 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  id={`faq-btn-${idx}`}
                >
                  {/* Question */}
                  <span className={`font-poppins font-bold text-base transition-colors duration-200 ${isOpen ? "text-zinc-900" : "text-zinc-900"}`}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? "bg-yellow-400 text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 border border-slate-200/60"
                  }`}>
                    {isOpen ? (
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      {/* Answer (Inter, 18px, line height 1.8) */}
                      <div className="px-6 pb-6 pt-1">
                        <div className="w-8 h-[2px] bg-yellow-500/30 rounded-full mb-4" aria-hidden="true" />
                        <p className="type-body text-slate-600 text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Callout Panel (SaaS Style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 p-10 rounded-[32px] text-white text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #020617 100%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Ambient flares */}
          <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-yellow-400/10 blur-2xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-yellow-1000/10 blur-2xl pointer-events-none" aria-hidden="true" />
          
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <MessageCircle className="h-5.5 w-5.5 text-sky-400 animate-bounce" />
            </div>
            <h3 className="text-2xl font-poppins font-black text-white">Still have questions?</h3>
            <p className="text-slate-300 font-inter text-sm max-w-md mx-auto leading-relaxed">
              Our team is happy to help with anything grooming-related. Reach out to us directly.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-zinc-900 font-poppins font-bold text-sm hover:bg-slate-50 transition-all shadow-md active:scale-[0.98]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
