"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scissors, Send, CheckCircle2, MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = [
  { group: "Explore", links: [
    { name: "Home",      href: "/" },
    { name: "About Us",  href: "/about" },
    { name: "Services",  href: "/services" },
    { name: "Gallery",   href: "/gallery" },
  ]},
  { group: "Grooming", links: [
    { name: "Packages",  href: "/packages" },
    { name: "Membership",href: "/packages#membership" },
    { name: "Safety",    href: "/safety" },
    { name: "Reviews",   href: "/reviews" },
  ]},
  { group: "Help", links: [
    { name: "FAQ",       href: "/faq" },
    { name: "Contact",   href: "/contact" },
    { name: "Book Appointment", href: "/book" },
  ]},
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
    <footer className="bg-gradient-to-b from-[#0d1a4a] to-[#060e2c] text-slate-300 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-sky-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/5 pb-14">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-md">
                <Scissors className="h-4.5 w-4.5 rotate-45" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-poppins font-bold text-[15px] text-white tracking-tight">SST Groomers</span>
                <span className="text-[9px] font-semibold tracking-[0.18em] text-sky-400 uppercase">Coimbatore</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-inter max-w-xs">
              Coimbatore's trusted neighborhood pet grooming salon. Certified groomers, medical-grade hygiene, and premium spa packages — all under one roof.
            </p>
            {/* Contact quick-ref */}
            <div className="space-y-2.5 text-xs font-inter text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>12 Park Road, Coimbatore, TN 641001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-sky-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <a href="mailto:contact@sstgroomers.in" className="hover:text-sky-400 transition-colors">contact@sstgroomers.in</a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Mon–Sat: 9 AM – 7 PM · Sun: 10 AM – 4 PM</span>
              </div>
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.group} className="lg:col-span-2 space-y-4">
              <h5 className="font-poppins font-bold text-xs text-white uppercase tracking-[0.12em]">
                {group.group}
              </h5>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-inter text-slate-400 hover:text-sky-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-poppins font-bold text-xs text-white uppercase tracking-[0.12em]">Newsletter</h5>
            <p className="text-xs text-slate-400 font-inter leading-relaxed">
              Pet care tips, grooming reminders, and exclusive local offers delivered monthly.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-poppins">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Subscribed! Welcome aboard 🐾
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/8"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Newsletter email address"
                  className="flex-grow px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-[11px] text-slate-500 font-inter">
          <p>© {new Date().getFullYear()} SST Groomers, Coimbatore. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span className="text-sky-600/50 font-semibold font-poppins">Single Location · Coimbatore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
