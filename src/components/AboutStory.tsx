"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Star, Leaf, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    gradient: "from-rose-400 to-rose-600",
    glow: "rgba(244,63,94,0.20)",
    glowBorder: "rgba(244,63,94,0.14)",
    title: "Genuine Love for Animals",
    desc: "Every groomer at SST is an animal lover first. We treat your pet with the same care we would give our own.",
  },
  {
    icon: ShieldCheck,
    gradient: "from-emerald-400 to-teal-500",
    glow: "rgba(16,185,129,0.20)",
    glowBorder: "rgba(16,185,129,0.14)",
    title: "Safety Above All",
    desc: "Fear-free handling, no sedation, daily-sterilised tools, and a trained eye for pet health — always.",
  },
  {
    icon: Leaf,
    gradient: "from-teal-400 to-cyan-500",
    glow: "rgba(20,184,166,0.20)",
    glowBorder: "rgba(20,184,166,0.14)",
    title: "Natural, Pet-Safe Products",
    desc: "100% hypoallergenic, paraben-free shampoos and conditioners sourced for Coimbatore's tropical climate.",
  },
  {
    icon: Star,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.20)",
    glowBorder: "rgba(245,158,11,0.14)",
    title: "Consistently Excellent",
    desc: "A 4.9-star rating maintained across 230+ reviews — a commitment to the same standard every session.",
  },
  {
    icon: Award,
    gradient: "from-indigo-400 to-violet-500",
    glow: "rgba(99,102,241,0.20)",
    glowBorder: "rgba(99,102,241,0.14)",
    title: "Certified Expertise",
    desc: "Our 3 groomers hold certifications in canine psychology, cat handling, and pet first-aid.",
  },
];

