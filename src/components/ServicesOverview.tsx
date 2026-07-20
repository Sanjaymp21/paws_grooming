"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Scissors, Bone, Ear, Sparkles, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Droplets,
    gradient: "from-sky-400 to-cyan-500",
    glow: "rgba(14,165,233,0.22)",
    glowBorder: "rgba(14,165,233,0.16)",
    title: "Warm Herbal Bath",
    desc: "pH-balanced, hypoallergenic shampoos matched to your pet's coat type — gentle enough for sensitive skin and puppies.",
    tags: ["All Breeds", "Puppies OK", "Cat-Friendly"],
  },
  {
    icon: Scissors,
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.22)",
    glowBorder: "rgba(99,102,241,0.16)",
    title: "Breed-Specific Styling",
    desc: "Custom cuts that follow your breed's natural coat structure — from Teddy Bear cuts on Shih Tzus to Lion cuts on Persians.",
    tags: ["Dogs & Cats", "Show Styles", "Custom Cuts"],
  },
  {
    icon: Bone,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.22)",
    glowBorder: "rgba(245,158,11,0.16)",
    title: "Nail Trimming & Filing",
    desc: "Careful, anxiety-free nail care using precision clippers and a smooth finishing file. No quicks, no stress.",
    tags: ["All Sizes", "Fear-Free", "Monthly Rec."],
  },
  {
    icon: Ear,
    gradient: "from-rose-400 to-pink-600",
    glow: "rgba(244,63,94,0.22)",
    glowBorder: "rgba(244,63,94,0.16)",
    title: "Ear Cleaning & De-waxing",
    desc: "Deep ear cleaning to remove wax buildup and debris — vital for tropical climates like Coimbatore to prevent infections.",
    tags: ["Infection Prevention", "Gentle", "All Pets"],
  },
  {
    icon: Sparkles,
    gradient: "from-teal-400 to-emerald-500",
    glow: "rgba(20,184,166,0.22)",
    glowBorder: "rgba(20,184,166,0.16)",
    title: "Luxury Spa Add-ons",
    desc: "Organic oatmeal mud bath, deep coat conditioning, soothing aromatherapy, and paw butter massage for the ultimate pet experience.",
    tags: ["Anxiety Relief", "Skin Therapy", "Premium"],
  },
  {
    icon: Heart,
    gradient: "from-emerald-400 to-green-600",
    glow: "rgba(16,185,129,0.22)",
    glowBorder: "rgba(16,185,129,0.16)",
    title: "Pet-Safe Teeth Cleaning",
    desc: "Enzymatic pet toothpaste and soft brushing to control plaque, prevent periodontal disease, and keep breath fresh.",
    tags: ["No Sedation", "Vet-Recommended", "Premium+"],
  },
];

const process = [
  { step: "1", title: "Booking", desc: "Select your package and preferred timeslot online.", color: "from-sky-400 to-blue-600", glow: "rgba(14,165,233,0.30)" },
  { step: "2", title: "Health Check", desc: "Brief skin, coat, ear, and nail assessment on arrival.", color: "from-indigo-400 to-violet-600", glow: "rgba(99,102,241,0.30)" },
  { step: "3", title: "Bath & Dry", desc: "Warm herbal bath, blow-dry, and detangle.", color: "from-teal-400 to-cyan-600", glow: "rgba(20,184,166,0.30)" },
  { step: "4", title: "Styling", desc: "Breed-specific cut and finishing touches.", color: "from-rose-400 to-pink-600", glow: "rgba(244,63,94,0.30)" },
  { step: "5", title: "Quality Check", desc: "Full inspection before handover.", color: "from-amber-400 to-orange-600", glow: "rgba(245,158,11,0.30)" },
  { step: "6", title: "Pickup", desc: "Your happy, fresh pet ready to go!", color: "from-emerald-400 to-green-600", glow: "rgba(16,185,129,0.30)" },
];

export default function ServicesOverview() {
  return (
    <>
      {/* Services Grid */}
      <section className="py-28 relative overflow-hidden">
        {/* Premium background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, #FAFCFF 0%, #EEF6FF 50%, #F5F3FF 100%)",
            }}
          />
          <div className="absolute top-0 right-0 w-[700px] h-[600px] rounded-full bg-sky-200/35 blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-indigo-200/30 blur-[110px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>

        {/* Top line */}
        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <p className="type-eyebrow">Our Services</p>
            <h2 className="type-h1 mt-2 mb-5">Everything Your Pet Needs</h2>
            <p className="type-body text-slate-500">
              Comprehensive grooming services using pet-safe, hypoallergenic products — tailored to every breed and coat type.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[26px] p-7 card-hover overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(28px)",
                  border: `1px solid ${s.glowBorder}`,
                  boxShadow: `0 8px 40px ${s.glow}, 0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
                }}
              >
                {/* Gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.gradient}`} aria-hidden="true" />

                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[26px]"
                  style={{ background: `radial-gradient(ellipse 65% 65% at 30% 20%, ${s.glow}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-250 relative z-10`}
                  style={{ boxShadow: `0 8px 28px ${s.glow}` }}
                  aria-hidden="true"
                >
                  <s.icon className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="type-h3 mb-3">{s.title}</h3>
                  <p className="type-small">{s.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                  {s.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Process Timeline */}
      <section className="py-28 relative overflow-hidden">
        {/* Premium alternating background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #EEF6FF 0%, #F0F4FF 50%, #EEF6FF 100%)",
            }}
          />
          <div className="absolute left-1/4 top-1/3 w-[500px] h-[400px] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-[400px] h-[350px] rounded-full bg-violet-200/25 blur-3xl" />
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
            <p className="type-eyebrow">Our Process</p>
            <h2 className="type-h1 mt-2 mb-5">What Happens at Your Pet&apos;s Session</h2>
            <p className="type-body text-slate-500">A transparent, step-by-step experience — no hidden steps, no surprises.</p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line */}
            <div
              className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.50) 20%, rgba(99,102,241,0.45) 80%, transparent)" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-7">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.50, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-poppins font-extrabold text-xl shadow-xl transition-shadow duration-250`}
                    style={{ boxShadow: `0 10px 32px ${p.glow}, 0 3px 10px rgba(0,0,0,0.10)` }}
                  >
                    {p.step}
                  </motion.div>
                  <div>
                    <p className="font-poppins font-bold text-sm text-[#1E3A8A] mb-1.5">{p.title}</p>
                    <p className="type-small text-[12px]">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/book" className="btn-primary shine">
              <ArrowRight className="h-4 w-4" />
              Book Your Session
            </Link>
          </motion.div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>
    </>
  );
}
