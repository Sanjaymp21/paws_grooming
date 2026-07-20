"use client";

import React, { useState } from "react";
import { Wallet, Award, Gift, History, Percent, RefreshCw, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function RewardsDashboard() {
  const [points, setPoints] = useState(650);
  const [claimedCards, setClaimedCards] = useState<string[]>([]);
  const [walletView, setWalletView] = useState<"wallet" | "history">("wallet");

  const rewards = [
    { id: "nails", title: "Free Nail Trim", cost: 150, desc: "Gentle clipping & round filing", icon: Award, color: "text-sky-500", bg: "bg-sky-50" },
    { id: "spa", title: "10% Spa Discount", cost: 250, desc: "For any grooming package", icon: Percent, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: "bday", title: "Birthday Gift", cost: 350, desc: "Free premium pet treat & toy", icon: Gift, color: "text-rose-500", bg: "bg-rose-50" },
    { id: "referral", title: "Referral Bonus", cost: 0, desc: "Get 200 PTS on next friend visit", icon: RefreshCw, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "season", title: "Seasonal Offer", cost: 400, desc: "Free herbal massage upgrade", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const pointsHistory = [
    { date: "12 July 2026", desc: "Rocky - Premium Grooming", points: "+150 PTS", type: "earn" },
    { date: "05 July 2026", desc: "Referral - Priya Sundar", points: "+200 PTS", type: "earn" },
    { date: "18 June 2026", desc: "Milo - Basic Grooming", points: "+100 PTS", type: "earn" },
    { date: "10 May 2026", desc: "Claimed: Aromatherapy Upgrade", points: "-200 PTS", type: "spend" },
    { date: "24 April 2026", desc: "Rocky - Luxury Spa", points: "+250 PTS", type: "earn" },
  ];

  const badges = [
    { title: "Squeaky Clean", desc: "Completed 3 grooming cycles", icon: Trophy, color: "text-amber-500" },
    { title: "VIP Puppy", desc: "Loyalty club member for 6+ months", icon: Star, color: "text-sky-500" },
    { title: "Super Referrer", desc: "Referred 2 or more local friends", icon: Award, color: "text-emerald-500" },
  ];

  const handleClaim = (id: string, cost: number, title: string) => {
    if (claimedCards.includes(id)) return;
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setClaimedCards((prev) => [...prev, id]);
      canvasConfetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
      });
    } else {
      alert("Insufficient points to claim this reward.");
    }
  };

  return (
    <section id="rewards-dashboard" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-sky-50/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-50/40 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="section-header">
          <p className="type-eyebrow">Loyalty Hub</p>
          <h2 className="type-h1 mt-1 mb-4">Digital Rewards Wallet &amp; Status</h2>
          <p className="type-body text-slate-500">
            Monitor your points balance, check your grooming visit history, unlock achievement badges, and redeem points for free spa add-ons instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Wallet Main */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card-elevated rounded-[28px] p-6 sm:p-8 border border-sky-100/60 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600" aria-hidden="true" />
              
              {/* Wallet Header Tab Controls */}
              <div className="flex justify-between items-center border-b border-slate-100/80 pb-4 mb-6">
                <div className="flex gap-2 p-1 rounded-xl bg-slate-50 border border-slate-100">
                  <button
                    onClick={() => setWalletView("wallet")}
                    className={`px-4 py-2 rounded-lg font-poppins text-xs font-bold transition-all flex items-center gap-1.5 ${
                      walletView === "wallet"
                        ? "bg-gradient-to-r from-[#1d4ed8] to-[#1E3A8A] text-white shadow-md"
                        : "text-slate-500 hover:text-[#1E3A8A]"
                    }`}
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    Rewards Wallet
                  </button>
                  <button
                    onClick={() => setWalletView("history")}
                    className={`px-4 py-2 rounded-lg font-poppins text-xs font-bold transition-all flex items-center gap-1.5 ${
                      walletView === "history"
                        ? "bg-gradient-to-r from-[#1d4ed8] to-[#1E3A8A] text-white shadow-md"
                        : "text-slate-500 hover:text-[#1E3A8A]"
                    }`}
                  >
                    <History className="h-3.5 w-3.5" />
                    Points History
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-poppins font-bold uppercase tracking-widest block mb-0.5">Wallet Balance</span>
                  <span className="text-3xl font-poppins font-black text-[#1E3A8A]">{points} <span className="text-lg text-sky-400">PTS</span></span>
                </div>
              </div>

              {walletView === "wallet" ? (
                <div>
                  {/* Rewards Grid */}
                  <h4 className="font-poppins font-bold text-sm text-navy-blue mb-4 flex items-center gap-1.5">
                    Available Rewards to Claim
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {rewards.map((reward) => {
                      const isClaimed = claimedCards.includes(reward.id);
                      const canAfford = points >= reward.cost;
                      const costLabel = reward.cost === 0 ? "FREE" : `${reward.cost} PTS`;

                      return (
                        <motion.div
                          key={reward.id}
                          whileHover={!isClaimed ? { y: -3 } : {}}
                          className={`p-5 rounded-2xl border transition-all duration-300 flex justify-between items-start ${
                            isClaimed
                              ? "bg-emerald-50/60 border-emerald-100"
                              : "glass-card border-sky-100/50 hover:shadow-lg hover:shadow-sky-100/30"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${reward.bg} ${reward.color} shadow-sm`}>
                              <reward.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h5 className={`font-poppins font-bold text-sm mb-0.5 ${isClaimed ? "text-emerald-800" : "text-[#1E3A8A]"}`}>
                                {reward.title}
                              </h5>
                              <p className="text-[11px] text-slate-500 font-inter leading-relaxed">
                                {reward.desc}
                              </p>
                              <span className={`inline-block text-[10px] font-extrabold font-poppins mt-2 px-2.5 py-0.5 rounded-full border ${
                                isClaimed
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-sky-50 text-sky-600 border-sky-100"
                              }`}>
                                {costLabel}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleClaim(reward.id, reward.cost, reward.title)}
                            disabled={isClaimed || !canAfford}
                            className={`px-3.5 py-2 rounded-xl font-poppins text-xs font-bold transition-all shrink-0 ml-2 ${
                              isClaimed
                                ? "bg-emerald-500 text-white cursor-default"
                                : canAfford
                                ? "bg-gradient-to-r from-[#1d4ed8] to-[#1E3A8A] text-white shadow-md hover:shadow-lg"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {isClaimed ? "✓ Claimed" : "Claim"}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <h4 className="font-poppins font-bold text-sm text-[#1E3A8A] mb-5">Grooming Wallet Activity</h4>
                  {pointsHistory.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-4 rounded-xl transition-colors border ${
                      item.type === "earn" ? "bg-emerald-50/40 border-emerald-100/60" : "bg-rose-50/30 border-rose-100/50"
                    }`}>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 font-poppins block uppercase tracking-wider">{item.date}</span>
                        <span className="text-sm font-semibold text-[#1E3A8A] font-inter">{item.desc}</span>
                      </div>
                      <span className={`font-poppins font-bold text-sm px-3 py-1.5 rounded-xl ${
                        item.type === "earn" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                      }`}>
                        {item.points}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Achievements & Status Card */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Status Card */}
            <div className="glass-card-elevated rounded-[24px] border border-sky-100/60 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400" aria-hidden="true" />
              <div className="p-6">
                <h4 className="font-poppins font-bold text-sm text-[#1E3A8A] mb-5 flex items-center gap-2">
                  <Trophy className="h-4.5 w-4.5 text-amber-500" />
                  Loyalty Status
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#1d4ed8] to-[#1E3A8A] flex items-center justify-center shadow-xl shadow-blue-200/40">
                    <Star className="h-7 w-7 fill-amber-300 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-poppins block mb-0.5">Current Class</span>
                    <h5 className="font-poppins font-bold text-base text-[#1E3A8A]">Premium Member</h5>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-800 font-inter leading-relaxed">
                    Enjoy priority scheduling and double points on all premium packages. <span className="font-bold">350 PTS</span> away from VIP Tier!
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="glass-card-elevated rounded-[24px] p-6 border border-sky-100/60">
              <h4 className="font-poppins font-bold text-sm text-[#1E3A8A] mb-5">
                Achievement Badges
              </h4>
              <div className="space-y-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="flex gap-3.5 items-center p-3 rounded-xl bg-slate-50/60 border border-slate-100/60">
                    <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 ${badge.color}`}>
                      <badge.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-poppins font-bold text-xs text-[#1E3A8A] leading-none mb-0.5">{badge.title}</h5>
                      <span className="text-[10px] text-slate-400 font-inter block leading-tight">{badge.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
