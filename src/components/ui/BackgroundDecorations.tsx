"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* ── FOUNDATION LIQUID WAVES & AURORAS (EDGES ONLY) ── */}
      {/* Top Left Aurora Flare */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply opacity-25 filter blur-[100px] animate-pulse"
        style={{
          background: "radial-gradient(circle, #000000 0%, #FACC15 50%, transparent 100%)",
        }}
      />
      {/* Top Right Purple/Lavender Aurora */}
      <div 
        className="absolute top-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full mix-blend-screen opacity-20 filter blur-[120px]"
        style={{
          background: "radial-gradient(circle, #FACC15 0%, #C084FC 60%, transparent 100%)",
        }}
      />
      {/* Center Top Peach Glow (keeps main area bright but adds slight warmth) */}
      <div 
        className="absolute top-[-15%] left-[30%] w-[40vw] h-[30vw] rounded-full mix-blend-multiply opacity-15 filter blur-[90px]"
        style={{
          background: "radial-gradient(ellipse, #FDBA74 0%, transparent 70%)",
        }}
      />
      {/* Bottom Left Indigo/Cyan Mesh */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply opacity-20 filter blur-[100px]"
        style={{
          background: "radial-gradient(circle, #171717 0%, #22D3EE 60%, transparent 100%)",
        }}
      />
      {/* Bottom Right Pink/Coral Wave Blob */}
      <div 
        className="absolute bottom-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply opacity-25 filter blur-[110px]"
        style={{
          background: "radial-gradient(circle, #EC4899 0%, #FB7185 50%, #FACC15 100%)",
        }}
      />
      {/* Bottom Center Mint Green Soft Blend */}
      <div 
        className="absolute bottom-[-15%] left-[25%] w-[50vw] h-[30vw] rounded-full mix-blend-screen opacity-10 filter blur-[100px]"
        style={{
          background: "radial-gradient(ellipse, #34D399 0%, transparent 80%)",
        }}
      />

      {/* ── TRANSITIONAL SVG GRADIENT WAVES (BOTTOM & SIDES) ── */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[300px] opacity-15" 
        viewBox="0 0 1440 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,160 C320,320 640,80 960,190 C1280,300 1380,210 1440,160 L1440,300 L0,300 Z" 
          fill="url(#wave-grad-1)" 
        />
        <path 
          d="M0,210 C420,110 800,280 1100,160 C1300,80 1400,200 1440,240 L1440,300 L0,300 Z" 
          fill="url(#wave-grad-2)" 
          opacity="0.6"
        />
        <defs>
          <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FACC15" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── FLOATING GLASSMORPHISM BUBBLES ── */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[4%] w-[70px] h-[70px] rounded-full border border-white/30"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 70%)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
          backdropFilter: "blur(4px)",
        }}
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[35%] right-[5%] w-[110px] h-[110px] rounded-full border border-white/20"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.02) 80%)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.03), inset 0 1px 0 rgba(255,255,255,0.3)",
          backdropFilter: "blur(3px)",
        }}
      />
      <motion.div 
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[8%] w-[45px] h-[45px] rounded-full border border-white/25"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 70%)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* ── FLOATING PARTICLES & REFLECTIONS ── */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-sky-300/40"
            style={{
              top: `${15 + i * 14}%`,
              left: i % 2 === 0 ? `${5 + i * 2}%` : `${90 - i * 2}%`,
              boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      {/* ── DECORATIVE PET ELEMENTS & SILHOUETTES (EDGE PLACEMENT) ── */}
      {/* Left Top Paw Icon */}
      <motion.div 
        animate={{ rotate: [0, 8, 0] }} 
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-[18%] left-[2%] opacity-15 text-indigo-custom"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5s.67 1.5 1.5 1.5zm9 0c.83 0 1.5-.67 1.5-1.5S17.33 8 16.5 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5.5-2c.83 0 1.5-.67 1.5-1.5S11.83 5 11 5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
        </svg>
      </motion.div>

      {/* Right Mid Sparkles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} 
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[48%] right-[3%] text-pink-custom"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4ZM19 17L20.25 19.75L23 21L20.25 22.25L19 25L17.75 22.25L15 21L17.75 19.75L19 17ZM19 3L20.25 5.75L23 7L20.25 8.25L19 11L17.75 8.25L15 7L17.75 5.75L19 3Z" />
        </svg>
      </motion.div>

      {/* Left Mid Bone Silhouette */}
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[52%] left-[2%] opacity-15 text-royal-blue"
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 5c-1.38 0-2.5 1.12-2.5 2.5 0 .28.05.54.14.78l-5.28 2.64C8.95 10.36 8.32 10 7.5 10 6.12 10 5 11.12 5 12.5S6.12 15 7.5 15c.82 0 1.45-.36 1.86-.92l5.28 2.64c-.09.24-.14.5-.14.78 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5c0-.82-.36-1.45-.92-1.86l-2.64-5.28c.24.09.5.14.78.14 1.38 0 2.5-1.12 2.5-2.5S18.38 5 17 5zM7.5 13c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm9.5 5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
        </svg>
      </motion.div>

      {/* Right Bottom Paw Icon */}
      <motion.div 
        animate={{ y: [0, -12, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[3%] opacity-15 text-purple-custom"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5s.67 1.5 1.5 1.5zm9 0c.83 0 1.5-.67 1.5-1.5S17.33 8 16.5 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5.5-2c.83 0 1.5-.67 1.5-1.5S11.83 5 11 5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
        </svg>
      </motion.div>

      {/* Left Bottom Heart Silhouette */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-[12%] left-[4%] opacity-15 text-coral-custom"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>
    </div>
  );
}
