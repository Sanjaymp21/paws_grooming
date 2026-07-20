"use client";

import { useEffect, useRef } from "react";

const PAW_PATHS = [
  '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8.5C13.6569 8.5 15 7.15685 15 5.5C15 3.84315 13.6569 2.5 12 2.5C10.3431 2.5 9 3.84315 9 5.5C9 7.15685 10.3431 8.5 12 8.5Z" /><path d="M18.5 12.5C20.1569 12.5 21.5 11.1569 21.5 9.5C21.5 7.84315 20.1569 6.5 18.5 6.5C16.8431 6.5 15.5 7.84315 15.5 9.5C15.5 11.1569 16.8431 12.5 18.5 12.5Z" /><path d="M5.5 12.5C7.15685 12.5 8.5 11.1569 8.5 9.5C8.5 7.84315 7.15685 6.5 5.5 6.5C3.84315 6.5 2.5 7.84315 2.5 9.5C2.5 11.1569 3.84315 12.5 5.5 12.5Z" /><path d="M12 11C9.23858 11 7 13.2386 7 16C7 18.7614 9.23858 21 12 21C14.7614 21 17 18.7614 17 16C17 13.2386 14.7614 11 12 11Z" /></svg>',
  '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z" /><path d="M19 13C20.6569 13 22 11.6569 22 10C22 8.34315 20.6569 7 19 7C17.3431 7 16 8.34315 16 10C16 11.6569 17.3431 13 19 13Z" /><path d="M5 13C6.65685 13 8 11.6569 8 10C8 8.34315 6.65685 7 5 7C3.34315 7 2 8.34315 2 10C2 11.6569 3.34315 13 5 13Z" /><path d="M12 11.5C9.23858 11.5 7 13.7386 7 16.5C7 19.2614 9.23858 21.5 12 21.5C14.7614 21.5 17 19.2614 17 16.5C17 13.7386 14.7614 11.5 12 11.5Z" /></svg>'
];

export default function CursorPawTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop devices
    if (typeof window === "undefined" || window.innerWidth <= 1024) return;

    let lastX = 0;
    let lastY = 0;
    
    // Using requestAnimationFrame to debounce scroll/mouse events
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const dist = Math.hypot(currentX - lastX, currentY - lastY);
          // Spawn paw print every 35 pixels
          if (dist > 35) {
            createPaw(currentX, currentY);
            lastX = currentX;
            lastY = currentY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const createPaw = (x: number, y: number) => {
      if (!containerRef.current) return;

      const paw = document.createElement("div");
      
      const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      const rotation = -20 + Math.random() * 40; // -20 to 20
      const svgType = Math.floor(Math.random() * PAW_PATHS.length);
      const isAlt = Math.random() > 0.5;

      paw.innerHTML = PAW_PATHS[svgType];
      
      paw.className = "pointer-events-none fixed text-[#2563EB] flex items-center justify-center";
      paw.style.width = "28px";
      paw.style.height = "28px";
      // Position center of paw exactly on cursor
      paw.style.left = `${x - 14}px`;
      paw.style.top = `${y - 14}px`;
      paw.style.opacity = "0.65"; // Increased opacity further for better visibility
      paw.style.transform = `scale(${scale}) rotate(${rotation}deg) ${isAlt ? 'scaleX(-1)' : ''}`;

      containerRef.current.appendChild(paw);

      // Force reflow to ensure the starting styles are applied before animating
      void paw.offsetWidth;

      // Animate out
      paw.style.transition = "opacity 2000ms cubic-bezier(0.25, 1, 0.5, 1), transform 2000ms cubic-bezier(0.25, 1, 0.5, 1)";
      paw.style.opacity = "0";
      paw.style.transform = `scale(${scale * 0.6}) rotate(${rotation}deg) ${isAlt ? 'scaleX(-1)' : ''}`;
      paw.style.transformOrigin = "center center";

      // Cleanup after animation completes
      setTimeout(() => {
        if (paw.parentNode) {
          paw.parentNode.removeChild(paw);
        }
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true" />;
}
