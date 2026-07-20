"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section id="before-after" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-sky-50/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-50/40 blur-[100px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="type-eyebrow">Transformations</p>
          <h2 className="type-h1 mt-1 mb-4">Coimbatore&apos;s Best Pet Makeovers</h2>
          <p className="type-body text-slate-500">
            Drag the slider horizontally to view the before-and-after transformation of pets groomed in our salon. See the difference our gentle care and premium styling can make!
          </p>
        </motion.div>

        {/* Interactive Comparison Widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative h-[460px] w-full rounded-[28px] overflow-hidden shadow-2xl shadow-slate-900/15 border border-white cursor-ew-resize select-none"
          >
            {/* After Image (Full Background) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=1000&h=600&fit=crop"
              alt="Groomed After - Happy Poodle styling"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute right-4 bottom-4 py-1.5 px-3 rounded-xl bg-emerald-500/90 text-white font-poppins text-xs font-bold shadow z-20">
              After Grooming ✨
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1000&h=600&fit=crop"
                alt="Messy Before - Shaggy retriever puppy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute left-4 bottom-4 py-1.5 px-3 rounded-xl bg-navy-blue/90 text-white font-poppins text-xs font-bold shadow z-20">
                Before Grooming 🐾
              </div>
            </div>

            {/* Floating Instructions */}
            <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none z-20">
              <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-navy-blue text-[10px] font-bold font-poppins uppercase tracking-wider shadow">
                ↔ Drag Center Bar to Compare
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/90 cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-[#1E3A8A] flex items-center justify-center slider-handle">
                <ArrowLeftRight className="h-5 w-5 stroke-[2.5px]" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
