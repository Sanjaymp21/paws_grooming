"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Menu, X, Sparkles, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Gallery",  href: "/gallery" },
  { name: "Safety",   href: "/safety" },
  { name: "Reviews",  href: "/reviews" },
  { name: "FAQ",      href: "/faq" },
  { name: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl shadow-[0_2px_24px_rgba(30,58,138,0.08)] border-b border-sky-100/50 py-3"
          : "bg-white/70 backdrop-blur-xl py-4"
      }`}
    >
      {/* Top shimmer line */}
      {!scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" aria-hidden="true" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="SST Groomers — Home">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#3b82f6] flex items-center justify-center text-white shadow-lg shadow-blue-200/50 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
              <div className="absolute inset-0 shine" aria-hidden="true" />
              <Scissors className="h-[18px] w-[18px] rotate-45 relative z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-poppins font-bold text-[15px] tracking-tight text-[#1E3A8A]">
                SST Groomers
              </span>
              <span className="text-[8.5px] font-bold tracking-[0.2em] text-sky-500 uppercase">
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
                      className="absolute inset-0 bg-sky-50 border border-sky-100 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 hover:text-[#1E3A8A] font-poppins transition-colors"
              aria-label="Call SST Groomers"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              +91 98765 43210
            </a>
            <Link
              href="/book"
              className="btn-primary text-[13px] px-5 py-2.5 rounded-full shine"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-200" aria-hidden="true" />
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-[#1E3A8A] hover:bg-sky-50 transition-colors"
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden border-t border-sky-100/50 bg-white/96 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-1.5">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2.5 rounded-xl font-poppins text-sm transition-all ${
                        active
                          ? "bg-sky-50 text-[#1E3A8A] font-semibold border border-sky-100"
                          : "text-slate-500 hover:bg-sky-50/60 hover:text-[#1E3A8A] font-medium"
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2 shrink-0" aria-hidden="true" />}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 mt-1">
                <Link
                  href="/book"
                  className="btn-primary w-full justify-center text-sm py-3 rounded-xl shine"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Book Appointment
                </Link>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-500 font-poppins hover:text-[#1E3A8A] transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
