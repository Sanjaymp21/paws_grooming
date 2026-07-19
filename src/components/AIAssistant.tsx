"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Award, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-tr from-navy-blue to-sky-400 text-white shadow-xl shadow-sky-300 flex items-center justify-center cursor-pointer pulse-glow hover:scale-105 transition-all z-40"
        aria-label="Toggle assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[500px] rounded-[30px] glass-card-dark border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden z-40 text-left"
          >
            {/* Header */}
            <div className="p-4 bg-navy-blue/70 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🐶</span>
                <div>
                  <h4 className="font-poppins font-black text-sm text-white">PetCare AI Assistant</h4>
                  <span className="text-[9px] text-sky-300 font-semibold tracking-wider uppercase block font-poppins">Coimbatore local bot</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 max-w-[85%] ${
                      isBot ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"
                    }`}
                  >
                    {isBot && (
                      <div className="h-6.5 w-6.5 rounded-full bg-sky-500/20 text-[10px] flex items-center justify-center shrink-0 shadow-sm border border-sky-400/20 text-white">
                        🤖
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl leading-relaxed font-inter font-medium ${
                        isBot
                          ? "bg-white/10 text-slate-100 rounded-bl-none"
                          : "bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-br-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Loading Typing State */}
              {isTyping && (
                <div className="flex items-end gap-2 mr-auto text-left max-w-[85%]">
                  <div className="h-6.5 w-6.5 rounded-full bg-sky-500/20 text-[10px] flex items-center justify-center shrink-0 border border-sky-400/20 text-white">
                    🤖
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 text-slate-200 rounded-bl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips Selection */}
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto select-none no-scrollbar border-t border-white/5 bg-navy-blue/10">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/15 text-[10px] font-poppins font-bold whitespace-nowrap transition-all duration-200"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-navy-blue/50 flex gap-2">
              <input
                type="text"
                placeholder="Ask about hours, pricing, vaccines..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow px-3 py-2 rounded-xl text-xs text-white focus:outline-none bg-white/5 border border-white/10"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                aria-label="Send"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
