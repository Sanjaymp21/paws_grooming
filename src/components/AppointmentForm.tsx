"use client";

import React, { useState, useEffect } from "react";
import { groomingPackages } from "../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles, CheckCircle2, Scissors, ChevronDown } from "lucide-react";
import canvasConfetti from "canvas-confetti";

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

function InputField({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase">
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
        className="input-premium appearance-none pr-10 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400 pointer-events-none" />
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
        <div className="absolute right-0 top-0 w-[600px] h-[500px] rounded-full bg-sky-100/40 blur-[120px]" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[400px] rounded-full bg-indigo-50/40 blur-[100px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="type-eyebrow">Reservations</p>
          <h2 className="type-h1 mt-1 mb-4">Schedule a Premium Session</h2>
          <p className="type-body text-slate-500">
            Fill out the form to secure your pet&apos;s spot at our Coimbatore salon. You are always welcome to check in on your pet!
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card-elevated rounded-[28px] border border-sky-100/60 relative overflow-hidden">
            {/* Top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600" aria-hidden="true" />

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
                      <label className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase">Pet Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["dog", "cat"] as const).map((type) => (
                          <motion.button
                            key={type}
                            type="button"
                            onClick={() => setPetType(type)}
                            whileTap={{ scale: 0.97 }}
                            className={`py-3.5 rounded-2xl font-poppins text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2.5 border ${
                              petType === type
                                ? "bg-gradient-to-r from-[#1d4ed8] to-[#1E3A8A] text-white border-transparent shadow-lg shadow-blue-200/50"
                                : "bg-white/60 text-slate-500 border-slate-200 hover:border-sky-200 hover:text-[#1E3A8A]"
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
                        <input id="pet-name" type="text" placeholder="e.g. Bella" value={petName} onChange={(e) => setPetName(e.target.value)} className="input-premium" required />
                      </InputField>
                      <InputField id="pet-breed" label="Breed" required>
                        <input id="pet-breed" type="text" placeholder="e.g. Golden Retriever" value={breed} onChange={(e) => setBreed(e.target.value)} className="input-premium" required />
                      </InputField>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <InputField id="owner-name" label="Owner Name" required>
                        <input id="owner-name" type="text" placeholder="e.g. Ananth" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="input-premium" required />
                      </InputField>
                      <InputField id="owner-phone" label="Phone" required>
                        <input id="owner-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-premium" required />
                      </InputField>
                      <InputField id="owner-email" label="Email (Optional)">
                        <input id="owner-email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" />
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
                        <input id="date-select" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-premium" required />
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
                        className="input-premium resize-none"
                      />
                    </InputField>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2 } : {}}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center shine"
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
                      <h4 className="text-2xl font-poppins font-black text-[#1E3A8A] mb-2">Appointment Confirmed!</h4>
                      <p className="text-sm text-slate-500 font-inter max-w-md mx-auto">
                        We have secured a slot for <span className="font-bold text-[#1E3A8A]">{bookedSession.petName}</span>. A confirmation SMS has been sent to <span className="font-bold text-[#1E3A8A]">{bookedSession.phone}</span>.
                      </p>
                    </div>

                    {/* Ticket */}
                    <div className="max-w-sm mx-auto rounded-[20px] overflow-hidden border border-slate-100 shadow-lg">
                      <div className="bg-gradient-to-r from-[#1d4ed8] to-[#1E3A8A] px-6 py-4 flex justify-between items-center">
                        <span className="font-poppins font-bold text-white text-sm">Booking Confirmed</span>
                        <span className="font-mono text-sky-200 text-xs font-bold">{bookedSession.id}</span>
                      </div>
                      <div className="bg-white p-5 space-y-3">
                        {[
                          { label: "Pet", value: `${bookedSession.petName} (${bookedSession.breed})` },
                          { label: "Package", value: bookedSession.selectedPackage },
                          { label: "Date", value: bookedSession.date, icon: Calendar },
                          { label: "Time", value: bookedSession.time, icon: Clock },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                            <span className="text-slate-400 font-inter">{row.label}</span>
                            <span className="font-bold text-slate-800 font-poppins flex items-center gap-1">
                              {row.icon && <row.icon className="h-3 w-3 text-sky-500" />}
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
