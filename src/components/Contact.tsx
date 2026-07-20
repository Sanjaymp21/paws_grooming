"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "12 Park Road, Coimbatore\nTamil Nadu — 641001",
    gradient: "from-sky-400 to-blue-500",
    glow: "rgba(96,165,250,0.18)",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.18)",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "contact@sstgroomers.in",
    gradient: "from-emerald-400 to-teal-500",
    glow: "rgba(16,185,129,0.18)",
  },
];

const hours = [
  { day: "Mon — Sat", time: "9:00 AM – 7:00 PM", active: true },
  { day: "Sunday", time: "10:00 AM – 4:00 PM", active: false },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      canvasConfetti({
        particleCount: 60,
        spread: 40,
        origin: { y: 0.8 },
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-sky-50/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-indigo-50/40 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="type-eyebrow">Connect</p>
          <h2 className="type-h1 mt-1 mb-4">Reach Out to SST Groomers</h2>
          <p className="type-body text-slate-500">
            Have questions about pricing, grooming styles, or custom coat treatments? Drop us a line. We are happy to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Info + Hours */}
          <div className="lg:col-span-5 space-y-5">

            {/* Contact info cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-4 p-5 rounded-2xl glass-card-elevated border border-sky-100/60 card-hover"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
                  style={{ boxShadow: `0 8px 24px ${item.glow}` }}
                  aria-hidden="true"
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold font-poppins text-sky-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-inter text-slate-700 font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-elevated rounded-2xl p-6 border border-sky-100/60"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-poppins font-bold text-sm text-[#1E3A8A]">Working Hours</h4>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold font-poppins text-[#1E3A8A]">{h.day}</span>
                    <span className="text-xs font-semibold font-inter text-slate-500">{h.time}</span>
                    {h.active && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Open
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right: Form + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-5"
          >

            {/* Form card */}
            <div className="glass-card-elevated rounded-[24px] p-7 sm:p-10 border border-sky-100/60 relative overflow-hidden">
              {/* Top gradient stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600" aria-hidden="true" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-poppins font-bold text-lg text-[#1E3A8A] mb-1">Quick Inquiry</h3>
                      <p className="text-xs text-slate-400 font-inter">We typically respond within a few hours.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-name" className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase">Your Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="e.g. Ananth Krishnan"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-premium"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-email" className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase">Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input-premium"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-message" className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase">Your Message *</label>
                      <textarea
                        id="contact-message"
                        placeholder="Tell us about your pet, the service you need, or any questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="input-premium resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center shine"
                      style={{ padding: "1rem" }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-sky-200" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto shadow-xl shadow-emerald-100/50">
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-xl text-[#1E3A8A] mb-2">Message Dispatched!</h4>
                      <p className="text-sm text-slate-500 font-inter max-w-sm mx-auto">
                        Thank you, <span className="font-bold text-[#1E3A8A]">{name}</span>. Our team will respond shortly via email.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary text-sm px-6 py-2.5"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map */}
            <div className="rounded-[22px] overflow-hidden shadow-xl border border-sky-100/50 h-[200px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3312389146197!2d76.95581561533423!3d11.016844492158498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f9737f1%3A0xc07cfd145c225a0b!2sPark%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1658231872132!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="SST Groomers location on Google Maps"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
