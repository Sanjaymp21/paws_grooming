"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

const SolidBone = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.82,10.42a4.42,4.42,0,0,0,1.38-3.17A4.27,4.27,0,0,0,16.14,3,4.19,4.19,0,0,0,13,4.46a4.27,4.27,0,0,0-3-1.46A4.27,4.27,0,0,0,5.86,7.25,4.42,4.42,0,0,0,7.24,10.42a4.42,4.42,0,0,0-1.38,3.17A4.27,4.27,0,0,0,9.93,17.8a4.19,4.19,0,0,0,3.16-1.46,4.27,4.27,0,0,0,3,1.46,4.27,4.27,0,0,0,4.07-4.25A4.42,4.42,0,0,0,18.82,10.42Z" />
  </svg>
);

function createRandomBoneConfig(isSpecial: boolean, width: number, height: number, initial = false) {
  const size = isSpecial 
    ? 45 + Math.random() * 20 
    : 15 + Math.random() * 20; 
    
  const targetOpacity = isSpecial 
    ? 0.12 
    : 0.15 + Math.random() * 0.2; 
    
  const speed = isSpecial 
    ? 0.03 + Math.random() * 0.02 
    : 0.06 + Math.random() * 0.08; 
    
  const zDepth = Math.random(); 
  const blur = isSpecial ? 0 : zDepth * 2.5; 
  const finalSpeed = isSpecial ? speed : speed * (1 - zDepth * 0.5); 
  
  const startX = isSpecial
    ? width * 0.25 + Math.random() * (width * 0.5) 
    : Math.random() * width; 
    
  const startY = initial ? Math.random() * height : -100 - Math.random() * 100;

  return {
    startX,
    startY,
    speed: finalSpeed,
    size,
    targetOpacity,
    startRotate: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.06, 
    driftSpeed: 0.0005 + Math.random() * 0.0015, 
    driftAmplitude: isSpecial ? 80 : 20 + Math.random() * 50, 
    blur,
    isSpecial
  };
}

const BoneParticle = ({
  index,
  mouseX,
  mouseY,
  containerWidth,
  containerHeight,
}: {
  index: number;
  mouseX: any;
  mouseY: any;
  containerWidth: number;
  containerHeight: number;
}) => {
  const isSpecial = index === 0;

  const [config, setConfig] = useState(() => 
    createRandomBoneConfig(isSpecial, containerWidth, containerHeight, true)
  );

  const x = useMotionValue(config.startX);
  const y = useMotionValue(config.startY);
  const rotate = useMotionValue(config.startRotate);
  const opacity = useMotionValue(0);

  const repelX = useMotionValue(0);
  const repelY = useMotionValue(0);

  const finalX = useTransform(() => x.get() + repelX.get());
  const finalY = useTransform(() => y.get() + repelY.get());

  const rotateX = useTransform(rotate, (r) => r * 0.6);
  const rotateY = useTransform(x, (xVal) => (xVal / containerWidth) * 45 - 22.5); 

  useAnimationFrame((time, delta) => {
    if (!containerHeight || !containerWidth) return;
    const safeDelta = Math.min(delta, 32);

    let newY = y.get() + config.speed * safeDelta;
    
    let currentBaseX = config.startX + Math.sin(time * config.driftSpeed) * config.driftAmplitude;
    x.set(currentBaseX);
    rotate.set(rotate.get() + config.rotationSpeed * safeDelta);
    
    const mx = mouseX.get();
    const my = mouseY.get();
    
    const parallaxX = (mx - containerWidth / 2) * 0.02 * (1 - config.blur/5);
    const parallaxY = (my - containerHeight / 2) * 0.02 * (1 - config.blur/5);
    
    if (mx !== -1000 && my !== -1000) {
      const dx = (finalX.get() - parallaxX) - mx;
      const dy = (finalY.get() - parallaxY) - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const maxDist = 180;
      if (dist < maxDist && dist > 0) {
        const force = Math.pow((maxDist - dist) / maxDist, 1.5);
        repelX.set(repelX.get() + (dx / dist) * force * 12 * (safeDelta/16));
        repelY.set(repelY.get() + (dy / dist) * force * 12 * (safeDelta/16));
      } else {
        repelX.set(repelX.get() * 0.94);
        repelY.set(repelY.get() * 0.94);
      }
    } else {
      repelX.set(repelX.get() * 0.94);
      repelY.set(repelY.get() * 0.94);
    }
    
    const edgeMargin = 100;
    if (newY < edgeMargin) {
      opacity.set((Math.max(0, newY) / edgeMargin) * config.targetOpacity);
    } else if (newY > containerHeight - edgeMargin) {
      opacity.set((Math.max(0, containerHeight - newY) / edgeMargin) * config.targetOpacity);
    } else {
      opacity.set(config.targetOpacity);
    }

    if (newY > containerHeight + config.size + 50) {
      const newConfig = createRandomBoneConfig(isSpecial, containerWidth, containerHeight, false);
      setConfig(newConfig);
      newY = -config.size - 50;
      x.set(newConfig.startX);
      rotate.set(newConfig.startRotate);
      repelX.set(0);
      repelY.set(0);
    }
    
    y.set(newY);
  });

  return (
    <motion.div
      style={{ 
        x: finalX, 
        y: finalY, 
        rotateZ: rotate,
        rotateX,
        rotateY,
        opacity,
        filter: config.blur > 0 ? `blur(${config.blur}px)` : 'none',
      }}
      className="absolute top-0 left-0 pointer-events-auto"
    >
      <motion.div
        whileHover={{ scale: 1.3, filter: "brightness(1.5)" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] cursor-pointer"
      >
        <SolidBone className="w-[1em] h-[1em]" style={{ fontSize: config.size }} />
      </motion.div>
    </motion.div>
  );
};

export default function AnimatedBones({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boneCount, setBoneCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });

        if (width < 768) setBoneCount(15);
        else if (width < 1024) setBoneCount(25);
        else setBoneCount(40);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" style={{ perspective: "800px" }}>
      {boneCount > 0 && dimensions.width > 0 && Array.from({ length: boneCount }).map((_, i) => (
        <BoneParticle
          key={`bone-${i}`}
          index={i}
          mouseX={mouseX}
          mouseY={mouseY}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}
    </div>
  );
}
