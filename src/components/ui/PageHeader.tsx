import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Shared section header used across all pages.
 * Provides consistent eyebrow → title → subtitle hierarchy.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} space-y-3 mb-14 ${className}`}
    >
      {eyebrow && (
        <p className="type-eyebrow">{eyebrow}</p>
      )}
      <h2 className="type-h1">{title}</h2>
      {subtitle && (
        <p className="type-body max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
