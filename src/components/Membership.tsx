"use client";

import React, { useState } from "react";
import { Award, Zap, Gift, Compass, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function Membership() {
  const [joined, setJoined] = useState(false);

  const benefits = [
    { title: "10% Spa Discount", desc: "Save on luxury organic mud baths and coat styling", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Priority Booking", desc: "Gain access to peak weekend slots before anyone else", icon: Award, color: "text-sky-500", bg: "bg-sky-50" },
    { title: "Birthday Gift", desc: "A special spa treatment & custom bandana on your pet's day", icon: Gift, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Free Nail Trim", desc: "Complimentary clipping and paw care check between sessions", icon: Compass, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  const handleJoin = () => {
    setJoined(true);
    // Celebrate with confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="membership" className="py-24 bg-gradient-to-b from-sky-50/40 to-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Content Column */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
                Loyalty Club
              </h2>
              <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight leading-tight">
                SST Groomers Membership
              </h3>
              <p className="text-md text-slate-gray font-inter leading-relaxed">
                Join our premium loyalty club and give your pet the regular pampering they deserve.
                We keep track of your visits digitally—no physical cards to lose!
              </p>
            </div>

            {/* Special Offer Highlight */}
            <div className="p-6 rounded-[24px] bg-gradient-to-r from-navy-blue to-sky-600 text-white shadow-xl shadow-sky-100/50">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 font-extrabold text-lg">
                  3+1
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-lg">Groom your pet 3 times</h4>
                  <p className="text-xs text-sky-100">Get the 4th Grooming completely FREE! Applied automatically.</p>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex gap-3 items-start p-4 rounded-2xl glass-card">
                  <div className={`p-2 rounded-xl ${b.bg} ${b.color} shrink-0`}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-poppins font-bold text-sm text-navy-blue">{b.title}</h5>
                    <p className="text-[11px] text-slate-gray font-inter mt-1 leading-normal">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Join CTA */}
            <div>
              {joined ? (
                <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-poppins text-sm font-bold animate-fade-in">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</div>
                  Welcome to SST Club! (ID: SST-5892)
                </div>
              ) : (
                <button
                  onClick={handleJoin}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-navy-blue text-white font-poppins font-bold shadow-md hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-100 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Join Membership
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Digital Wallet Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            {/* We will embed the Rewards Dashboard right next to this, rendering in a preview block! */}
            <div className="w-full max-w-md p-6 rounded-[32px] glass-card border border-sky-100 shadow-xl relative overflow-hidden bg-radial-gradient">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/20 rounded-full blur-xl" />

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-poppins text-xs font-bold text-navy-blue tracking-wider uppercase">Club Wallet</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold">Active Status</span>
              </div>

              {/* VIP Card */}
              <div className="bg-gradient-to-br from-navy-blue via-[#182d6b] to-[#0f1d47] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-6 group cursor-pointer hover:scale-102 transition-transform duration-300">
                <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-colors" />

                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-[10px] text-sky-200 font-semibold tracking-widest uppercase font-poppins">SST Loyal Member</span>
                    <h4 className="text-xl font-bold tracking-wide mt-1 font-poppins">Bella the Retriever</h4>
                  </div>
                  <Award className="h-7 w-7 text-sky-300 animate-pulse" />
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-sky-200 uppercase font-poppins font-medium">Card Number</span>
                    <span className="block font-mono text-sm tracking-widest mt-0.5">SST 4892 2091 1250</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-sky-200 uppercase font-poppins font-medium block">Wallet Balance</span>
                    <span className="font-poppins font-bold text-lg">650 PTS</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-navy-blue font-poppins">Visits Completed (Grooming)</span>
                  <span className="text-xs font-bold text-sky-500 font-poppins">75% (3/4 Sessions)</span>
                </div>

                {/* Dots */}
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-4 rounded-full bg-sky-500 border border-sky-400 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                  <div className="h-4 w-4 rounded-full bg-sky-500 border border-sky-400 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                  <div className="h-4 w-4 rounded-full bg-sky-500 border border-sky-400 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                  <div className="h-4 w-4 rounded-full bg-slate-100 border border-slate-200" />
                  <span className="text-[10px] font-semibold text-slate-gray font-poppins ml-2">Next Groom is FREE!</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sky-400 to-navy-blue"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
