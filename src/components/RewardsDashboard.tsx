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
    <section id="rewards-dashboard" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-poppins">
            Loyalty Hub
          </h2>
          <h3 className="text-3xl sm:text-4xl font-poppins font-extrabold text-navy-blue tracking-tight">
            Digital Rewards Wallet &amp; Status
          </h3>
          <p className="text-md text-slate-gray font-inter leading-relaxed">
            Monitor your points balance, check your grooming visit history, unlock achievement badges, and redeem points for free spa add-ons instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Wallet Main */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-sky-100/80 shadow-md">
              
              {/* Wallet Header Tab Controls */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setWalletView("wallet")}
                    className={`px-4 py-2 rounded-xl font-poppins text-xs font-bold transition-all flex items-center gap-1.5 ${
                      walletView === "wallet"
                        ? "bg-navy-blue text-white shadow-sm"
                        : "text-slate-gray hover:text-navy-blue hover:bg-slate-50"
                    }`}
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    Rewards Wallet
                  </button>
                  <button
                    onClick={() => setWalletView("history")}
                    className={`px-4 py-2 rounded-xl font-poppins text-xs font-bold transition-all flex items-center gap-1.5 ${
                      walletView === "history"
                        ? "bg-navy-blue text-white shadow-sm"
                        : "text-slate-gray hover:text-navy-blue hover:bg-slate-50"
                    }`}
                  >
                    <History className="h-3.5 w-3.5" />
                    Points History
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-gray font-poppins font-semibold uppercase tracking-wider block">Wallet Balance</span>
                  <span className="text-2xl font-poppins font-black text-navy-blue">{points} PTS</span>
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
                        <div
                          key={reward.id}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex justify-between items-start ${
                            isClaimed
                              ? "bg-emerald-50/50 border-emerald-100 opacity-80"
                              : "glass-card border-slate-100 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`p-2.5 rounded-xl shrink-0 ${reward.bg} ${reward.color}`}>
                              <reward.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h5 className={`font-poppins font-bold text-sm ${isClaimed ? "text-emerald-800" : "text-navy-blue"}`}>
                                {reward.title}
                              </h5>
                              <p className="text-[11px] text-slate-gray font-inter leading-relaxed mt-0.5">
                                {reward.desc}
                              </p>
                              <span className={`inline-block text-[10px] font-extrabold font-poppins mt-2 px-2 py-0.5 rounded-full ${
                                isClaimed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-sky-50 text-sky-600"
                              }`}>
                                {costLabel}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleClaim(reward.id, reward.cost, reward.title)}
                            disabled={isClaimed || !canAfford}
                            className={`px-3 py-1.5 rounded-xl font-poppins text-xs font-bold transition-all shrink-0 ${
                              isClaimed
                                ? "bg-emerald-500 text-white cursor-default"
                                : canAfford
                                ? "bg-navy-blue text-white hover:bg-sky-500 shadow-sm"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {isClaimed ? "Claimed" : "Claim"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <h4 className="font-poppins font-bold text-sm text-navy-blue mb-4">Grooming Wallet Activity</h4>
                  {pointsHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-sky-50/20 transition-colors border border-slate-50">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-gray font-poppins block">{item.date}</span>
                        <span className="text-sm font-semibold text-navy-blue font-inter">{item.desc}</span>
                      </div>
                      <span className={`font-poppins font-bold text-sm ${
                        item.type === "earn" ? "text-emerald-600" : "text-rose-500"
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
          <div className="lg:col-span-4 space-y-6">
            
            {/* Status Card */}
            <div className="p-6 rounded-[28px] glass-card border border-sky-100 shadow-sm">
              <h4 className="font-poppins font-bold text-sm text-navy-blue mb-4 flex items-center gap-2">
                <Trophy className="h-4.5 w-4.5 text-amber-500" />
                Loyalty Status
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-navy-blue to-sky-400 flex items-center justify-center text-white">
                  <Star className="h-6 w-6 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-gray uppercase font-poppins">Current Class</span>
                  <h5 className="font-poppins font-bold text-md text-navy-blue">Premium Member</h5>
                </div>
              </div>
              <p className="text-xs text-slate-gray font-inter leading-relaxed">
                Enjoy priority scheduling and double reward points on all premium packages. You are only 350 PTS away from unlocking VIP Tier!
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="p-6 rounded-[28px] glass-card border border-sky-100 shadow-sm">
              <h4 className="font-poppins font-bold text-sm text-navy-blue mb-4">
                Achievement Badges
              </h4>
              <div className="space-y-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className={`h-9 w-9 rounded-lg bg-sky-50 flex items-center justify-center ${badge.color}`}>
                      <badge.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h5 className="font-poppins font-bold text-xs text-navy-blue leading-none">{badge.title}</h5>
                      <span className="text-[10px] text-slate-gray font-inter mt-0.5 block leading-tight">{badge.desc}</span>
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
