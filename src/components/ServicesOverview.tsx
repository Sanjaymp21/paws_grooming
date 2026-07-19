"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Scissors, Bone, Ear, Sparkles, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Droplets,
    color: "text-sky-500",
    bg: "bg-sky-50",
    title: "Warm Herbal Bath",
    desc: "pH-balanced, hypoallergenic shampoos matched to your pet's coat type — gentle enough for sensitive skin and puppies.",
    tags: ["All Breeds", "Puppies OK", "Cat-Friendly"],
  },
  {
    icon: Scissors,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    title: "Breed-Specific Styling",
    desc: "Custom cuts that follow your breed's natural coat structure — from Teddy Bear cuts on Shih Tzus to Lion cuts on Persians.",
    tags: ["Dogs & Cats", "Show Styles", "Custom Cuts"],
  },
  {
    icon: Bone,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Nail Trimming & Filing",
    desc: "Careful, anxiety-free nail care using precision clippers and a smooth finishing file. No quicks, no stress.",
    tags: ["All Sizes", "Fear-Free", "Monthly Rec."],
  },
  {
    icon: Ear,
    color: "text-rose-500",
    bg: "bg-rose-50",
    title: "Ear Cleaning & De-waxing",
    desc: "Deep ear cleaning to remove wax buildup and debris — vital for tropical climates like Coimbatore to prevent infections.",
    tags: ["Infection Prevention", "Gentle", "All Pets"],
  },
  {
    icon: Sparkles,
    color: "text-teal-500",
    bg: "bg-teal-50",
    title: "Luxury Spa Add-ons",
    desc: "Organic oatmeal mud bath, deep coat conditioning, soothing aromatherapy, and paw butter massage for the ultimate pet experience.",
    tags: ["Anxiety Relief", "Skin Therapy", "Premium"],
  },
  {
    icon: Heart,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Pet-Safe Teeth Cleaning",
    desc: "Enzymatic pet toothpaste and soft brushing to control plaque, prevent periodontal disease, and keep breath fresh.",
    tags: ["No Sedation", "Vet-Recommended", "Premium+"],
  },
];

const process = [
  { step: "1", title: "Booking", desc: "Select your package and preferred timeslot online." },
  { step: "2", title: "Health Check", desc: "Brief skin, coat, ear, and nail assessment on arrival." },
  { step: "3", title: "Bath & Dry", desc: "Warm herbal bath, blow-dry, and detangle." },
  { step: "4", title: "Styling", desc: "Breed-specific cut and finishing touches." },
  { step: "5", title: "Quality Check", desc: "Full inspection before handover." },
  { step: "6", title: "Pickup", desc: "Your happy, fresh pet ready to go! 🐾" },
];

export default function ServicesOverview() {
  return (
    <>
      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card rounded-3xl p-7 border border-sky-100/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-5"
              >
                <div className={`w-11 h-11 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center`} aria-hidden="true">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="type-h3 mb-2">{s.title}</h3>
                  <p className="type-small">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-sky-50 text-[#60A5FA] text-[10px] font-semibold font-poppins"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-b from-sky-50/40 to-white border-t border-sky-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="type-eyebrow mb-2">Our Process</p>
            <h2 className="type-h2">What Happens at Your Pet&apos;s Session</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#60A5FA] flex items-center justify-center text-white font-poppins font-bold text-lg shadow-md">
                  {p.step}
                </div>
                <div>
                  <p className="font-poppins font-bold text-sm text-[#1E3A8A]">{p.title}</p>
                  <p className="type-small text-[11px] mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/book" className="btn-primary">
              <ArrowRight className="h-4 w-4" />
              Book Your Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
