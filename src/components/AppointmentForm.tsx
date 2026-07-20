"use client";

import React, { useState, useEffect } from "react";
import { groomingPackages } from "../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles, CheckCircle2, Scissors, ChevronDown } from "lucide-react";
import canvasConfetti from "canvas-confetti";

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

function InputField({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

function SelectField({ id, value, onChange, children, required }: { id: string; value: string; onChange: (v: string) => void; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="input-premium appearance-none pr-10 cursor-pointer text-sm font-inter font-semibold text-zinc-900 focus:ring-yellow-400/10 focus:border-zinc-900"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-900 pointer-events-none" />
    </div>
  );
}

export default function AppointmentForm() {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [breed, setBreed] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("Premium Grooming");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookedSession, setBookedSession] = useState<any | null>(null);

  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.packageName) setSelectedPackage(customEvent.detail.packageName);
    };
    window.addEventListener("select-package", handlePackageSelect);
    return () => window.removeEventListener("select-package", handlePackageSelect);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !petName || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const session = {
        id: "SST-" + Math.floor(1000 + Math.random() * 9000),
        ownerName, phone, email, petName, petType, breed, selectedPackage, date, time, notes,
      };
      const existing = localStorage.getItem("sst_bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(session);
      localStorage.setItem("sst_bookings", JSON.stringify(bookings));
      setBookedSession(session);
      setIsSubmitting(false);
      canvasConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1500);
  };

  const handleReset = () => {
    setOwnerName(""); setPhone(""); setEmail(""); setPetName(""); setPetType("dog");
    setBreed(""); setSelectedPackage("Premium Grooming"); setDate(""); setTime(""); setNotes("");
    setBookedSession(null);
  };

  return (
    <section id="book" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 60%)" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-[600px] h-[500px] rounded-full bg-yellow-100/40 blur-[120px]" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[400px] rounded-full bg-yellow-100/40 blur-[100px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-zinc-900 text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-1 uppercase">
            Reservations
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-black text-zinc-900 tracking-tight">Schedule a Premium Session</h2>
          <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-xl mx-auto">
            Fill out the form to secure your pet&apos;s spot at our Coimbatore salon. You are always welcome to check in on your pet!
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-[32px] p-2 border border-yellow-100/80 shadow-lg relative overflow-hidden bg-white">
            {/* Top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500" aria-hidden="true" />

            <div className="p-7 sm:p-10">
              <AnimatePresence mode="wait">
                {!bookedSession ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >

                    {/* Pet type toggle */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Pet Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["dog", "cat"] as const).map((type) => (
                          <motion.button
                            key={type}
                            type="button"
                            onClick={() => setPetType(type)}
                            whileTap={{ scale: 0.97 }}
                            className={`py-3.5 rounded-2xl font-poppins text-sm font-bold flex items-center justify-center gap-2.5 border transition-all duration-300 ${
                              petType === type
                                ? "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-2 border-zinc-900 shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-[1.03]"
                                : "bg-yellow-50/50 border-[#D1D5DB] text-[#334155] hover:bg-yellow-100/50 hover:border-zinc-900 hover:text-zinc-900"
                            }`}
                          >
                            <span className="text-lg">{type === "dog" ? "🐶" : "🐱"}</span>
                            {type === "dog" ? "Dog" : "Cat"}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <InputField id="pet-name" label="Pet Name" required>
                        <input id="pet-name" type="text" placeholder="e.g. Bella" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" required />
                      </InputField>
                      <InputField id="pet-breed" label="Breed" required>
                        <input id="pet-breed" type="text" placeholder="e.g. Golden Retriever" value={breed} onChange={(e) => setBreed(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" required />
                      </InputField>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <InputField id="owner-name" label="Owner Name" required>
                        <input id="owner-name" type="text" placeholder="e.g. Ananth" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" required />
                      </InputField>
                      <InputField id="owner-phone" label="Phone" required>
                        <input id="owner-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" required />
                      </InputField>
                      <InputField id="owner-email" label="Email (Optional)">
                        <input id="owner-email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" />
                      </InputField>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <InputField id="package-select" label="Package" required>
                        <SelectField id="package-select" value={selectedPackage} onChange={setSelectedPackage} required>
                          {groomingPackages.map((pkg) => (
                            <option key={pkg.id} value={pkg.name}>{pkg.name} (₹{pkg.price})</option>
                          ))}
                        </SelectField>
                      </InputField>
                      <InputField id="date-select" label="Date" required>
                        <input id="date-select" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm" required />
                      </InputField>
                      <InputField id="time-select" label="Time Slot" required>
                        <SelectField id="time-select" value={time} onChange={setTime} required>
                          <option value="">Choose a slot</option>
                          {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                        </SelectField>
                      </InputField>
                    </div>

                    <InputField id="notes-field" label="Special Instructions / Allergies">
                      <textarea
                        id="notes-field"
                        placeholder="e.g. He is allergic to chamomile shampoo, likes paw rubs, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl px-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm resize-none"
                      />
                    </InputField>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2 } : {}}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-poppins font-bold shadow-md hover:shadow-lg hover:shadow-yellow-100 active:scale-[0.99] transition-all duration-300 disabled:opacity-80"
                      style={{ padding: "1.125rem", opacity: isSubmitting ? 0.8 : 1 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Scissors className="h-4 w-4 animate-spin" />
                          Securing Your Slot…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-sky-200" />
                          Schedule Grooming Session
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-7"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow-xl shadow-emerald-100/50 mx-auto"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </motion.div>

                    <div>
                      <h4 className="text-2xl font-poppins font-black text-zinc-900 mb-2">Appointment Confirmed!</h4>
                      <p className="text-sm text-slate-500 font-inter max-w-md mx-auto">
                        We have secured a slot for <span className="font-bold text-zinc-900">{bookedSession.petName}</span>. A confirmation SMS has been sent to <span className="font-bold text-zinc-900">{bookedSession.phone}</span>.
                      </p>
                    </div>

                    {/* Ticket */}
                    <div className="max-w-sm mx-auto rounded-[24px] overflow-hidden border border-slate-100 shadow-lg bg-white">
                      <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center text-white">
                        <span className="font-poppins font-bold text-sm">Booking Confirmed</span>
                        <span className="font-mono text-yellow-100 text-xs font-bold">{bookedSession.id}</span>
                      </div>
                      <div className="p-5 space-y-3 bg-white">
                        {[
                          { label: "Pet", value: `${bookedSession.petName} (${bookedSession.breed})` },
                          { label: "Package", value: bookedSession.selectedPackage },
                          { label: "Date", value: bookedSession.date, icon: Calendar },
                          { label: "Time", value: bookedSession.time, icon: Clock },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                            <span className="text-slate-400 font-inter">{row.label}</span>
                            <span className="font-bold text-zinc-900 font-poppins flex items-center gap-1">
                              {row.icon && <row.icon className="h-3 w-3 text-zinc-900" />}
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center flex-wrap">
                      <button onClick={handleReset} className="btn-secondary text-sm px-6 py-3">
                        Book Another Session
                      </button>
                      <a href="#tracker" className="btn-primary text-sm px-6 py-3">
                        Track in Real-Time
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
