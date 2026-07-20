"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const transformation = {
  id: "single-transformation",
  name: "Grooming Transformation",
  beforeUrl: "/gallery/before_grooming.png",
  afterUrl: "/gallery/after_grooming.png",
  beforeAlt: "Slightly messy fur, natural appearance before grooming",
  afterAlt: "Professionally trimmed, fresh and clean after grooming"
};

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
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-yellow-50/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-yellow-100/40 blur-[100px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-1 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900 animate-pulse" />
            Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Coimbatore&apos;s Best Pet Makeovers</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-2xl mx-auto">
            Drag the slider horizontally to view the before-and-after grooming results of this real transformation. See the difference our expert styling makes!
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
            className="relative h-[460px] w-full rounded-[32px] overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-100 cursor-ew-resize select-none bg-slate-50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={transformation.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* After Image (Full Background) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={transformation.afterUrl}
                  alt={transformation.afterAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute right-4 bottom-4 py-1.5 px-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-poppins text-xs font-bold shadow-lg z-20">
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
                    src={transformation.beforeUrl}
                    alt={transformation.beforeAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-4 bottom-4 py-1.5 px-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-poppins text-xs font-bold shadow-lg z-20">
                    Before Grooming 🐾
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Instructions */}
            <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none z-20">
              <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 text-[10px] font-bold font-poppins uppercase tracking-wider shadow border border-white/50">
                ← Drag Slider to Compare →
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/90 cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-shadow group"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-zinc-900 flex items-center justify-center border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.1),0_0_15px_rgba(255,255,255,0.8)] transition-transform duration-300 hover:scale-110">
                <ArrowLeftRight className="h-5 w-5 stroke-[2.5px]" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
