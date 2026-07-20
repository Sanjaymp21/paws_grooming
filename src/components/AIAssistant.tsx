"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Award, Sparkles, AlertCircle, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  isChipResponse?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: "Hi! I'm here to help you choose the perfect grooming package and answer your pet care questions. Click any chip below for quick answers!",
      },
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const responseMap: Record<string, string> = {
    "Package Pricing": "Our grooming packages are: Basic Grooming (₹799), Premium Grooming (₹1499), and Luxury Spa (₹2499). Standard durations range from 45 to 120 minutes. You can also calculate recommendations matching your specific breed above!",
    "Membership": "SST Groomers Club Membership rewards regular visits: Groom 3 times and get the 4th session completely FREE! Members also enjoy 10% off spa upgrades, priority slots, and free nail trimming checkups.",
    "Puppy Grooming": "For puppies under 6 months, we focus on gentle acclimation. We introduce them slowly to water, blow dryers, and scissors so they grow up loving the salon. We recommend our Basic Grooming package for their first session.",
    "Cat Grooming": "Yes, we groom cats! We have dedicated cat specialists who perform shampooing, coat brushing, and nail clipping. Cat sessions are scheduled during low-noise, specific hours to minimize cat anxiety.",
    "Book Appointment": "To schedule a session, click the 'Book Appointment' button in the navbar or fill out our reservation form below. We will send you an SMS confirmation immediately.",
    "Salon Timings": "Monday-Saturday: 9 AM to 7 PM. Sunday: 10 AM to 4 PM. We suggest booking in advance, especially for weekend slots!",
    "Pet Care Tips": "Coimbatore's warm climate can dehydrate pet coats. We suggest daily brushing for double-coated breeds (like Retrievers) and regular paw butter application to soothe dry paw pads from hot tarmac.",
    "Vaccination Reminder": "Pets must be fully vaccinated for core vaccines (like anti-rabies) before scheduling any grooming. This ensures a safe, disease-free environment for all our visiting furry friends."
  };

  const quickChips = [
    "Package Pricing",
    "Membership",
    "Puppy Grooming",
    "Cat Grooming",
    "Book Appointment",
    "Salon Timings",
    "Pet Care Tips",
    "Vaccination Reminder",
  ];

  const handleChipClick = (chip: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: chip,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate bot answering
    setTimeout(() => {
      const botReply = responseMap[chip] || "I'm looking into that for you.";
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: botReply,
        isChipResponse: true,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: inputText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      // Basic fallback matches
      let text = "I'm sorry, I didn't quite catch that. Try using one of our quick helper chips for immediate advice on pricing, scheduling, and timings!";
      const lower = userMsg.text.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("charge")) {
        text = responseMap["Package Pricing"];
      } else if (lower.includes("member") || lower.includes("club") || lower.includes("free")) {
        text = responseMap["Membership"];
      } else if (lower.includes("cat") || lower.includes("kitten")) {
        text = responseMap["Cat Grooming"];
      } else if (lower.includes("puppy") || lower.includes("dog")) {
        text = responseMap["Puppy Grooming"];
      } else if (lower.includes("time") || lower.includes("open") || lower.includes("hour")) {
        text = responseMap["Salon Timings"];
      } else if (lower.includes("book") || lower.includes("appoint")) {
        text = responseMap["Book Appointment"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Buttons Group Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-center pointer-events-none">
        
        {/* Theme Toggle Button (Top) */}
        <div className="group relative pointer-events-auto">
          {/* Tooltip on hover */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold tracking-wide uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg whitespace-nowrap border border-white/10 hidden md:block">
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </div>

          <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="lg:h-16 lg:w-16 md:h-14 md:w-14 h-[52px] w-[52px] rounded-full text-white flex items-center justify-center cursor-pointer relative shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:outline-none focus:outline-none transition-shadow"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #000000)", boxShadow: "0 8px 32px rgba(29,78,216,0.4)" }}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="lg:h-7 lg:w-7 md:h-6 md:w-6 h-5.5 w-5.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="lg:h-7 lg:w-7 md:h-6 md:w-6 h-5.5 w-5.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Chatbot Toggle Button (Bottom) */}
        <div className="group relative pointer-events-auto">
          {/* Tooltip on hover */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold tracking-wide uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg whitespace-nowrap border border-white/10 hidden md:block">
            {isOpen ? "Close Assistant" : "Open Assistant"}
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="lg:h-16 lg:w-16 md:h-14 md:w-14 h-[52px] w-[52px] rounded-full text-white flex items-center justify-center cursor-pointer relative shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:outline-none focus:outline-none pulse-glow"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #000000)", boxShadow: "0 8px 32px rgba(29,78,216,0.4)" }}
            aria-label="Toggle assistant"
            title="Toggle assistant"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="lg:h-7 lg:w-7 md:h-6 md:w-6 h-5.5 w-5.5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MessageSquare className="lg:h-7 lg:w-7 md:h-6 md:w-6 h-5.5 w-5.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed lg:bottom-[180px] md:bottom-[160px] bottom-[152px] right-6 w-[340px] sm:w-[390px] h-[520px] rounded-[28px] overflow-hidden z-40 text-left flex flex-col"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex justify-between items-center" style={{ background: "linear-gradient(135deg, #0d1a4a 0%, #000000 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg border border-white/10">🐶</div>
                <div>
                  <h4 className="font-poppins font-black text-[13px] text-white leading-none">PetCare AI Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="text-[9px] text-yellow-100 font-bold tracking-wider uppercase font-poppins">Online · Coimbatore Bot</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 no-scrollbar text-xs" style={{ background: "rgba(8,15,45,0.97)" }}>
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 max-w-[88%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-yellow-400/15 text-[11px] flex items-center justify-center shrink-0 border border-sky-400/20">
                        🤖
                      </div>
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl leading-relaxed font-inter font-medium text-[12px] ${
                        isBot
                          ? "bg-white/8 text-slate-200 rounded-bl-none border border-white/6"
                          : "text-white rounded-br-none"
                      }`}
                      style={!isBot ? { background: "linear-gradient(135deg, #1d4ed8, #000000)" } : {}}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading Typing State */}
              {isTyping && (
                <div className="flex items-end gap-2 mr-auto max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-yellow-400/15 text-[11px] flex items-center justify-center shrink-0 border border-sky-400/20">🤖</div>
                  <div className="px-4 py-3.5 rounded-2xl rounded-bl-none bg-white/8 border border-white/6 flex items-center gap-1.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="px-4 py-2.5 flex gap-2 overflow-x-auto no-scrollbar" style={{ background: "rgba(8,15,45,0.97)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {quickChips.map((chip, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleChipClick(chip)}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-poppins font-bold whitespace-nowrap transition-all hover:bg-white/10 hover:border-sky-400/30"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {chip}
                </motion.button>
              ))}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSend} className="p-3.5 flex gap-2" style={{ background: "rgba(8,15,45,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <input
                type="text"
                placeholder="Ask about hours, pricing, vaccines..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow px-3.5 py-2.5 rounded-xl text-[12px] text-white placeholder:text-slate-500 focus:outline-none border border-white/8 focus:border-sky-400/40"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.93 }}
                className="p-2.5 rounded-xl text-white flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #000000)" }}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
