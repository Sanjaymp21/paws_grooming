"use client";

import React from "react";
import { mockReviews } from "../utils/mockData";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden z-10">
      {/* Rich dark background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0F172A 0%, #020617 100%)",
          }}
        />
        {/* Layered purple/pink/blue auroras along the bottom/sides */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full opacity-20 filter blur-[90px]"
          style={{ background: "radial-gradient(circle, #000000 0%, transparent 70%)" }}
        />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-15 filter blur-[80px]"
          style={{ background: "radial-gradient(circle, #FACC15 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full mb-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-xs font-bold font-poppins text-sky-400 uppercase tracking-widest">Testimonials</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-white tracking-tight">
            Loved by Coimbatore&apos;s <span className="text-sky-400">Pet Parents</span>
          </h2>
          <p className="text-slate-400 text-sm font-inter leading-relaxed max-w-xl mx-auto">
            Real feedback from our neighbours who trust us with their beloved pets, session after session.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {mockReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative flex flex-col rounded-[28px] p-8 overflow-hidden"
              style={{
                background: "rgba(30, 41, 59, 0.6)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              aria-label={`Review by ${review.customerName}`}
            >
              {/* Thin top gradient accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, #000000, #FACC15, #EC4899)",
                }}
                aria-hidden="true"
              />

              {/* Large quote watermark */}
              <Quote
                className="absolute right-6 top-6 h-12 w-12 rotate-180 opacity-[0.03] text-white"
                aria-hidden="true"
              />

              {/* Star icons */}
              <div className="flex gap-1 mb-5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Review Text quote (Body Text: 18px Inter) */}
              <blockquote className="flex-1 mb-6">
                <p className="text-slate-200 font-inter text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>

              {/* Card Footer Author Profile */}
              <div
                className="flex items-center justify-between pt-5 border-t border-slate-700/60"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.avatar}
                    alt={review.customerName}
                    className="h-10 w-10 rounded-full object-cover border-2 border-sky-400/20"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-poppins font-bold text-white text-xs leading-tight mb-0.5">{review.customerName}</h4>
                    <p className="text-[10px] text-slate-400 font-inter">{review.date}</p>
                  </div>
                </div>
                
                {/* Pet chip badge */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.petPic}
                    alt={review.petName}
                    className="h-5 w-5 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-bold font-poppins text-slate-400">
                    {review.petName.split(" ")[0]}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Trust Metrics Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <span className="text-white font-extrabold text-sm">4.9 / 5</span>
            <span className="text-xs text-slate-400">on Google Reviews</span>
          </div>
          <span className="text-xs text-slate-500">230+ verified local ratings</span>
          <span className="hidden sm:inline text-slate-800">|</span>
          <Link
            href="/reviews"
            className="text-sky-400 text-xs font-bold hover:text-yellow-100 transition-colors font-poppins"
          >
            Read All Reviews →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
