"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Scissors, Bone, Ear, Sparkles, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Droplets,
    gradient: "from-sky-blue to-royal-blue",
    glow: "rgba(37,99,235,0.06)",
    glowBorder: "rgba(37,99,235,0.12)",
    title: "Warm Herbal Bath",
    desc: "pH-balanced, hypoallergenic shampoos matched to your pet's coat type — gentle enough for sensitive skin and puppies.",
    tags: ["All Breeds", "Puppies OK", "Cat-Friendly"],
  },
  {
    icon: Scissors,
    gradient: "from-indigo-custom to-purple-custom",
    glow: "rgba(67,56,202,0.06)",
    glowBorder: "rgba(67,56,202,0.12)",
    title: "Breed-Specific Styling",
    desc: "Custom cuts that follow your breed's natural coat structure — from Teddy Bear cuts on Shih Tzus to Lion cuts on Persians.",
    tags: ["Dogs & Cats", "Show Styles", "Custom Cuts"],
  },
  {
    icon: Bone,
    gradient: "from-peach-custom to-soft-yellow",
    glow: "rgba(245,158,11,0.06)",
    glowBorder: "rgba(245,158,11,0.12)",
    title: "Nail Trimming & Filing",
    desc: "Careful, anxiety-free nail care using precision clippers and a smooth finishing file. No quicks, no stress.",
    tags: ["All Sizes", "Fear-Free", "Monthly Rec."],
  },
  {
    icon: Ear,
    gradient: "from-pink-custom to-coral-custom",
    glow: "rgba(236,72,153,0.06)",
    glowBorder: "rgba(236,72,153,0.12)",
    title: "Ear Cleaning & De-waxing",
    desc: "Deep ear cleaning to remove wax buildup and debris — vital for tropical climates like Coimbatore to prevent infections.",
    tags: ["Infection Prevention", "Gentle", "All Pets"],
  },
  {
    icon: Sparkles,
    gradient: "from-mint-green to-sky-blue",
    glow: "rgba(52,211,153,0.06)",
    glowBorder: "rgba(52,211,153,0.12)",
    title: "Luxury Spa Add-ons",
    desc: "Organic oatmeal mud bath, deep coat conditioning, soothing aromatherapy, and paw butter massage for the ultimate pet experience.",
    tags: ["Anxiety Relief", "Skin Therapy", "Premium"],
  },
  {
    icon: Heart,
    gradient: "from-cyan-custom to-indigo-custom",
    glow: "rgba(34,211,238,0.06)",
    glowBorder: "rgba(34,211,238,0.12)",
    title: "Pet-Safe Teeth Cleaning",
    desc: "Enzymatic pet toothpaste and soft brushing to control plaque, prevent periodontal disease, and keep breath fresh.",
    tags: ["No Sedation", "Vet-Recommended", "Premium+"],
  },
];

const process = [
  { step: "1", title: "Booking", desc: "Select your package and preferred timeslot online.", color: "from-sky-blue to-royal-blue", glow: "rgba(37,99,235,0.15)" },
  { step: "2", title: "Health Check", desc: "Brief skin, coat, ear, and nail assessment on arrival.", color: "from-indigo-custom to-purple-custom", glow: "rgba(67,56,202,0.15)" },
  { step: "3", title: "Bath & Dry", desc: "Warm herbal bath, blow-dry, and detangle.", color: "from-mint-green to-cyan-custom", glow: "rgba(52,211,153,0.15)" },
  { step: "4", title: "Styling", desc: "Breed-specific cut and finishing touches.", color: "from-pink-custom to-coral-custom", glow: "rgba(236,72,153,0.15)" },
  { step: "5", title: "Quality Check", desc: "Full inspection before handover.", color: "from-peach-custom to-soft-yellow", glow: "rgba(245,158,11,0.15)" },
  { step: "6", title: "Pickup", desc: "Your happy, fresh pet ready to go!", color: "from-mint-green to-sky-blue", glow: "rgba(52,211,153,0.15)" },
];

export default function ServicesOverview() {
  return (
    <>
      {/* Services Grid Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Keeping center clean and bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="type-eyebrow">Our Services</span>
            <h2 className="type-section-heading mt-2.5 mb-4">Everything Your Pet Needs</h2>
            <p className="type-section-subtitle max-w-xl mx-auto">
              Comprehensive grooming services using pet-safe, hypoallergenic products — tailored to every breed and coat type.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[24px] p-7 glass-card card-hover overflow-hidden flex flex-col justify-between"
                style={{
                  border: `1px solid ${s.glowBorder}`,
                  boxShadow: `0 15px 40px ${s.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
                }}
              >
                {/* Thin top gradient indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient}`} aria-hidden="true" />

                {/* Ambient glow highlight on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 10% 10%, ${s.glow}, transparent 80%)` }}
                  aria-hidden="true"
                />

                {/* Service Details Container */}
                <div>
                  {/* Icon */}
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10 shadow-sm`}
                  >
                    <s.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="type-card-title mb-3 text-slate-900 group-hover:text-zinc-900 transition-colors duration-200">
                    {s.title}
                  </h3>
                  <p className="type-small text-slate-500 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Service Tags */}
                <div className="flex flex-wrap gap-2 relative z-10 pt-2 border-t border-slate-100">
                  {s.tags.map((tag) => (
                    <span key={tag} className="chip text-[10px] py-1 px-2.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>

      {/* Process Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Keeping center clean and bright */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/70 blur-2xl rounded-full" />
        </div>

        <div className="section-top-line absolute" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="type-eyebrow">Our Process</span>
            <h2 className="type-section-heading mt-2.5 mb-4">What Happens at Your Pet&apos;s Session</h2>
            <p className="type-section-subtitle max-w-xl mx-auto">
              A gentle, step-by-step custom grooming experience designed to minimize stress.
            </p>
          </motion.div>

          {/* Timeline steps */}
          <div className="relative mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="flex flex-col items-center text-center gap-5 p-4 rounded-[24px] hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
                >
                  {/* Step Bubble Counter */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-white/20 transition-transform duration-300 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]`}
                  >
                    {p.step}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-[15px] mb-2">{p.title}</h4>
                    <p className="type-small text-[12px] text-zinc-600 leading-relaxed font-inter">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link href="/book" className="btn-primary shine type-button">
              <ArrowRight className="h-4.5 w-4.5" />
              Book Your Session
            </Link>
          </motion.div>
        </div>

        <div className="section-bottom-line absolute" aria-hidden="true" />
      </section>
    </>
  );
}
