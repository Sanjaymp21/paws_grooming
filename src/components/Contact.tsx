"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate contact form submission
    setTimeout(() => {
      setSubmitted(true);
      canvasConfetti({
        particleCount: 50,
        spread: 30,
        origin: { y: 0.8 }
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Connect
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Reach Out to SST Groomers
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            Have questions about pricing, grooming styles, or custom coat treatments? Drop us a line or call our salon. We are happy to help!
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Info Box */}
            <div className="glass-card rounded-[28px] p-6 border border-sky-100/80 shadow-md space-y-6">
              <h4 className="font-poppins font-bold text-md text-navy-blue">Salon Location</h4>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-xs text-navy-blue">Visit Us</h5>
                    <p className="text-xs text-slate-gray font-inter mt-0.5 leading-normal">
                      SST Groomers, 12 Park Road, <br />
                      Coimbatore, Tamil Nadu - 641001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-500 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-xs text-navy-blue">Call Us</h5>
                    <p className="text-xs text-slate-gray font-inter mt-0.5 leading-normal">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-xs text-navy-blue">Email Us</h5>
                    <p className="text-xs text-slate-gray font-inter mt-0.5 leading-normal">
                      contact@sstgroomers.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Box */}
            <div className="glass-card rounded-[28px] p-6 border border-sky-100/80 shadow-md">
              <h4 className="font-poppins font-bold text-md text-navy-blue mb-4 flex items-center gap-1.5">
                <Clock className="h-5 w-5 text-sky-500" />
                Working Hours
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-inter">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-navy-blue block font-poppins">Mon - Sat</span>
                  <span className="text-slate-gray block mt-0.5">9:00 AM - 7:00 PM</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-navy-blue block font-poppins">Sunday</span>
                  <span className="text-slate-gray block mt-0.5">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Form & Map Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-md relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h4 className="font-poppins font-bold text-sm text-navy-blue">Quick Inquiry</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-navy-blue text-white font-poppins font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-sky-500 shadow transition-all duration-300"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-navy-blue">Message Dispatched!</h4>
                      <p className="text-xs text-slate-gray font-inter mt-1">
                        Thank you, {name}. Our Coimbatore salon administrator will respond shortly via email.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-lg border border-sky-100 text-navy-blue text-xs font-bold font-poppins hover:bg-sky-50 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[32px] overflow-hidden shadow-md border border-sky-100/50 h-[220px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3312389146197!2d76.95581561533423!3d11.016844492158498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f9737f1%3A0xc07cfd145c225a0b!2sPark%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1658231872132!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
