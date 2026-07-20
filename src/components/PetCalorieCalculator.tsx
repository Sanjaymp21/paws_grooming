"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Flame, Activity, ChevronDown, Sparkles, Info } from "lucide-react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type PetType = "dog" | "cat";
type ActivityLevel = {
  label: string;
  factor: number;
  description: string;
  color: string;
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const activityLevels: ActivityLevel[] = [
  {
    label: "Sedentary",
    factor: 1.2,
    description: "Mostly resting, little movement",
    color: "text-slate-500",
  },
  {
    label: "Low Activity",
    factor: 1.4,
    description: "Short daily walks",
    color: "text-sky-500",
  },
  {
    label: "Moderate",
    factor: 1.6,
    description: "Regular play & walks",
    color: "text-blue-500",
  },
  {
    label: "Active",
    factor: 1.8,
    description: "High energy, long runs",
    color: "text-indigo-500",
  },
  {
    label: "Very Active",
    factor: 2.0,
    description: "Working or sport dog",
    color: "text-violet-500",
  },
];

/* ─────────────────────────────────────────
   CALCULATION (unchanged formulas)
   RER = 70 × (weight_kg ^ 0.75)
   MER = RER × activity_factor
───────────────────────────────────────── */
function calculateCalories(weightKg: number, factor: number) {
  const rer = 70 * Math.pow(weightKg, 0.75);
  const mer = rer * factor;
  return { rer: Math.round(rer), mer: Math.round(mer) };
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function SelectWrapper({
  id,
  value,
  onChange,
  children,
  label,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/80 border border-sky-200/60 rounded-2xl px-4 py-3 pr-10 text-sm font-semibold font-poppins text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all duration-200 cursor-pointer shadow-sm"
          style={{ backdropFilter: "blur(8px)" }}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400 pointer-events-none" />
      </div>
    </div>
  );
}

function ResultCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  gradient,
  glowClass,
  delay,
}: {
  title: string;
  value: number;
  unit: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  glowClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div
        className="relative flex flex-col items-center text-center gap-4 p-6 sm:p-8 rounded-[22px] overflow-hidden border border-white/60"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 4px 32px rgba(30,58,138,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Gradient top stripe */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
          aria-hidden="true"
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[22px]"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${glowClass}, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div
          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Value */}
        <div className="relative">
          <p className="text-4xl sm:text-5xl font-poppins font-extrabold text-[#1E3A8A] tabular-nums leading-none">
            {value.toLocaleString()}
          </p>
          <p className="text-xs font-bold font-poppins text-slate-400 uppercase tracking-widest mt-1">
            {unit}
          </p>
        </div>

        {/* Labels */}
        <div className="relative">
          <p className="font-poppins font-bold text-base text-[#1E3A8A]">{title}</p>
          <p className="text-[11px] text-slate-500 font-inter leading-snug mt-0.5">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function PetCalorieCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [weight, setWeight] = useState("");
  const [activityIndex, setActivityIndex] = useState(2);
  const [result, setResult] = useState<{ rer: number; mer: number } | null>(null);
  const [error, setError] = useState("");

  const selectedActivity = activityLevels[activityIndex];

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 0) {
      setError("Please enter a valid weight.");
      setResult(null);
      return;
    }
    if (weightNum > 150) {
      setError("Weight seems too high. Please check the value.");
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateCalories(weightNum, selectedActivity.factor));
  };

  const handleReset = () => {
    setWeight("");
    setActivityIndex(2);
    setPetType("dog");
    setResult(null);
    setError("");
  };

  return (
    <section
      id="pet-calorie-calculator"
      aria-label="Pet Calorie Calculator"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f0f9ff 0%, #ffffff 50%, #f8faff 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="absolute right-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-sky-100/40 blur-[100px]" />
        <div className="absolute left-[-5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-indigo-50/50 blur-[80px]" />
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50/80 border border-sky-200/60 backdrop-blur-sm text-[#1E3A8A] text-[11px] font-bold font-poppins tracking-wide shadow-sm mb-4">
            <Calculator className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
            Free Tool
          </span>
          <h2 className="type-h2 mb-3">Pet Calorie Calculator</h2>
          <p className="type-small max-w-md mx-auto">
            Estimate your pet&apos;s daily calorie requirements in seconds.
          </p>
        </motion.div>

        {/* Main Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow:
              "0 8px 48px rgba(30,58,138,0.10), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          {/* Gradient top border */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"
            aria-hidden="true"
          />

          <div className="p-7 sm:p-10">
            {/* Form Grid */}
            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              <SelectWrapper
                id="calc-pet-type"
                label="Pet Type"
                value={petType}
                onChange={(v) => setPetType(v as PetType)}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </SelectWrapper>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="calc-weight"
                  className="text-[11px] font-bold font-poppins text-[#1E3A8A] tracking-widest uppercase"
                >
                  Weight (kg)
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min="0.1"
                  max="150"
                  step="0.1"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={petType === "dog" ? "e.g. 12" : "e.g. 4.5"}
                  className="w-full bg-white/80 border border-sky-200/60 rounded-2xl px-4 py-3 text-sm font-semibold font-poppins text-[#1E3A8A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all duration-200 shadow-sm"
                  style={{ backdropFilter: "blur(8px)" }}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                />
              </div>

              <SelectWrapper
                id="calc-activity"
                label="Activity Level"
                value={String(activityIndex)}
                onChange={(v) => setActivityIndex(Number(v))}
              >
                {activityLevels.map((a, i) => (
                  <option key={a.label} value={i}>
                    {a.label}
                  </option>
                ))}
              </SelectWrapper>
            </div>

            {/* Activity hint */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activityIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-sky-50/70 border border-sky-100/80"
              >
                <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <p className="text-[11px] text-slate-500 font-inter">
                  <span className={`font-bold ${selectedActivity.color}`}>
                    {selectedActivity.label}:
                  </span>{" "}
                  {selectedActivity.description} — multiplier{" "}
                  <span className="font-bold text-[#1E3A8A]">x{selectedActivity.factor}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-rose-500 text-xs font-semibold font-inter mb-4 px-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Buttons — centered group, side-by-side on sm+, stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[18px]">
              <motion.button
                id="calc-calculate-btn"
                onClick={handleCalculate}
                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(29,78,216,0.40), 0 2px 6px rgba(0,0,0,0.14)" }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="btn-primary shine w-full sm:w-auto justify-center min-w-[190px] py-3"
              >
                <Sparkles className="h-4 w-4 text-sky-200" aria-hidden="true" />
                Calculate Calories
              </motion.button>
              <AnimatePresence>
                {result && (
                  <motion.button
                    id="calc-reset-btn"
                    onClick={handleReset}
                    initial={{ opacity: 0, scale: 0.88, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0.88, width: 0 }}
                    whileHover={{ y: -2, borderColor: "rgba(96,165,250,0.55)", boxShadow: "0 6px 24px rgba(30,58,138,0.12)" }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="btn-secondary w-full sm:w-auto justify-center min-w-[120px] py-3 overflow-hidden"
                  >
                    Reset
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="border-t border-sky-100/80 px-7 sm:px-10 pt-8 pb-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(240,249,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center type-eyebrow mb-8"
                  >
                    Your Results
                  </motion.p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <ResultCard
                      title="Resting Energy Requirement"
                      value={result.rer}
                      unit="kcal / day"
                      subtitle="Calories needed at complete rest (RER = 70 x kg 0.75)"
                      icon={Flame}
                      gradient="from-sky-500 to-blue-600"
                      glowClass="rgba(96,165,250,0.15)"
                      delay={0.05}
                    />
                    <ResultCard
                      title="Maintenance Energy Requirement"
                      value={result.mer}
                      unit="kcal / day"
                      subtitle={`Recommended daily calories for ${selectedActivity.label.toLowerCase()} lifestyle`}
                      icon={Activity}
                      gradient="from-indigo-500 to-violet-600"
                      glowClass="rgba(99,102,241,0.15)"
                      delay={0.15}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center text-[10.5px] text-slate-400 font-inter mt-6 max-w-lg mx-auto leading-relaxed"
                  >
                    These are estimates based on the NRC metabolic formula. Consult your vet for precise
                    dietary plans based on your pet health conditions.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
    </section>
  );
}
