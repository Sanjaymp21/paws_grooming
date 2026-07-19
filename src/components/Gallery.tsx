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
      : galleryItems.filter((item) => {
          if (activeCategory === "Happy Pets") return item.category === "Happy Pets";
          if (activeCategory === "Salon Interior") return item.category === "Salon Interior";
          if (activeCategory === "Styling Sessions") return item.category === "Styling Sessions";
          return true;
        });

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Visual Tour
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Happy Pets &amp; Salon Gallery
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            Take a look inside our modern open-concept Coimbatore grooming salon. We maintain pristine cleanliness and absolute safety at every station.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-poppins text-xs font-bold transition-all relative ${
                activeCategory === category
                  ? "text-white bg-navy-blue shadow-md"
                  : "text-slate-gray hover:text-navy-blue hover:bg-sky-50 border border-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-[24px] overflow-hidden shadow-md glass-card p-2 border border-sky-100/50 aspect-[4/3] cursor-pointer"
              >
                <div className="w-full h-full rounded-[18px] overflow-hidden relative bg-sky-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  {/* Frosted hover overlay */}
                  <div className="absolute inset-0 bg-navy-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <ZoomIn className="h-6 w-6 text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="text-[10px] text-sky-200 uppercase font-poppins font-bold tracking-wider">
                      {item.category}
                    </span>
                    <h5 className="text-white font-poppins font-bold text-sm mt-0.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Small photo callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-gray font-inter flex items-center justify-center gap-1.5">
            <Camera className="h-4 w-4 text-sky-400" />
            Want to see your pet featured? Tag us on Instagram <span className="font-bold text-navy-blue">@SSTGroomers</span>
          </p>
        </div>

      </div>
    </section>
  );
}
