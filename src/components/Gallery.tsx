"use client";

import React, { useState } from "react";
import { galleryItems, galleryCategories } from "../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Camera } from "lucide-react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const aspectRatios = ["aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]", "aspect-square"];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Keeping center clean and bright */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <span className="type-eyebrow">Visual Tour</span>
          <h2 className="type-section-heading mt-2.5 mb-4">Happy Pets &amp; Salon Gallery</h2>
          <p className="type-section-subtitle max-w-xl mx-auto">
            Take a look inside our modern open-concept Coimbatore grooming salon. Pristine cleanliness and absolute safety at every station.
          </p>
        </motion.div>

        {/* Filter Tabs Pills (Inter font) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileTap={{ scale: 0.96 }}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 bg-white/60 border border-slate-200 hover:border-blue-400 hover:text-zinc-900"
                }`}
              >
                <span className="relative z-10">{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="gallery-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, #000000, #171717)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Masonry-like Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative ${aspectRatios[idx % aspectRatios.length]} cursor-pointer`}
              >
                <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Hover content details */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2.5 group-hover:translate-y-0">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-blue-400/30 text-yellow-100 text-[9px] font-extrabold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h4 className="text-white font-bold text-base leading-tight">{item.title}</h4>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 ml-3">
                        <ZoomIn className="h-4.5 w-4.5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Regular floating badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold text-zinc-900 shadow-sm border border-slate-100">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 border border-pink-500/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <p className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Tag @SSTGroomers on Instagram to get featured!
              </p>
              <Camera className="h-4.5 w-4.5 text-purple-400" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
