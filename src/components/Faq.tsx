"use client";

import React, { useState } from "react";
import { faqList } from "../utils/mockData";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Start first open

  const toggle = (idx: number) => setActiveIndex((p) => (p === idx ? null : idx));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-full bg-sky-50/60 blur-3xl" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="type-eyebrow mb-3">Help Centre</p>
          <h2 className="type-h1 mb-4">Frequently Asked Questions</h2>
          <p className="type-body text-slate-500 max-w-lg mx-auto">
            Everything you need to know about our gentle grooming methods, safe handling, and policies.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3" role="list">
          {faqList.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                role="listitem"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-sky-200 bg-gradient-to-br from-sky-50/80 to-white shadow-md shadow-sky-100/50"
                    : "border-slate-100 bg-white hover:border-sky-100 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  id={`faq-btn-${idx}`}
                >
                  <span className={`font-poppins font-semibold text-[15px] leading-snug transition-colors ${isOpen ? "text-[#1d4ed8]" : "text-[#1E3A8A]"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                      : "bg-sky-50 text-sky-500 border border-sky-100"
                  }`}>
                    {isOpen
                      ? <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      : <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    }
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
                      <div className="px-6 pb-6 pt-0">
                        <div className="w-10 h-0.5 bg-sky-200 rounded-full mb-4" aria-hidden="true" />
                        <p className="type-body text-slate-600 !text-[0.9375rem] !leading-7">
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-7 rounded-3xl bg-gradient-to-br from-[#1E3A8A] to-[#1d4ed8] text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sky-400/10 blur-2xl" aria-hidden="true" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-sky-200" />
            </div>
            <h3 className="font-poppins font-bold text-lg mb-2">Still have questions?</h3>
            <p className="text-sky-200 text-sm font-inter mb-5">
              Our team is happy to help with anything grooming-related. Reach out directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#1E3A8A] font-poppins font-bold text-sm hover:bg-sky-50 transition-colors shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
