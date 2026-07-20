"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Star, Leaf, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    gradient: "from-pink-custom to-coral-custom",
    glow: "rgba(236,72,153,0.06)",
    glowBorder: "rgba(236,72,153,0.12)",
    title: "Genuine Love for Animals",
    desc: "Every groomer at SST is an animal lover first. We treat your pet with the same care we would give our own.",
  },
  {
    icon: ShieldCheck,
    gradient: "from-mint-green to-sky-blue",
    glow: "rgba(52,211,153,0.06)",
    glowBorder: "rgba(52,211,153,0.12)",
    title: "Safety Above All",
    desc: "Fear-free handling, no sedation, daily-sterilized tools, and a trained eye for pet health — always.",
  },
  {
    icon: Leaf,
    gradient: "from-cyan-custom to-sky-blue",
    glow: "rgba(34,211,238,0.06)",
    glowBorder: "rgba(34,211,238,0.12)",
    title: "Natural, Pet-Safe Products",
    desc: "100% hypoallergenic, paraben-free shampoos and conditioners sourced for Coimbatore's tropical climate.",
  },
  {
    icon: Star,
    gradient: "from-peach-custom to-soft-yellow",
    glow: "rgba(245,158,11,0.06)",
    glowBorder: "rgba(245,158,11,0.12)",
    title: "Consistently Excellent",
    desc: "A 4.9-star rating maintained across 230+ reviews — a commitment to the same standard every session.",
  },
  {
    icon: Award,
    gradient: "from-indigo-custom to-purple-custom",
    glow: "rgba(67,56,202,0.06)",
    glowBorder: "rgba(67,56,202,0.12)",
    title: "Certified Expertise",
    desc: "Our 3 groomers hold certifications in canine psychology, cat handling, and pet first-aid.",
  },
];

const team = [
  {
    name: "Saravanan S.",
    role: "Head Groomer & Founder",
    exp: "9+ years exp",
    certs: ["Canine Psychology", "Pet First-Aid"],
    gradient: "from-sky-blue to-royal-blue",
    glow: "rgba(37,99,235,0.08)",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Thilaga R.",
    role: "Cat Grooming Specialist",
    exp: "6+ years exp",
    certs: ["Cat Handling", "Anxiety-Free Care"],
    gradient: "from-pink-custom to-coral-custom",
    glow: "rgba(236,72,153,0.08)",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Karthik M.",
    role: "Senior Dog Groomer",
    exp: "5+ years exp",
    certs: ["Breed Styling", "Pet Nutrition"],
    gradient: "from-mint-green to-sky-blue",
    glow: "rgba(52,211,153,0.08)",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
];

const highlights = [
  "No cages — open-concept salon layout",
  "3 certified, full-time groomers in-house",
  "100% hygienic, daily-sterilised station tools",
  "Serving Coimbatore pet parents since 2016",
];

export default function AboutStory() {
  return (
    <>
      {/* Story Section */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Keep center bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column Content */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <span className="type-eyebrow">Est. 2016</span>
              <h2 className="type-section-heading">
                A Neighbourhood Salon Built on <span className="gradient-text">Trust</span>
              </h2>
              
              <div className="space-y-4 type-body text-slate-600">
                <p>
                  SST Groomers started as a passionate one-person salon in Coimbatore&apos;s Park Road neighborhood in 2016.
                  Our founder noticed a gap — pet owners needed a groomer who treated animals like family, with patience and safety first.
                </p>
                <p>
                  Today, we are a team of three certified groomers serving dogs and cats across the city.
                  Our single open-concept salon setup means no cages and no separation anxiety — you can watch the entire process.
                </p>
              </div>

              {/* Check Highlights */}
              <ul className="space-y-3 pt-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 type-small text-slate-700">
                    <div
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/book" className="btn-primary type-button">
                  <ArrowRight className="h-4.5 w-4.5" />
                  Book a Session
                </Link>
                <Link href="/safety" className="btn-secondary type-button">
                  Safety Standards
                </Link>
              </div>
            </motion.div>

            {/* Right Column Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-2 gap-4.5"
            >
              <div className="space-y-4.5">
                <div
                  className="rounded-3xl overflow-hidden aspect-[4/5] border border-white/60"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.06)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=750&fit=crop"
                    alt="Happy golden retriever Rocky at SST Groomers Coimbatore"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4.5 pt-8">
                <div
                  className="rounded-3xl overflow-hidden aspect-square border border-white/60"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.05)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=500&h=500&fit=crop"
                    alt="Grooming station workspace at SST Groomers"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div
                  className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/60"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.05)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=375&fit=crop"
                    alt="Persian cat freshly groomed post-spa"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating pill badge */}
              <motion.div
                className="absolute -bottom-4.5 -left-4.5 px-4.5 py-3.5 rounded-2xl z-20 border"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(37,99,235,0.15)",
                  boxShadow: "0 10px 30px rgba(37,99,235,0.06)",
                }}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coimbatore&apos;s only</p>
                <p className="text-xs font-extrabold text-zinc-900">Open-Concept Pet Salon</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Core Values Section */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Keep center bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="type-eyebrow">What We Stand For</span>
            <h2 className="type-section-heading mt-2.5 mb-4">Our Core Values</h2>
            <p className="type-section-subtitle max-w-xl mx-auto">
              Every decision we make at SST Groomers revolves around these core animal-first principles.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[24px] p-7 glass-card card-hover overflow-hidden"
                style={{
                  border: `1px solid ${v.glowBorder}`,
                  boxShadow: `0 15px 40px ${v.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
                }}
              >
                {/* Thin top gradient indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.gradient}`} aria-hidden="true" />

                {/* Ambient glow highlight on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
                  style={{ background: `radial-gradient(circle at 10% 10%, ${v.glow}, transparent 80%)` }}
                  aria-hidden="true"
                />

                {/* Icon wrapper */}
                <div
                  className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10`}
                >
                  <v.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="type-card-title mb-3 text-slate-900 group-hover:text-zinc-900 transition-colors duration-200 relative z-10">
                  {v.title}
                </h3>
                <p className="type-small text-slate-500 text-sm leading-relaxed relative z-10">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Keep center bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="type-eyebrow">The Experts Behind the Paws</span>
            <h2 className="type-section-heading mt-2.5 mb-4">Meet Our Grooming Team</h2>
            <p className="type-section-subtitle max-w-xl mx-auto">
              Our 3-person certified expert team holds degrees in canine behavior, safe cat handling, and pet first-aid.
            </p>
          </motion.div>

          {/* Team Cards Grid */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <div
                  className="rounded-[24px] p-7 glass-card card-hover text-center overflow-hidden relative border border-slate-200/60"
                  style={{
                    boxShadow: `0 15px 40px ${member.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
                  }}
                >
                  {/* Thin top gradient indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient}`} aria-hidden="true" />

                  {/* Avatar wrapper */}
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <div
                      className={`absolute -inset-1.5 rounded-full bg-gradient-to-br ${member.gradient} opacity-40`}
                      aria-hidden="true"
                    />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={member.img} alt={`${member.name}, ${member.role}`} className="object-cover w-full h-full" />
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-[17px] mb-0.5">{member.name}</h3>
                  <p className="text-xs font-bold text-zinc-900 mb-1">{member.role}</p>
                  <p className="text-[11px] text-slate-400 font-medium mb-5">{member.exp}</p>
                  
                  {/* Credentials chips */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2 border-t border-slate-100">
                    {member.certs.map((c) => (
                      <span key={c} className="chip text-[9px] py-0.5 px-2 bg-slate-50 text-slate-600 border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>
    </>
  );
}