const team = [
  {
    name: "Saravanan S.",
    role: "Head Groomer & Founder",
    exp: "9+ years",
    certs: ["Canine Psychology", "Pet First-Aid"],
    gradient: "from-sky-400 to-blue-600",
    glow: "rgba(14,165,233,0.25)",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Thilaga R.",
    role: "Cat Grooming Specialist",
    exp: "6+ years",
    certs: ["Cat Handling", "Anxiety-Free Care"],
    gradient: "from-rose-400 to-pink-600",
    glow: "rgba(244,63,94,0.25)",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Karthik M.",
    role: "Senior Dog Groomer",
    exp: "5+ years",
    certs: ["Breed Styling", "Pet Nutrition"],
    gradient: "from-emerald-400 to-teal-600",
    glow: "rgba(16,185,129,0.25)",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
];

const highlights = [
  "No cages — open-concept salon",
  "3 certified, full-time groomers",
  "100% hygienic, daily-sterilised tools",
  "Serving Coimbatore since 2016",
];

export default function AboutStory() {
  return (
    <>
      {/* Story Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, #FAFCFF 0%, #EEF6FF 50%, #F5F3FF 100%)",
            }}
          />
          <div className="absolute top-0 right-0 w-[800px] h-[700px] rounded-full bg-sky-200/40 blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="type-eyebrow mb-5">Est. 2016</p>
              <h2 className="type-h1 mb-7">
                A Neighbourhood Salon Built on{" "}
                <span className="gradient-text">Trust</span>
              </h2>
              <div className="space-y-5 type-body text-slate-500">
                <p>
                  SST Groomers started as a passionate one-person salon in Coimbatore&apos;s Park Road neighbourhood in 2016.
                  Founder Saravanan noticed a gap — pet owners needed a groomer who treated animals the way a vet would: with patience, safety, and genuine care.
                </p>
                <p>
                  Today we are a team of three certified groomers serving hundreds of dogs and cats from across the city.
                  Our single open-concept salon means no cages, no separation anxiety — pet parents can watch every step of the process.
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-8 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-[15px] font-inter text-slate-700">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(20,184,166,0.12))", border: "1px solid rgba(16,185,129,0.25)" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/book" className="btn-primary">
                  <ArrowRight className="h-4 w-4" />
                  Book a Session
                </Link>
                <Link href="/safety" className="btn-secondary">
                  Our Safety Standards
                </Link>
              </div>
            </motion.div>

            {/* Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-2 gap-5"
            >
              <div className="space-y-5">
                <div
                  className="rounded-3xl overflow-hidden aspect-[4/5]"
                  style={{ boxShadow: "0 24px 72px rgba(30,58,138,0.18), 0 6px 20px rgba(0,0,0,0.08)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=750&fit=crop"
                    alt="Happy golden retriever at SST Groomers salon"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-5 pt-10">
                <div
                  className="rounded-3xl overflow-hidden aspect-square"
                  style={{ boxShadow: "0 20px 60px rgba(30,58,138,0.16), 0 4px 16px rgba(0,0,0,0.07)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=500&h=500&fit=crop"
                    alt="Clean grooming station at SST Groomers"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div
                  className="rounded-3xl overflow-hidden aspect-[4/3]"
                  style={{ boxShadow: "0 20px 60px rgba(30,58,138,0.16), 0 4px 16px rgba(0,0,0,0.07)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=375&fit=crop"
                    alt="Persian cat after a gentle grooming session"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-2xl z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(96,165,250,0.22)",
                  boxShadow: "0 12px 40px rgba(30,58,138,0.16), 0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <p className="text-[10px] font-semibold text-slate-400 font-poppins">Coimbatore&apos;s only</p>
                <p className="text-[14px] font-bold text-[#1E3A8A] font-poppins">Open-Concept Pet Salon</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Values Grid */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(165deg, #EEF6FF 0%, #F0F4FF 50%, #EEF2FF 100%)",
            }}
          />
          <div className="absolute right-0 top-0 w-[600px] h-[500px] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute left-0 bottom-0 w-[500px] h-[400px] rounded-full bg-violet-200/25 blur-3xl" />
          <div className="absolute inset-0 dot-grid" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <p className="type-eyebrow">What We Stand For</p>
            <h2 className="type-h1 mt-2 mb-5">Our Core Values</h2>
            <p className="type-body text-slate-500">Every decision we make at SST Groomers comes back to these five principles.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[26px] p-7 card-hover overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(28px)",
                  border: `1px solid ${v.glowBorder}`,
                  boxShadow: `0 8px 40px ${v.glow}, 0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
                }}
              >
                {/* Gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${v.gradient}`} aria-hidden="true" />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[26px]"
                  style={{ background: `radial-gradient(ellipse 65% 65% at 30% 25%, ${v.glow}, transparent)` }}
                  aria-hidden="true"
                />

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-250 relative z-10`}
                  style={{ boxShadow: `0 8px 28px ${v.glow}` }}
                >
                  <v.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="type-h3 mb-3 relative z-10">{v.title}</h3>
                <p className="type-small relative z-10">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Team Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, #FAFCFF 0%, #F0F7FF 50%, #FAFCFF 100%)",
            }}
          />
          <div className="absolute inset-0 dot-grid" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <p className="type-eyebrow">The People Behind the Paws</p>
            <h2 className="type-h1 mt-2 mb-5">Meet Our Groomers</h2>
            <p className="type-body text-slate-500 max-w-lg mx-auto">
              Certified, passionate, and genuinely caring — our three-person team brings years of hands-on pet grooming experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.13 }}
                className="group"
              >
                <div
                  className="rounded-[28px] p-7 card-hover text-center overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(28px)",
                    border: `1px solid rgba(96,165,250,0.14)`,
                    boxShadow: `0 10px 44px ${member.glow}, 0 3px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)`,
                  }}
                >
                  {/* Top gradient stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${member.gradient}`} aria-hidden="true" />

                  {/* Avatar with gradient ring */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div
                      className={`absolute -inset-1 rounded-full bg-gradient-to-br ${member.gradient} opacity-75`}
                      style={{ boxShadow: `0 6px 28px ${member.glow}` }}
                      aria-hidden="true"
                    />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white shadow-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={member.img} alt={`${member.name}, ${member.role}`} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <h3 className="font-poppins font-bold text-[#1E3A8A] text-[16px] mb-0.5">{member.name}</h3>
                  <p className="text-xs font-semibold text-sky-500 font-poppins mb-1">{member.role}</p>
                  <p className="text-[12px] text-slate-400 font-inter mb-5">{member.exp} experience</p>
                  {/* Cert chips */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.certs.map((c) => (
                      <span key={c} className="chip text-[9.5px]">{c}</span>
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
