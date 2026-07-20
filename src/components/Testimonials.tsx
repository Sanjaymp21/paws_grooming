"use client";

import React from "react";
import { mockReviews } from "../utils/mockData";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Testimonials() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Rich dark background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 20% 20%, rgba(37,99,235,0.32) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 85% 85%, rgba(99,102,241,0.25) 0%, transparent 55%), radial-gradient(ellipse 80% 70% at 50% 50%, rgba(15,30,80,0.55) 0%, transparent 75%), #06091F",
          }}
        />
        {/* Extra depth blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-blue-900/35 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[450px] rounded-full bg-sky-900/30 blur-3xl" />
        {/* Dark dot grid */}
        <div className="absolute inset-0 dot-grid-dark" />
      </div>

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(96,165,250,0.55) 25%, rgba(99,102,241,0.50) 75%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-5"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="type-eyebrow" style={{ color: "#93C5FD" }}>Testimonials</span>
          </span>
          <h2 className="type-h1 mb-5" style={{ color: "#FFFFFF" }}>
            Loved by Coimbatore&apos;s{" "}
            <span className="gradient-text-warm">Pet Parents</span>
          </h2>
          <p className="type-body max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.90)" }}>
            Real feedback from our neighbours who trust us with their most beloved companions, session after session.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {mockReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.15 }}
              className="relative flex flex-col rounded-[30px] p-8 card-hover overflow-hidden"
              style={{
                background: "rgba(8,16,52,0.90)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 20px 64px rgba(0,0,0,0.40), 0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              aria-label={`Review by ${review.customerName}`}
            >
              {/* Gradient stripe at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, rgba(96,165,250,0.55) 0%, rgba(99,102,241,0.65) 50%, rgba(96,165,250,0.55) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Inner glow on hover */}
              <div
                className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 60% at 25% 25%, rgba(37,99,235,0.12), transparent)" }}
                aria-hidden="true"
              />

              {/* Large quote watermark */}
              <Quote
                className="absolute right-6 top-6 h-16 w-16 rotate-180"
                style={{ color: "rgba(255,255,255,0.04)" }}
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Review text */}
              <blockquote className="flex-1 mb-7">
                <p className="text-[15px] font-inter leading-relaxed italic" style={{ color: "rgba(203,213,225,0.90)" }}>
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div
                className="flex items-center justify-between pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.avatar}
                    alt={review.customerName}
                    className="h-11 w-11 rounded-full object-cover"
                    style={{ border: "2px solid rgba(96,165,250,0.35)", boxShadow: "0 0 12px rgba(96,165,250,0.20)" }}
                    loading="lazy"
                  />
                  <div>
                    <p className="font-poppins font-bold text-[14px] text-white leading-none mb-0.5">{review.customerName}</p>
                    <p className="text-[11px] font-inter" style={{ color: "rgba(148,163,184,0.75)" }}>{review.date}</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.petPic}
                    alt={review.petName}
                    className="h-6 w-6 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-[11px] font-poppins font-semibold" style={{ color: "rgba(148,163,184,0.85)" }}>
                    {review.petName.split(" ")[0]}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10"
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <span className="text-white font-bold font-poppins text-sm">4.9 / 5</span>
            <span className="text-[13px] font-inter" style={{ color: "rgba(148,163,184,0.80)" }}>on Google</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/12" aria-hidden="true" />
          <span className="text-[13px] font-inter" style={{ color: "rgba(148,163,184,0.75)" }}>230+ verified local ratings</span>
          <div className="hidden sm:block w-px h-5 bg-white/12" aria-hidden="true" />
          <Link
            href="/reviews"
            className="text-sky-400 text-[13px] font-bold font-poppins hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
          >
            Read All Reviews →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
