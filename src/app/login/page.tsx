"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, Mail, Sparkles, AlertCircle, ArrowLeft, Heart } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 relative overflow-hidden bg-slate-50">
      
      {/* LEFT COLUMN: Dog/Cat Illustrations, Flat Yellow Background */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden bg-yellow-400">
        {/* Glow Effects removed for flat theme */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        </div>

        {/* Back Link */}
        <Link href="/" className="flex items-center gap-2 text-black/80 hover:text-black transition-colors relative z-10 text-xs font-bold font-poppins uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Illustrations & Welcome Greeting */}
        <div className="my-auto relative z-10 text-black space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black text-[11px] font-bold font-poppins tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-black" />
              Welcome Back
            </span>
            <h1 className="text-4xl sm:text-5xl font-poppins font-black leading-tight tracking-tight text-black">
              Log in to your <br />
              <span className="text-black">SST Groomers</span>
            </h1>
            <p className="text-zinc-800 text-sm font-inter leading-relaxed max-w-sm">
              Access your pet&apos;s digital grooming history, schedule quick re-bookings, and track your loyalty points.
            </p>
          </div>

          {/* Dog Floating Illustration */}
          <div className="relative h-60 w-full flex items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="w-48 h-64 rounded-[24px] overflow-hidden border-2 border-black/10 shadow-2xl relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop"
                alt="Groomed Dog Illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-xs font-bold font-poppins text-white uppercase tracking-wider">🐾 Happy Pets</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="text-white/50 text-[10px] font-inter relative z-10 flex justify-between items-center border-t border-white/10 pt-6">
          <span>© 2026 SST Groomers.</span>
          <span className="flex items-center gap-1">Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> in Coimbatore</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Glass Login Card & Controls */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-yellow-100/50 blur-[100px]" />
          <div className="absolute bottom-[20%] left-0 w-[300px] h-[300px] rounded-full bg-yellow-100/40 blur-[80px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white/85 backdrop-blur-xl border border-yellow-100/80 shadow-2xl rounded-[32px] p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top colored band */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-amber-500" />

          {/* Form Content */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-poppins font-black text-zinc-900">Welcome back</h2>
              <p className="text-xs text-slate-400 font-inter mt-1.5">
                New to SST Groomers?{" "}
                <Link href="/register" className="text-zinc-900 hover:text-zinc-900 font-bold font-poppins">
                  Create an account
                </Link>
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4.5 rounded-2xl text-center space-y-2.5"
              >
                <p className="text-sm font-poppins font-bold">Successfully Logged In!</p>
                <p className="text-xs font-inter text-slate-500">Redirecting to your dashboard...</p>
                <div className="pt-2">
                  <Link href="/" className="inline-flex items-center px-4.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-poppins font-bold hover:bg-yellow-500 transition-all">
                    Go to Homepage
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl text-xs font-inter flex items-center gap-2">
                    <AlertCircle className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Email field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="login-email" className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <Mail className="h-4.5 w-4.5 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="login-password" className="text-xs font-poppins font-bold text-zinc-900 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-zinc-900 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-inter font-semibold text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <KeyRound className="h-4.5 w-4.5 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs font-poppins font-bold">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-zinc-900 focus:ring-yellow-400 cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>
                  <Link href="/login" onClick={() => alert("Password reset link has been dispatched to your email.")} className="text-zinc-900 hover:text-zinc-900 transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Action */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-poppins font-bold shadow-md hover:shadow-lg hover:shadow-yellow-100 active:scale-[0.99] transition-all duration-300 disabled:opacity-80"
                  style={{ padding: "1rem" }}
                >
                  {loading ? "Authenticating..." : "Log In"}
                </motion.button>
              </form>
            )}

            {/* Social Logins Split */}
            <div className="relative py-2 flex items-center">
              <div className="flex-grow border-t border-slate-100" />
              <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or Continue With</span>
              <div className="flex-grow border-t border-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Google login */}
              <button
                type="button"
                onClick={() => alert("Connecting with Google...")}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:border-sky-300 hover:bg-yellow-50/50 text-[#334155] font-poppins font-bold text-xs transition-all duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&auto=format&fit=crop"
                  alt="Google logo"
                  className="w-4.5 h-4.5 rounded-full"
                />
                Google
              </button>

              {/* Apple login */}
              <button
                type="button"
                onClick={() => alert("Connecting with Apple...")}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:border-sky-300 hover:bg-yellow-50/50 text-[#334155] font-poppins font-bold text-xs transition-all duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=40&auto=format&fit=crop"
                  alt="Apple logo"
                  className="w-4.5 h-4.5 rounded-full"
                />
                Apple
              </button>
            </div>

            {/* Footer options */}
            <div className="pt-6 border-t border-slate-100 flex justify-center gap-4 text-[10.5px] font-poppins font-bold text-slate-400">
              <Link href="/safety" className="hover:text-zinc-900">Privacy Policy</Link>
              <span>•</span>
              <Link href="/safety" className="hover:text-zinc-900">Terms</Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-zinc-900">Help Center</Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
