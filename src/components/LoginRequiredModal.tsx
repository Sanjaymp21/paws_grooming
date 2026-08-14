"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogIn, UserPlus, X, ShieldAlert } from "lucide-react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  title = "Authentication Required",
  message = "You haven't logged in yet! Please sign in to your SST Groomers account to book grooming appointments or purchase pet products."
}: LoginRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full max-w-md bg-white dark:bg-[#111827] border border-yellow-200 dark:border-yellow-500/20 rounded-[32px] p-7 sm:p-8 shadow-2xl relative z-10 overflow-hidden text-center"
          >
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-8.5 w-8.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon Header */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-600 dark:text-amber-400 shadow-md shadow-amber-100 dark:shadow-none">
              <Lock className="h-8 w-8 stroke-[2.25px]" />
            </div>

            {/* Content */}
            <div className="space-y-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 text-[11px] font-bold font-poppins uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" />
                Access Restricted
              </span>
              <h3 className="text-2xl font-poppins font-black text-slate-900 dark:text-white leading-tight">
                {title}
              </h3>
              <p className="text-xs font-inter text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                {message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-black hover:to-zinc-900 dark:from-yellow-400 dark:to-yellow-500 dark:hover:from-yellow-500 dark:hover:to-yellow-600 text-white dark:text-black font-poppins font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                <span>Log In Now</span>
              </Link>

              <Link
                href="/register"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-zinc-900 dark:hover:border-yellow-400 text-zinc-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-poppins font-bold text-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Create an Account</span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="text-[11px] font-poppins font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors pt-1"
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
