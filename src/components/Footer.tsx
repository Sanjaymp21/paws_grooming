"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scissors, Send, CheckCircle2, MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = [
  {
    group: "Explore", links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Gallery", href: "/gallery" },
    ]
  },
  {
    group: "Grooming", links: [
      { name: "Packages", href: "/packages" },
      { name: "Membership", href: "/packages#membership" },
      { name: "Safety", href: "/safety" },
      { name: "Reviews", href: "/reviews" },
    ]
  },
  {
    group: "Help", links: [
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Book Appointment", href: "/book" },
    ]
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      className="relative overflow-hidden text-slate-300 pt-20 pb-10"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 20% 15%, rgba(37,99,235,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 90%, rgba(99,102,241,0.20) 0%, transparent 55%), linear-gradient(175deg, #080f2e 0%, #05091c 60%, #030712 100%)",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(96,165,250,0.55) 25%, rgba(99,102,241,0.50) 50%, rgba(96,165,250,0.55) 75%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-blue-900/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[400px] h-[350px] rounded-full bg-indigo-900/15 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid-dark pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/6 pb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #2563eb, #3b82f6)",
                  boxShadow: "0 6px 24px rgba(29,78,216,0.40)",
                }}
              >
                <Scissors className="h-5 w-5 rotate-45" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-poppins font-bold text-[16px] text-white tracking-tight">SST Groomers</span>
                <span className="text-[9px] font-semibold tracking-[0.20em] text-sky-400 uppercase">Coimbatore</span>
              </div>
            </Link>

            <p className="text-[13.5px] text-slate-400 leading-relaxed font-inter max-w-xs">
              Coimbatore&apos;s trusted neighborhood pet grooming salon. Certified groomers, medical-grade hygiene, and premium spa packages — all under one roof.
            </p>

            {/* Contact quick-ref */}
            <div className="space-y-3 text-[13px] font-inter text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <span>12 Park Road, Coimbatore, TN 641001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <a href="tel:+919876543210" className="hover:text-sky-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <a href="mailto:contact@sstgroomers.in" className="hover:text-sky-400 transition-colors">contact@sstgroomers.in</a>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <span>Mon–Sat: 9 AM – 7 PM · Sun: 10 AM – 4 PM</span>
              </div>
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.group} className="lg:col-span-2 space-y-5">
              <h5
                className="font-poppins font-bold text-xs text-white uppercase tracking-[0.14em] pb-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {group.group}
              </h5>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-inter text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-sky-400 transition-colors shrink-0" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-5">
            <h5
              className="font-poppins font-bold text-xs text-white uppercase tracking-[0.14em] pb-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              Newsletter
            </h5>
            <p className="text-[13px] text-slate-400 font-inter leading-relaxed">
              Pet care tips, grooming reminders, and exclusive local offers delivered monthly.
            </p>
            {subscribed ? (
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-emerald-400 text-[13px] font-semibold font-poppins"
                style={{
                  background: "rgba(16,185,129,0.10)",
                  border: "1px solid rgba(16,185,129,0.20)",
                }}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Subscribed! Welcome aboard 🐾
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 p-1.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Newsletter email address"
                  className="flex-grow px-3 py-1.5 text-[13px] text-white placeholder:text-slate-500 focus:outline-none bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-lg text-white transition-all focus-visible:ring-2 focus-visible:ring-sky-400 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    boxShadow: "0 4px 16px rgba(29,78,216,0.40)",
                  }}
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

            {/* Trust badges */}
            <div className="flex gap-2 flex-wrap pt-2">
              {["4.9★ Google", "230+ Reviews", "Since 2016"].map((badge) => (
                <span
                  key={badge}
                  className="text-[10.5px] font-poppins font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(148,163,184,0.90)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-[12px] text-slate-500 font-inter">
          <p>© {new Date().getFullYear()} SST Groomers, Coimbatore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span
              className="font-semibold font-poppins"
              style={{ color: "rgba(96,165,250,0.60)" }}
            >
              Single Location · Coimbatore
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
