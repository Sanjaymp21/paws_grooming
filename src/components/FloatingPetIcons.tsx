"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, MotionValue } from "framer-motion";

// Custom premium SVG Paths for faces and icons
const ICONS = [
  // Bone
  <path key="1" d="M17 8c.52 0 1.01.19 1.41.53.5.42.8 1.05.8 1.72 0 .97-.63 1.81-1.54 2.15v2.2c.91.34 1.54 1.18 1.54 2.15 0 1.27-1.03 2.25-2.25 2.25-.66 0-1.28-.29-1.72-.8-.34-.4-.53-.89-.53-1.41H9.29c0 .52-.19 1.01-.53 1.41-.44.51-1.06.8-1.72.8-1.22 0-2.25-.98-2.25-2.25 0-.97.63-1.81 1.54-2.15v-2.2c-.91-.34-1.54-1.18-1.54-2.15C4.79 8.98 5.82 8 7.04 8c.66 0 1.28.29 1.72.8.34.4.53.89.53 1.41h5.42c0-.52.19-1.01.53-1.41.44-.51 1.06-.8 1.72-.8z" fill="currentColor"/>,
  // Paw Print
  <path key="2" d="M12 4.5a2.5 2.5 0 0 0-5 0M17 4.5a2.5 2.5 0 0 0-5 0M19.5 8.5a2.5 2.5 0 0 0-5 0M9.5 8.5a2.5 2.5 0 0 0-5 0M12 13.5a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0 9 0ZM21 13.5a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0 9 0Z" fill="currentColor"/>,
  // Dog Face (Modern Outline/Filled hybrid)
  <path key="3" d="M17 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.5 4.5a2 2 0 1 1 3 0M4 9c0-3.31 2.69-6 6-6s6 2.69 6 6v1c1.66 0 3 1.34 3 3v3c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3v-3c0-1.66 1.34-3 3-3V9Zm6-4a4 4 0 0 0-4 4v1h8V9a4 4 0 0 0-4-4Z" fill="currentColor"/>,
  // Cat Face
  <path key="4" d="M12 13a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 5l2 4M19 5l-2 4M3 13c0 4.42 4.03 8 9 8s9-3.58 9-8c0-2.61-1.41-4.93-3.56-6.33L19 4h-4.5c-1.46-.66-3.15-1-4.5-1s-3.04.34-4.5 1H4l1.56 2.67C3.41 8.07 2 10.39 2 13Z" fill="currentColor"/>,
  // Sparkle
  <path key="5" d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
];

const COLORS = [
  "#FFFFFF", // White
  "#FFD54F", // Soft Gold
  "#4F8CFF", // Soft Blue
  "#FDFBF7", // Light Cream
];

// Specific positions to naturally distribute around hero content
const PLACEMENTS = [
  // Mobile / All Devices (10 items)
  { left: "10%", top: "10%", display: "block" },
  { left: "80%", top: "15%", display: "block" },
  { left: "15%", top: "85%", display: "block" },
  { left: "85%", top: "80%", display: "block" },
  { left: "45%", top: "5%", display: "block" },
  { left: "5%", top: "45%", display: "block" },
  { left: "50%", top: "90%", display: "block" },
  { left: "90%", top: "40%", display: "block" },
  { left: "25%", top: "25%", display: "block" },
  { left: "70%", top: "60%", display: "block" },

  // Tablet & Desktop (12 items)
  { left: "30%", top: "75%", display: "hidden sm:block" },
  { left: "65%", top: "20%", display: "hidden sm:block" },
  { left: "15%", top: "55%", display: "hidden sm:block" },
  { left: "88%", top: "65%", display: "hidden sm:block" },
  { left: "40%", top: "35%", display: "hidden sm:block" },
  { left: "60%", top: "85%", display: "hidden sm:block" },
  { left: "5%", top: "25%", display: "hidden sm:block" },
  { left: "75%", top: "45%", display: "hidden sm:block" },
  { left: "95%", top: "10%", display: "hidden sm:block" },
  { left: "20%", top: "5%", display: "hidden sm:block" },
  { left: "55%", top: "50%", display: "hidden sm:block" },
  { left: "35%", top: "50%", display: "hidden sm:block" },

  // Desktop Only (15 items)
  { left: "45%", top: "20%", display: "hidden md:block" },
  { left: "25%", top: "65%", display: "hidden md:block" },
  { left: "75%", top: "85%", display: "hidden md:block" },
  { left: "12%", top: "35%", display: "hidden md:block" },
  { left: "85%", top: "25%", display: "hidden md:block" },
  { left: "55%", top: "70%", display: "hidden md:block" },
  { left: "38%", top: "10%", display: "hidden md:block" },
  { left: "92%", top: "55%", display: "hidden md:block" },
  { left: "18%", top: "75%", display: "hidden md:block" },
  { left: "68%", top: "15%", display: "hidden md:block" },
  { left: "50%", top: "35%", display: "hidden md:block" },
  { left: "8%", top: "65%", display: "hidden md:block" },
  { left: "95%", top: "75%", display: "hidden md:block" },
  { left: "35%", top: "95%", display: "hidden md:block" },
  { left: "65%", top: "95%", display: "hidden md:block" },
];

