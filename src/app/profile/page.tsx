"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Save,
  X,
  ShieldCheck,
  Heart,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Gift,
  Trophy,
} from "lucide-react";
import { supabase, signOutUserWithSupabase, fetchApplicationsFromDb, SupabaseApplication } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<SupabaseApplication[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [updateMsg, setUpdateMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        setFullName(currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "");
        setPhone(currentUser.user_metadata?.phone || currentUser.phone || "");

        // Fetch bookings/applications
        try {
          const allApps = await fetchApplicationsFromDb();
          if (allApps) {
            const userEmail = currentUser.email?.toLowerCase() || "";
            const userPhone = (currentUser.user_metadata?.phone || currentUser.phone || "").replace(/\D/g, "");

            const userApps = allApps.filter((app) => {
              const appEmail = (app.email || "").toLowerCase();
              const appPhone = (app.phone || "").replace(/\D/g, "");
              return (
                (userEmail && appEmail === userEmail) ||
                (userPhone && appPhone && appPhone.includes(userPhone))
              );
            });
            setAppointments(userApps);
          }
        } catch (err) {
          console.error("Error loading profile appointments:", err);
        } finally {
          setLoadingAppointments(false);
        }
      }
      setLoading(false);
    }

    loadUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg(null);
    setUpdating(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
        },
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
      }
      setUpdateMsg({ type: "success", text: "Profile details updated successfully!" });
      setIsEditing(false);
    } catch (err: any) {
      setUpdateMsg({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOutUserWithSupabase();
    setUser(null);
    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <p className="font-poppins font-bold text-xs text-slate-500 uppercase tracking-wider">Loading Profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-[32px] p-8 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <UserIcon className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-poppins font-black text-zinc-900">Sign In Required</h2>
              <p className="text-slate-500 font-inter text-xs leading-relaxed">
                You need to log in to view and manage your SST Groomers profile, pet bookings, and loyalty rewards.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-zinc-900 hover:bg-yellow-400 hover:text-zinc-900 text-white font-poppins font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Log In Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-zinc-900 font-poppins font-bold text-xs transition-all flex items-center justify-center"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const userInitial = fullName ? fullName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : "U");
  const memberSince = user.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white border border-yellow-100/90 shadow-xl rounded-[32px] p-6 sm:p-8 overflow-hidden"
        >
          {/* Top Banner Gradient */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-yellow-100/60 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Details */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-zinc-900 text-yellow-400 font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg border-2 border-yellow-400/50">
                  {userInitial}
                </div>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Account">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-poppins font-black text-zinc-900">
                    {fullName || "Pet Parent"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 text-zinc-900 border border-amber-400/40 text-[10.5px] font-bold font-poppins uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    Premium VIP Member
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-inter">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-amber-500" />
                    {user.email}
                  </span>
                  {(phone || user.user_metadata?.phone) && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-amber-500" />
                      {phone || user.user_metadata?.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                    Member since {memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-zinc-900 font-poppins font-bold text-xs transition-all shadow-sm"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 text-slate-600" />
                    <span>Cancel Edit</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 text-amber-600" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-poppins font-bold text-xs shadow-md transition-all disabled:opacity-75 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>{loggingOut ? "Logging out..." : "Log Out"}</span>
              </button>
            </div>

          </div>

          {/* Feedback message */}
          {updateMsg && (
            <div className={`mt-6 p-4 rounded-2xl text-xs font-inter flex items-center justify-between gap-3 ${
              updateMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}>
              <div className="flex items-center gap-2">
                {updateMsg.type === "success" ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                )}
                <span>{updateMsg.text}</span>
              </div>
              <button onClick={() => setUpdateMsg(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Edit Profile Form Accordion */}
          <AnimatePresence>
            {isEditing && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleUpdateProfile}
                className="mt-6 pt-6 border-t border-slate-100 grid sm:grid-cols-2 gap-4"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-poppins font-bold uppercase tracking-wider text-zinc-900">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-zinc-900 rounded-xl px-4 py-3 text-xs font-inter font-medium text-zinc-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-poppins font-bold uppercase tracking-wider text-zinc-900">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-zinc-900 rounded-xl px-4 py-3 text-xs font-inter font-medium text-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-yellow-400 hover:text-zinc-900 text-white font-poppins font-bold text-xs transition-all shadow-md flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{updating ? "Saving..." : "Save Profile Changes"}</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Middle Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: My Bookings & Appointments */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white border border-slate-200/80 shadow-md rounded-[32px] p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-poppins font-black text-zinc-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    My Appointments &amp; Bookings
                  </h2>
                  <p className="text-xs text-slate-500 font-inter mt-0.5">
                    Track your pet&apos;s upcoming and past grooming sessions
                  </p>
                </div>

                <Link
                  href="/book"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-900 hover:bg-zinc-900 hover:text-white font-poppins font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Book New</span>
                </Link>
              </div>

              {loadingAppointments ? (
                <div className="py-12 text-center text-slate-400 text-xs font-inter flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                  <span>Fetching booking history...</span>
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((app) => (
                    <div
                      key={app.id || app.booking_code}
                      className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-yellow-200 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold font-poppins text-zinc-900 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                            {app.booking_code || "SST-BOOK"}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            app.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {app.status || "Confirmed"}
                          </span>
                        </div>

                        <h3 className="font-poppins font-bold text-sm text-zinc-900">
                          {app.pet_name} ({app.breed || app.pet_type}) — <span className="text-amber-600">{app.package_name}</span>
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-inter">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {app.appointment_date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {app.appointment_time}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-poppins font-bold text-slate-400 block">Owner: {app.owner_name}</span>
                        <span className="text-[11px] font-inter text-slate-500 block">{app.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 px-6 rounded-2xl bg-amber-50/40 border border-amber-100 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-poppins font-bold text-sm text-zinc-900">No Bookings Found Yet</h4>
                    <p className="text-xs text-slate-500 font-inter max-w-sm mx-auto">
                      You haven&apos;t booked a pampering session for your pet yet. Treat them to a luxury bath &amp; groom today!
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-yellow-400 hover:text-zinc-900 font-poppins font-bold text-xs transition-all shadow-md"
                    >
                      <span>Book First Appointment</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Actions & Shop Card */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/products"
                className="p-6 rounded-[28px] bg-gradient-to-br from-amber-50 to-yellow-100/70 border border-amber-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm text-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-poppins font-bold text-base text-zinc-900">Explore Pet Store</h3>
                  <p className="text-xs text-slate-600 font-inter">
                    Order organic shampoos, coats, toys, and grooming brushes online.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-poppins font-bold text-zinc-900 group-hover:translate-x-1 transition-transform">
                  <span>Browse Products</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>

              <Link
                href="/services"
                className="p-6 rounded-[28px] bg-gradient-to-br from-slate-900 to-zinc-800 text-white border border-zinc-800 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-base text-white">View Grooming Packages</h3>
                  <p className="text-xs text-slate-300 font-inter">
                    See our full bath, haircut, ear cleaning, and styling services.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-poppins font-bold text-yellow-400 group-hover:translate-x-1 transition-transform">
                  <span>View All Services</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>

          </div>

          {/* Right Column: Loyalty Rewards & Account Settings */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Loyalty Wallet Summary Card */}
            <div className="bg-white border border-slate-200/80 shadow-md rounded-[32px] p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-poppins font-black text-base text-zinc-900 flex items-center gap-2">
                  <Trophy className="h-4.5 w-4.5 text-amber-500" />
                  Loyalty &amp; Rewards
                </h3>
                <span className="text-[10px] font-bold font-poppins uppercase bg-amber-100 text-zinc-900 px-2.5 py-0.5 rounded-full">
                  650 PTS
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-zinc-900 space-y-2 shadow-md">
                <span className="text-[10px] font-bold font-poppins uppercase tracking-wider block opacity-80">
                  Available Rewards Balance
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-poppins font-black">650 <span className="text-sm">PTS</span></span>
                  <span className="text-xs font-poppins font-bold bg-zinc-900 text-white px-3 py-1 rounded-xl">
                    Gold Tier
                  </span>
                </div>
                <p className="text-[11px] font-inter text-zinc-900/90 leading-tight pt-1">
                  Redeem your points for free nail trimming, spa upgrades, or 10% discounts on full bath sessions!
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-poppins font-bold uppercase tracking-wider text-slate-400">Available Benefits</h4>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-poppins font-bold text-xs text-zinc-900">Free Nail Trim</h5>
                    <p className="text-[10px] text-slate-500 font-inter">Redeemable at 150 PTS</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Gift className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-poppins font-bold text-xs text-zinc-900">Birthday Gift Pack</h5>
                    <p className="text-[10px] text-slate-500 font-inter">Redeemable at 350 PTS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout & Account Security Card */}
            <div className="bg-white border border-slate-200/80 shadow-md rounded-[32px] p-6 space-y-4">
              <h3 className="font-poppins font-black text-base text-zinc-900 flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                Account Security
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 text-xs font-inter text-slate-600 space-y-1">
                <p className="font-poppins font-bold text-zinc-900">Session Status</p>
                <p>You are safely logged in on this browser session.</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-poppins font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{loggingOut ? "Logging out..." : "Log Out of Account"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
