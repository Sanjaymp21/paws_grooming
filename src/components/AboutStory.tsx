"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Star, Leaf, Award } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50",
    title: "Genuine Love for Animals",
    desc: "Every groomer at SST is an animal lover first. We treat your pet with the same care we'd give our own.",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Safety Above All",
    desc: "Fear-free handling, no sedation, daily-sterilised tools, and a trained eye for pet health — always.",
  },
  {
    icon: Leaf,
    color: "text-teal-500",
    bg: "bg-teal-50",
    title: "Natural, Pet-Safe Products",
    desc: "100% hypoallergenic, paraben-free shampoos and conditioners sourced for Coimbatore's tropical climate.",
  },
  {
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Consistently Excellent",
    desc: "A 4.9-star rating maintained across 230+ reviews isn't luck — it's a commitment to the same standard every session.",
  },
  {
    icon: Award,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    title: "Certified Expertise",
    desc: "Our 3 groomers hold certifications in canine psychology, cat handling, and pet first-aid.",
  },
];

const team = [
  {
    name: "Saravanan S.",
    role: "Head Groomer & Founder",
    exp: "9+ years",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Thilaga R.",
    role: "Cat Grooming Specialist",
    exp: "6+ years",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Karthik M.",
    role: "Senior Dog Groomer",
    exp: "5+ years",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
];

export default function AboutStory() {
  return (
    <>
      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <p className="type-eyebrow mb-3">Est. 2016</p>
              <h2 className="type-h1 mb-6">
                A Neighbourhood Salon Built on{" "}
                <span className="gradient-text">Trust</span>
              </h2>
              <div className="space-y-4 type-body">
                <p>
                  SST Groomers started as a small, passionate one-person salon in Coimbatore&apos;s Park Road neighbourhood in 2016. 
                  Founder Saravanan noticed a gap — pet owners in Coimbatore needed a groomer who treated animals the way a vet would: with patience, safety, and genuine care.
                </p>
                <p>
                  Today we are a team of three certified groomers serving hundreds of dogs and cats from across the city. 
                  We operate a single open-concept salon — no cages, no separation anxiety — where pet parents can watch every step of the grooming process.
                </p>
                <p>
                  Our commitment is simple: every pet leaves looking great, feeling calm, and every pet parent leaves feeling confident.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/book" className="btn-primary text-sm">
                  Book a Session
                </Link>
                <Link href="/safety" className="btn-secondary text-sm">
                  Our Safety Standards
                </Link>
              </div>
            </motion.div>

            {/* Image mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="relative grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=750&fit=crop"
                    alt="Happy golden retriever at SST Groomers salon"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=500&h=500&fit=crop"
                    alt="Clean grooming station at SST Groomers"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=375&fit=crop"
                    alt="Persian cat after a gentle grooming session"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl glass-card shadow-lg border border-sky-100">
                <p className="text-xs font-semibold text-[#64748B] font-poppins">Coimbatore&apos;s only</p>
                <p className="text-sm font-bold text-[#1E3A8A] font-poppins">Open-Concept Pet Salon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="type-eyebrow mb-2">What We Stand For</p>
            <h2 className="type-h1">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card rounded-3xl p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-sky-100/40"
              >
                <div className={`w-11 h-11 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center mb-5`}>
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="type-h3 mb-2">{v.title}</h3>
                <p className="type-small">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="type-eyebrow mb-2">The People Behind the Paws</p>
            <h2 className="type-h1">Meet Our Groomers</h2>
            <p className="type-body mt-3 max-w-lg mx-auto">
              Certified, passionate, and genuinely caring — our three-person team brings years of hands-on pet grooming experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg ring-4 ring-sky-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.img} alt={`${member.name}, ${member.role}`} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-poppins font-bold text-[#1E3A8A] text-base">{member.name}</h3>
                <p className="type-small text-[#60A5FA] font-semibold">{member.role}</p>
                <p className="type-small mt-0.5">{member.exp} experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
