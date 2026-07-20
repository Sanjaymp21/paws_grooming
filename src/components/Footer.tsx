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
      className="relative overflow-hidden text-slate-400 pt-24 pb-12 z-10 border-t border-slate-900/10"
      style={{
        background: "linear-gradient(180deg, #0F172A 0%, #020617 100%)",
      }}
    >
      {/* Aurora Ambient Glow (Top Corner) */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 filter blur-[90px]"
        style={{
          background: "radial-gradient(circle, #000000 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full opacity-5 filter blur-[80px]"
        style={{
          background: "radial-gradient(circle, #FACC15 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <div
                className="h-10.5 w-10.5 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                }}
              >
                <Scissors className="h-5 w-5 rotate-45" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-bold text-white text-lg tracking-tight">SST Groomers</span>
                <span className="text-[8.5px] font-bold tracking-[0.24em] text-sky-400 uppercase">Coimbatore</span>
              </div>
            </Link>

            <p className="type-small text-slate-400 leading-relaxed max-w-xs">
              Coimbatore&apos;s trusted pet grooming salon. Certified experts, medical-grade hygiene, and premium spa care packages.
            </p>

            {/* Quick Contact Info */}
            <div className="space-y-3.5 type-small text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                <span>12 Park Road, Coimbatore, TN 641001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                <a href="mailto:contact@sstgroomers.in" className="hover:text-white transition-colors">contact@sstgroomers.in</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                <span>Mon–Sat: 9 AM–7 PM | Sun: 10 AM–4 PM</span>
              </div>
            </div>
          </div>

          {/* Links Cols */}
          {footerLinks.map((col) => (
            <div key={col.group} className="lg:col-span-2 space-y-4">
              <h4 className="font-semibold text-white text-[15px] uppercase tracking-wider">
                {col.group}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="type-small text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Booking Callout */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-semibold text-white text-[15px] uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="type-small text-slate-400">
              Subscribe to get seasonal care alerts, discount packages, and grooming tips.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2.5 px-4.5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Subscribed successfully! 🐾
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-yellow-500 text-white transition-all flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #000000 0%, #171717 100%)",
                  }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["4.9 ★ rated", "230+ ratings", "Certified hygiene"].map((b) => (
                <span 
                  key={b} 
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SST Groomers Coimbatore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <span className="font-semibold text-slate-400">Single Location | Coimbatore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
