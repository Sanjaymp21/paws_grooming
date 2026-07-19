"use client";

import React, { useState } from "react";
import { mockPets, PetProfile } from "../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Calendar, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

export default function PetHealthDashboard() {
  const [selectedPetId, setSelectedPetId] = useState("bella");
  const activePet = mockPets.find((p) => p.id === selectedPetId) || mockPets[0];

  return (
    <section id="pet-dashboard" className="py-24 bg-gradient-to-b from-white to-sky-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Health Check
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Interactive Pet Health Dashboard
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            Our groomers record critical vitals, skin irritations, and ear/nail hygiene ratings after every session. Select your pet to view their latest health card.
          </p>
        </div>

        {/* Pet Tabs Selector */}
        <div className="flex justify-center gap-3 mb-10">
          {mockPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPetId(pet.id)}
              className={`px-5 py-3 rounded-full font-poppins text-xs font-bold transition-all duration-300 ${
                selectedPetId === pet.id
                  ? "bg-navy-blue text-white shadow-md shadow-sky-100"
                  : "bg-white text-slate-gray hover:text-navy-blue hover:bg-sky-50 border border-slate-100"
              }`}
            >
              🐾 {pet.name} ({pet.breed})
            </button>
          ))}
        </div>

        {/* Dashboard Main Widget */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPetId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-lg grid md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Pet Info & Score Column */}
              <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-br from-navy-blue via-[#172c67] to-[#0f1d47] text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-500/10 rounded-full blur-xl" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] text-sky-200 uppercase tracking-widest font-poppins font-semibold">Active Health Profile</span>
                      <h4 className="text-2xl font-poppins font-black mt-0.5">{activePet.name}</h4>
                      <p className="text-xs text-sky-100 font-inter font-medium">{activePet.breed} • {activePet.age}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wide uppercase font-poppins">
                      {activePet.type === "dog" ? "🐶 Dog" : "🐱 Cat"}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <div className="flex justify-between text-xs font-inter text-sky-100">
                      <span>Weight</span>
                      <span className="font-bold text-white">{activePet.weight}</span>
                    </div>
                    <div className="flex justify-between text-xs font-inter text-sky-100">
                      <span>Coat Condition</span>
                      <span className="font-bold text-white">{activePet.coatCondition}</span>
                    </div>
                    <div className="flex justify-between text-xs font-inter text-sky-100">
                      <span>Ear Cleanliness</span>
                      <span className="font-bold text-white">{activePet.earStatus}</span>
                    </div>
                    <div className="flex justify-between text-xs font-inter text-sky-100">
                      <span>Nail Status</span>
                      <span className="font-bold text-white">{activePet.nailStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Score Dial */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase font-poppins font-semibold block">Overall Score</span>
                    <span className="text-3xl font-poppins font-black tracking-tight">{activePet.overallScore}%</span>
                  </div>
                  <div className="w-14 h-14 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/10"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="text-sky-300"
                        strokeWidth="3.5"
                        strokeDasharray="100, 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - activePet.overallScore }}
                        transition={{ duration: 1, delay: 0.2 }}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <Activity className="h-5 w-5 text-sky-200 absolute" />
                  </div>
                </div>

              </div>

              {/* Grooming Timeline Card Column */}
              <div className="md:col-span-7 flex flex-col justify-between p-2">
                <div className="p-4 sm:p-6 space-y-6">
                  <h5 className="font-poppins font-bold text-sm text-navy-blue flex items-center gap-1.5 border-b border-slate-100 pb-3">
                    <Calendar className="h-4.5 w-4.5 text-sky-500" />
                    Grooming Cycle Records
                  </h5>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100/50">
                      <span className="text-[10px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">Last Grooming</span>
                      <span className="text-lg font-poppins font-extrabold text-navy-blue block mt-1">{activePet.lastGrooming}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold font-inter flex items-center gap-0.5 mt-1">
                        <CheckCircle2 className="h-3 w-3 inline" /> Fully Completed
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                      <span className="text-[10px] text-slate-gray font-poppins font-bold uppercase tracking-wider block">Next Scheduled</span>
                      <span className="text-lg font-poppins font-extrabold text-navy-blue block mt-1">{activePet.nextGrooming}</span>
                      <span className="text-[10px] text-indigo-600 font-semibold font-inter flex items-center gap-0.5 mt-1">
                        ⏱️ In 4 Weeks
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-100 space-y-2">
                    <h6 className="text-xs font-poppins font-bold text-navy-blue flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Groomer&apos;s Recommendations
                    </h6>
                    <p className="text-[11px] text-slate-gray font-inter leading-relaxed">
                      {activePet.type === "dog" 
                        ? "Bella is demonstrating excellent skin health. We suggest using a high-hydration oatmeal wash next time to maintain coat luster against Coimbatore's humid climate. Keep up nail clipping every 4 weeks." 
                        : "Coco's double Persian coat shows moderate undercoat shedding. We performed deep de-shedding this time. Keep brushing dry daily to prevent belly matting."}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-b-[24px] flex justify-between items-center text-xs">
                  <span className="text-slate-gray font-inter font-medium">Want to update your pet&apos;s details or add a new pet?</span>
                  <a href="#book" className="font-poppins font-bold text-sky-500 hover:text-navy-blue flex items-center gap-0.5 transition-colors">
                    Add Pet <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