interface FloatingIconProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  iconIndex: number;
  placement: { left: string; top: string; display: string };
  index: number;
}

const FloatingIcon = ({ mouseX, mouseY, iconIndex, placement, index }: FloatingIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Spring physics for the repel effect
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const repelX = useSpring(0, springConfig);
  const repelY = useSpring(0, springConfig);

  useEffect(() => {
    // Unsubscribe handlers
    const unsubX = mouseX.on("change", updateRepel);
    const unsubY = mouseY.on("change", updateRepel);

    function updateRepel() {
      if (!ref.current) return;
      
      const mX = mouseX.get();
      const mY = mouseY.get();
      
      // If mouse is off-screen (like -1000 from default), return to 0
      if (mX < 0 && mY < 0) {
        repelX.set(0);
        repelY.set(0);
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const parentRect = ref.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      // Absolute center of the icon relative to the parent section
      const iconCenterX = (rect.left - parentRect.left) + rect.width / 2;
      const iconCenterY = (rect.top - parentRect.top) + rect.height / 2;

      const dx = mX - iconCenterX;
      const dy = mY - iconCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const REPEL_RADIUS = 120;
      const MAX_REPEL = 40;

      if (distance < REPEL_RADIUS) {
        // Calculate repel magnitude (closer = stronger push)
        const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
        // Calculate angle
        const angle = Math.atan2(dy, dx);
        
        // Move away from cursor
        repelX.set(-Math.cos(angle) * force * MAX_REPEL);
        repelY.set(-Math.sin(angle) * force * MAX_REPEL);
      } else {
        repelX.set(0);
        repelY.set(0);
      }
    }

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, repelX, repelY]);

  // Randomize continuous float animation properties
  const floatDuration = 15 + (index % 5) * 5; // 15s to 35s for smooth, sweeping travel
  const delay = index * 0.2;
  const size = 32 + (index % 3) * 12; // 32px, 44px, 56px
  const opacity = 0.35 + (index % 4) * 0.15; // 0.35 to 0.8
  const colorHex = COLORS[index % COLORS.length];

  // Create sweeping random paths based on index
  const yDistance = 20 + (index % 4) * 15; // 20vh to 65vh travel
  const xDistance = 15 + (index % 5) * 10; // 15vw to 55vw travel

  return (
    <motion.div
      ref={ref}
      style={{
        left: placement.left,
        top: placement.top,
        x: repelX,
        y: repelY,
        color: colorHex
      }}
      className={`absolute z-[1] pointer-events-none ${placement.display}`}
    >
      <motion.div
        animate={{
          y: [`-${yDistance}vh`, `${yDistance}vh`, `-${yDistance}vh`],
          x: [`-${xDistance}vw`, `${xDistance}vw`, `-${xDistance}vw`],
          rotate: [-25, 25, -25],
        }}
        transition={{
          duration: floatDuration,
          delay: delay,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: size, height: size, opacity }}
        className="blur-[1px] drop-shadow-sm"
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          {ICONS[iconIndex % ICONS.length]}
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default function FloatingPetIcons({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden="true">
      {PLACEMENTS.map((placement, i) => (
        <FloatingIcon 
          key={i} 
          index={i} 
          placement={placement} 
          iconIndex={i} 
          mouseX={mouseX} 
          mouseY={mouseY} 
        />
      ))}
    </div>
  );
}
