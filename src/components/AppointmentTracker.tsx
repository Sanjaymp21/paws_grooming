"use client";

import React, { useState, useEffect } from "react";
import { Check, Play, Square, Scissors, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AppointmentTracker() {
  const steps = [
    { label: "Booking Received", desc: "Reservation confirmed at Coimbatore salon" },
    { label: "Health Check", desc: "First-aid & behavioral check by certified groomers" },
    { label: "Bath", desc: "Warm wash using natural hypoallergenic shampoos" },
    { label: "Drying", desc: "Low-noise high-velocity gentle blowout" },
    { label: "Hair Styling", desc: "Custom breed-specific scissor styling & trims" },
    { label: "Quality Check", desc: "Double inspection for ears, claws, and coat shine" },
    { label: "Ready for Pickup", desc: "Scent spritz applied, pet resting in luxury lounge" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000); // Progress every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isSimulating, steps.length]);

  const handleStartSimulation = () => {
    setCurrentStep(0);
    setIsSimulating(true);
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
  };

  return (
    <section id="tracker" className="py-24 bg-gradient-to-b from-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-1 uppercase">
            Live Tracker
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Live Appointment &amp; Care Tracker</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-2xl mx-auto">
            Curious about what happens while your pet is with us? Follow their journey from greeting to pickup in real-time. Use the simulator below to test the tracking dashboard!
          </p>
        </div>

        {/* Tracker Panel */}
        <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-6 sm:p-8 border border-yellow-100 shadow-md bg-white">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isSimulating ? "bg-emerald-400" : "bg-sky-400"
                }`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  isSimulating ? "bg-emerald-500" : "bg-yellow-400"
                }`}></span>
              </span>
              <span className="font-poppins font-bold text-xs text-zinc-900 uppercase">
                {isSimulating ? "Live Simulation Running" : "Simulator Ready"}
              </span>
            </div>
            
            <div className="flex gap-2">
              {isSimulating ? (
                <button
                  onClick={handleStopSimulation}
                  className="px-4.5 py-2.5 rounded-2xl bg-rose-500 text-white font-poppins text-xs font-bold shadow hover:bg-rose-600 transition-all flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <Square className="h-3.5 w-3.5 fill-white" />
                  Stop Simulator
                </button>
              ) : (
                <button
                  onClick={handleStartSimulation}
                  className="px-4.5 py-2.5 rounded-2xl bg-zinc-900 text-white font-poppins text-xs font-bold shadow-md hover:bg-yellow-400 transition-all flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  Simulate Live Session
                </button>
              )}
              <button
                onClick={() => setCurrentStep(0)}
                disabled={isSimulating}
                className="px-4.5 py-2.5 rounded-2xl border border-slate-200 text-zinc-900 font-poppins text-xs font-bold hover:bg-slate-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stepper Grid (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[22px] left-[6%] right-[6%] h-[3px] bg-slate-100 -z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-navy-blue origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentStep / (steps.length - 1) }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Stepper Elements */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-4">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                const isPending = idx > currentStep;

                return (
                  <div key={idx} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-3 text-left lg:text-center relative">
                    
                    {/* Vertical connecting line for mobile */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden absolute left-[22px] top-[44px] bottom-[-22px] w-[3px] bg-slate-100">
                        {isCompleted && (
                          <div className="h-full w-full bg-sky-400" />
                        )}
                      </div>
                    )}

                    {/* Step Icon circle */}
                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 border-2 font-poppins text-xs font-bold transition-all duration-500 z-10 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-100"
                          : isActive
                          ? "bg-zinc-900 border-zinc-900 text-white ring-4 ring-sky-100 shadow-md animate-pulse"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5.5 w-5.5 stroke-[3px]" />
                      ) : idx === 4 ? (
                        <Scissors className="h-4.5 w-4.5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div>
                      <h4 className={`font-poppins font-bold text-sm leading-tight transition-colors duration-300 ${
                        isActive ? "text-zinc-900" : isCompleted ? "text-slate-700" : "text-slate-400"
                      }`}>
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-inter leading-relaxed mt-1 max-w-[130px]">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Status Callout */}
          <div className="mt-12 p-5 rounded-2xl bg-yellow-50/50 border border-yellow-100/50 flex gap-3 items-center">
            <div className="p-2.5 rounded-xl bg-white text-zinc-900 shrink-0 shadow-sm border border-yellow-100/30">
              <Sparkles className="h-5 w-5 text-zinc-900 animate-pulse" />
            </div>
            <div className="text-xs">
              <span className="font-poppins font-bold text-zinc-900 block">Current Activity:</span>
              <p className="text-slate-500 font-inter mt-0.5 leading-relaxed">
                {currentStep === steps.length - 1 
                  ? "Your pet has completed all checks! Scent spray applied and is happily awaiting pickup in our climate-controlled lounge."
                  : `Your pet is currently in the [${steps[currentStep].label}] stage. ${steps[currentStep].desc}.`}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
