import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Background variant */
  bg?: "white" | "light" | "dark" | "none";
}

/**
 * Consistent max-width, padding, and background for every page section.
 */
export default function SectionWrapper({
  children,
  className = "",
  id,
  bg = "white",
}: SectionWrapperProps) {
  const bgMap = {
    white: "bg-white",
    light: "bg-gradient-to-b from-white to-sky-50/50",
    dark: "bg-gradient-to-b from-[#0f1e55] to-[#070f2e]",
    none: "",
  };

  return (
    <section id={id} className={`py-20 ${bgMap[bg]} relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
