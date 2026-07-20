"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Gallery", href: "/gallery" },
  { name: "Safety", href: "/safety" },
  { name: "Reviews", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/92 backdrop-blur-3xl shadow-[0_4px_40px_rgba(30,58,138,0.13),0_1px_0_rgba(96,165,250,0.15)] border-b border-sky-100/60 py-2.5"
          : "bg-white/60 backdrop-blur-2xl border-b border-white/40 py-4"
      }`}
    >
      {/* Top shimmer line — always visible but stronger when not scrolled */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent, rgba(96,165,250,0.55) 30%, rgba(99,102,241,0.50) 70%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(96,165,250,0.35) 30%, rgba(99,102,241,0.30) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="SST Groomers — Home">
            <div
              className="relative h-10 w-10 rounded-xl flex items-center justify-center text-white overflow-hidden group-hover:scale-105 transition-transform duration-200 logo-glow"
              style={{
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563eb 50%, #3b82f6 100%)",
              }}
            >
              <div className="absolute inset-0 shine" aria-hidden="true" />
              <Scissors className="h-[19px] w-[19px] rotate-45 relative z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-poppins font-bold text-[15.5px] tracking-tight text-[#1E3A8A]">
                SST Groomers
              </span>
              <span className="text-[8.5px] font-bold tracking-[0.22em] text-sky-500 uppercase">
                Coimbatore
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full font-poppins text-[13px] transition-colors duration-150 ${
                    active
                      ? "text-[#1E3A8A] font-semibold"
                      : "text-slate-500 hover:text-[#1E3A8A] font-medium"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 nav-pill-active rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book"
              className="btn-primary text-[13px] px-5 py-2.5 rounded-full shine"
              style={{ boxShadow: "0 6px 24px rgba(29,78,216,0.40), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-200" aria-hidden="true" />
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-[#1E3A8A] hover:bg-sky-50/80 transition-all border border-transparent hover:border-sky-100"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden border-t border-sky-100/60 overflow-hidden"
            style={{ background: "rgba(248, 252, 255, 0.97)", backdropFilter: "blur(32px)" }}
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-1.5">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-3 rounded-xl font-poppins text-sm transition-all ${
                        active
                          ? "text-[#1E3A8A] font-semibold border border-sky-100/80"
                          : "text-slate-500 hover:bg-sky-50/70 hover:text-[#1E3A8A] font-medium"
                      }`}
                      style={active ? {
                        background: "linear-gradient(135deg, rgba(219,234,254,0.80), rgba(224,231,255,0.70))",
                        boxShadow: "0 2px 12px rgba(30,58,138,0.08)"
                      } : {}}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2.5 shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" aria-hidden="true" />
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 border-t border-slate-100/80 mt-2">
                <Link
                  href="/book"
                  className="btn-primary w-full justify-center text-sm py-3.5 rounded-xl shine"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
