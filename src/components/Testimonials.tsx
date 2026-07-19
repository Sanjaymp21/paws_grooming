"use client";

import React from "react";
import { mockReviews } from "../utils/mockData";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0d1a4a] to-[#060e2c]">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-blue-900/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[350px] rounded-full bg-sky-900/25 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="type-eyebrow mb-3">Testimonials</p>
          <h2 className="type-h1 !text-white mb-4">
            Loved by Coimbatore&apos;s{" "}
            <span className="gradient-text-warm">Pet Parents</span>
          </h2>
          <p className="type-body !text-slate-400 max-w-xl mx-auto">
            Real feedback from our neighbours who trust us with their most beloved companions, session after session.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {mockReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.14 }}
              className="relative flex flex-col glass-card-dark rounded-[28px] p-7 border border-white/6 card-hover overflow-hidden"
              aria-label={`Review by ${review.customerName}`}
            >
              {/* Subtle gradient stripe at top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500/50 via-blue-400/70 to-sky-500/50" aria-hidden="true" />

              {/* Large quote watermark */}
              <Quote className="absolute right-5 top-5 h-14 w-14 text-white/5 rotate-180" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-1 mb-5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Review text */}
              <blockquote className="flex-1 mb-6">
                <p className="text-sm font-inter text-slate-300 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between pt-5 border-t border-white/8">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.avatar}
                    alt={review.customerName}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-sky-400/30"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-poppins font-bold text-[13px] text-white leading-none">{review.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-inter mt-0.5">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.petPic}
                    alt={review.petName}
                    className="h-6 w-6 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-poppins font-semibold text-slate-300">{review.petName.split(" ")[0]}</span>
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
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <span className="text-white font-bold font-poppins text-sm">4.9 / 5</span>
            <span className="text-slate-400 text-xs font-inter">on Google</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <span className="text-slate-400 text-xs font-inter">230+ verified local ratings</span>
          <div className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <Link
            href="/reviews"
            className="text-sky-400 text-xs font-bold font-poppins hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
          >
            Read All Reviews →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
