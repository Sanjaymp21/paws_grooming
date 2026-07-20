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
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-sky-50/60 blur-[100px]" />
        <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-indigo-50/40 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="type-eyebrow">Visual Tour</p>
          <h2 className="type-h1 mt-1 mb-4">Happy Pets &amp; Salon Gallery</h2>
          <p className="type-body text-slate-500">
            Take a look inside our modern open-concept Coimbatore grooming salon. Pristine cleanliness and absolute safety at every station.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 rounded-full font-poppins text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-lg shadow-blue-200/50"
                    : "text-slate-500 bg-white border border-slate-200 hover:border-sky-200 hover:text-[#1E3A8A] hover:bg-sky-50/60"
                }`}
                style={isActive ? {
                  background: "linear-gradient(135deg, #1d4ed8, #1E3A8A)",
                } : {}}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="gallery-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "linear-gradient(135deg, #1d4ed8, #1E3A8A)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative ${aspectRatios[idx % aspectRatios.length]} cursor-pointer`}
              >
                <div className="absolute inset-0 rounded-[22px] overflow-hidden shadow-lg shadow-slate-900/8 border border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a4a]/80 via-[#0d1a4a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Hover content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="inline-block mb-1 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[9px] font-bold font-poppins uppercase tracking-widest">
                          {item.category}
                        </span>
                        <h4 className="text-white font-poppins font-bold text-sm leading-tight">{item.title}</h4>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0 ml-3">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Corner category chip (always visible) */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold font-poppins text-[#1E3A8A] shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100/60">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <p className="text-sm font-inter text-slate-600">
                Want your pet featured?{" "}
                <span className="font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Tag @SSTGroomers on Instagram
                </span>
              </p>
              <Camera className="h-4 w-4 text-purple-400" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
