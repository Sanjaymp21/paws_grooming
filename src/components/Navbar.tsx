"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Menu, X, Sparkles, ShoppingBag, LogIn, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, signOutUserWithSupabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import LoginRequiredModal from "./LoginRequiredModal";

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
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOutUserWithSupabase();
    setUser(null);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Progressive scroll intensity (0 to 1 over first 150px)
  const intensity = Math.min(scrollY / 150, 1);

  // Calculate dynamic width: starts at 94% on top, shrinks to 90% as scroll proceeds
  const widthPercentage = 94 - intensity * 4;

  return (
    <>
      {/* Navbar Fixed Container */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{
          paddingTop: scrolled ? "10px" : "20px",
          transition: "padding-top 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="pointer-events-auto w-full"
          style={{
            maxWidth: `${widthPercentage}%`,
            transition: "max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Main Floating Glassmorphic Pill */}
          <div
            style={{
              borderRadius: "24px",
              backgroundColor: scrolled ? "var(--navbar-bg-scrolled)" : "var(--navbar-bg)",
              backdropFilter: `blur(${scrolled ? 28 : 20}px)`,
              WebkitBackdropFilter: `blur(${scrolled ? 28 : 20}px)`,
              border: "1px solid var(--navbar-border)",
              boxShadow: scrolled
                ? "0 25px 65px rgba(0, 0, 0, 0.18), 0 12px 30px rgba(37, 99, 235, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                : "0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="relative overflow-hidden"
          >
            {/* Shimmer top reflection edge */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.9) 70%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Inner Content Padding & Layout */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: scrolled ? "10px 24px" : "16px 28px",
                transition: "padding 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3.5 group flex-shrink-0"
                aria-label="SST Groomers — Home"
              >
                {/* Logo Icon with hover motion */}
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                  className="relative flex items-center justify-center text-white overflow-hidden flex-shrink-0"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #000000 0%, #171717 55%, #FACC15 100%)",
                    boxShadow: "0 6px 20px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="absolute inset-0 shine" aria-hidden="true" />
                  <Scissors className="h-5.5 w-5.5 rotate-45 relative z-10" />
                </motion.div>

                {/* Logo Brand Name Text */}
                <div className="flex flex-col justify-center leading-none gap-0.5">
                  <span className="font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-zinc-900 dark:group-hover:text-yellow-400 transition-colors duration-200 text-lg">
                    SST Groomers
                  </span>
                  <span className="font-bold uppercase text-zinc-900 dark:text-yellow-400 tracking-[0.24em] text-[8.5px]">
                    Coimbatore
                  </span>
                </div>
              </Link>

              {/* Desktop Nav links (Inter font, animated state transitions) */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative group px-2.5 xl:px-3.5 py-2 rounded-xl text-xs font-poppins font-bold transition-all duration-300 border flex items-center justify-center ${
                        active
                          ? "bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-yellow-400 dark:to-yellow-500 dark:border-yellow-400 dark:text-black text-white border-zinc-900 shadow-lg shadow-blue-200/35 scale-[1.03]"
                          : "bg-yellow-50/50 dark:bg-slate-900/50 border-[#D1D5DB] dark:border-white/10 text-[#334155] dark:text-slate-300 hover:bg-yellow-100/50 dark:hover:bg-slate-800/80 hover:border-zinc-900 dark:hover:border-yellow-400/50 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Right Side Buttons (Products | Login | Book Now) */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                {/* Products Store Button */}
                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/products"
                    className="relative inline-flex items-center gap-1.5 font-poppins font-bold text-xs px-4 py-2.5 rounded-xl border bg-yellow-50/50 dark:bg-slate-900/50 border-[#D1D5DB] dark:border-white/10 text-[#334155] dark:text-slate-300 hover:bg-yellow-100/50 dark:hover:bg-slate-800/80 hover:border-zinc-900 dark:hover:border-yellow-400/50 hover:text-zinc-900 dark:hover:text-white transition-all"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Products</span>
                  </Link>
                </motion.div>

                {/* Auth: Dynamic Profile Button & Dropdown containing Logout */}
                {user ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                      className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-xs font-poppins font-bold text-zinc-900 dark:text-yellow-400 transition-all cursor-pointer shadow-sm select-none"
                    >
                      <div className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-yellow-400 text-yellow-400 dark:text-zinc-900 flex items-center justify-center font-black text-[10.5px] uppercase shadow-sm shrink-0">
                        {user.user_metadata?.full_name ? user.user_metadata.full_name[0] : (user.email ? user.email[0] : "U")}
                      </div>
                      <span className="max-w-[100px] truncate">
                        Profile
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Profile Dropdown Popup Menu */}
                    <AnimatePresence>
                      {isProfileOpen && (
                        <>
                          {/* Backdrop to close dropdown when clicking outside */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsProfileOpen(false)}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-[#111827] border border-amber-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl z-50 overflow-hidden"
                          >
                            {/* Header info */}
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/8">
                              <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-900 font-black text-base flex items-center justify-center shadow-md shrink-0">
                                {user.user_metadata?.full_name ? user.user_metadata.full_name[0] : (user.email ? user.email[0] : "U")}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-poppins font-bold text-xs text-zinc-900 dark:text-white truncate">
                                  {user.user_metadata?.full_name || "Pet Lover"}
                                </h4>
                                <p className="font-inter text-[11px] text-slate-400 dark:text-slate-400 truncate">
                                  {user.email}
                                </p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold uppercase tracking-wider">
                                  Logged In 🐾
                                </span>
                              </div>
                            </div>

                            {/* Logout Action Button inside Profile */}
                            <div className="pt-3">
                              <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 font-poppins font-bold text-xs hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all cursor-pointer shadow-sm"
                              >
                                <LogOut className="h-4 w-4" />
                                <span>Log Out</span>
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/login"
                      className="relative inline-flex items-center gap-1.5 font-poppins font-bold text-xs px-4 py-2.5 rounded-xl border bg-yellow-50/50 dark:bg-slate-900/50 border-[#D1D5DB] dark:border-white/10 text-[#334155] dark:text-slate-300 hover:bg-yellow-100/50 dark:hover:bg-slate-800/80 hover:border-zinc-900 dark:hover:border-yellow-400/50 hover:text-zinc-900 dark:hover:text-white transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                )}

                {/* Book Appointment CTA */}
                <motion.div 
                  whileHover={{ scale: 1.03, y: -1 }} 
                  whileTap={{ scale: 0.97 }} 
                >
                  {user ? (
                    <Link
                      href="/book"
                      className="relative inline-flex items-center gap-2 font-poppins font-bold text-white overflow-hidden shine text-xs px-4.5 py-2.5"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                        boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        textDecoration: "none",
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                      <span>Book Now</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowLoginModal(true)}
                      className="relative inline-flex items-center gap-2 font-poppins font-bold text-white overflow-hidden shine text-xs px-4.5 py-2.5 cursor-pointer"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                        boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                      <span>Book Now</span>
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Mobile Drawer menu toggle button */}
              <motion.button
                onClick={() => setIsOpen((o) => !o)}
                whileTap={{ scale: 0.92 }}
                className="lg:hidden relative flex items-center justify-center transition-all duration-200"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: isOpen
                    ? "rgba(37, 99, 235, 0.08)"
                    : "rgba(15, 23, 42, 0.04)",
                  border: isOpen ? "1px solid rgba(37, 99, 235, 0.2)" : "1px solid rgba(0, 0, 0, 0.06)",
                  color: isOpen ? "#000000" : "#475569",
                }}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-5.5 w-5.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-5.5 w-5.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Navigation Drawer Panel */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id="mobile-nav"
                  key="mobile-drawer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden overflow-hidden"
                >
                  <div
                    className="mx-6"
                    style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.15) 30%, rgba(139,92,246,0.15) 70%, transparent)" }}
                    aria-hidden="true"
                  />

                  <div className="px-5 pt-3 pb-6 flex flex-col gap-2">
                    {navLinks.map((link, i) => {
                      const active = isActive(link.href);
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -12, filter: "blur(2px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          transition={{
                            delay: i * 0.04,
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-poppins font-bold border transition-all ${
                              active
                                ? "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-zinc-900 shadow-md shadow-blue-200/35 scale-[1.02]"
                                : "bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900"
                            }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    })}

                    {/* Mobile Products Store, Login, and Book CTAs */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/products"
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900 font-poppins font-bold text-xs transition-all"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Products
                        </Link>
                        {user ? (
                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={() => setIsProfileOpen((prev) => !prev)}
                              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border bg-amber-400/15 border-amber-400/40 text-zinc-900 dark:text-yellow-400 font-poppins font-bold text-xs transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-amber-600 dark:text-yellow-400" />
                                <span>Profile</span>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                              {isProfileOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden bg-amber-50/60 dark:bg-slate-900/60 border border-amber-200/60 dark:border-white/10 rounded-xl p-3.5 space-y-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-amber-400 text-zinc-900 font-black text-sm flex items-center justify-center shrink-0">
                                      {user.user_metadata?.full_name ? user.user_metadata.full_name[0] : (user.email ? user.email[0] : "U")}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="font-poppins font-bold text-xs text-zinc-900 dark:text-white truncate">
                                        {user.user_metadata?.full_name || "Pet Lover"}
                                      </p>
                                      <p className="font-inter text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                        {user.email}
                                      </p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white font-poppins font-bold text-xs hover:bg-rose-700 transition-all cursor-pointer shadow-sm"
                                  >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log Out</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href="/login"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900 font-poppins font-bold text-xs transition-all"
                          >
                            <LogIn className="h-4 w-4" />
                            Login
                          </Link>
                        )}
                      </div>

                      {user ? (
                        <Link
                          href="/book"
                          className="w-full flex items-center justify-center gap-2 font-poppins font-bold text-white shadow-md text-xs py-3"
                          style={{
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                          }}
                        >
                          <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                          Book Appointment
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            setShowLoginModal(true);
                          }}
                          className="w-full flex items-center justify-center gap-2 font-poppins font-bold text-white shadow-md text-xs py-3 cursor-pointer"
                          style={{
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                          }}
                        >
                          <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                          Book Appointment
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Authentication Required to Book"
        message="You haven't logged in yet! Please sign in to your SST Groomers account to book an appointment."
      />
    </>
  );
}
