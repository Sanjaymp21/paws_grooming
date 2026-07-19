"use client";

import React, { useState, useEffect } from "react";
import { groomingPackages } from "../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Smile, Sparkles, CheckCircle2, Scissors } from "lucide-react";
import canvasConfetti from "canvas-confetti";

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
  const [bookedSession, setBookedSession] = useState<any | null>(null);

  // Listen for package selection events from other components
  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.packageName) {
        setSelectedPackage(customEvent.detail.packageName);
      }
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

    // Simulate database insertion latency
    setTimeout(() => {
      const session = {
        id: "SST-" + Math.floor(1000 + Math.random() * 9000),
        ownerName,
        phone,
        email,
        petName,
        petType,
        breed,
        selectedPackage,
        date,
        time,
        notes,
      };

      // Save in localStorage (client-side mock database)
      const existing = localStorage.getItem("sst_bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(session);
      localStorage.setItem("sst_bookings", JSON.stringify(bookings));

      setBookedSession(session);
      setIsSubmitting(false);

      // Trigger Confetti
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleReset = () => {
    setOwnerName("");
    setPhone("");
    setEmail("");
    setPetName("");
    setPetType("dog");
    setBreed("");
    setSelectedPackage("Premium Grooming");
    setDate("");
    setTime("");
    setNotes("");
    setBookedSession(null);
  };

  return (
    <section id="book" className="py-24 bg-gradient-to-b from-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Reservations
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Schedule a Premium Session
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            Fill out the form below to secure your pet&apos;s spot at our Coimbatore salon. 
            We maintain an open-concept layout—you are always welcome to check in on your pet!
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/10 rounded-full blur-2xl -z-10" />

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
                {/* Pet Type Tabs Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Pet Type</label>
                  <div className="flex gap-4">
                    {(["dog", "cat"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPetType(type)}
                        className={`flex-1 py-3 rounded-xl font-poppins text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                          petType === type
                            ? "bg-navy-blue text-white shadow-sm"
                            : "bg-slate-50 text-slate-gray hover:bg-slate-100 border border-slate-100"
                        }`}
                      >
                        {type === "dog" ? "🐶 Dog" : "🐱 Cat"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Pet Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Pet Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Bella"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    />
                  </div>

                  {/* Breed */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Breed *</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Retriever"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Owner Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Owner Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ananth"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. contact@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Grooming Package */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Grooming Package *</label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    >
                      {groomingPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.name}>
                          {pkg.name} (₹{pkg.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Select Date *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Select Time *</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white"
                      required
                    >
                      <option value="">Choose a slot</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:30 PM">01:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-poppins font-bold text-navy-blue uppercase">Special Instructions / Allergies</label>
                  <textarea
                    placeholder="e.g. He is allergic to chamomile shampoo, likes paw rubs, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:border-sky-300 font-inter text-sm shadow-sm bg-white resize-none"
                  />
                </div>

                {/* Action button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-navy-blue to-sky-500 text-white font-poppins font-bold shadow-md hover:shadow-lg hover:shadow-sky-100 active:scale-[0.99] transition-all duration-300 disabled:opacity-80"
                  >
                    {isSubmitting ? (
                      <>
                        <Scissors className="h-4.5 w-4.5 animate-spin" />
                        Validating Calendar Availability...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4.5 w-4.5 text-sky-200" />
                        Schedule Grooming Session
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-6"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-poppins font-black text-navy-blue">Appointment Confirmed!</h4>
                  <p className="text-sm text-slate-gray font-inter max-w-md mx-auto leading-relaxed">
                    Success! We have secured a slot for <span className="font-bold text-navy-blue">{bookedSession.petName}</span>. 
                    A confirmation SMS has been dispatched to <span className="font-bold text-navy-blue">{bookedSession.phone}</span>.
                  </p>
                </div>

                {/* Booking summary ticket */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs font-inter space-y-3 shadow-inner">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-gray">Booking Reference</span>
                    <span className="font-mono font-bold text-navy-blue">{bookedSession.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-gray">Pet Name</span>
                    <span className="font-bold text-slate-800">{bookedSession.petName} ({bookedSession.breed})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-gray">Package Chosen</span>
                    <span className="font-bold text-slate-800">{bookedSession.selectedPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-gray">Scheduled Slot</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-sky-500" /> {bookedSession.date} at <Clock className="h-3.5 w-3.5 text-sky-500" /> {bookedSession.time}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl border border-sky-100 text-navy-blue font-poppins text-xs font-bold hover:bg-sky-50 transition-all"
                  >
                    Book Another Session
                  </button>
                  <a
                    href="#tracker"
                    className="px-6 py-3 rounded-xl bg-navy-blue text-white font-poppins text-xs font-bold hover:bg-sky-500 shadow transition-all"
                  >
                    Track in Real-Time
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
