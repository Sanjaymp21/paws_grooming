import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yqcrgttqkvdlwbvzzncl.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_D-YMNrFS0_NW6Dc1TSQn-Q_wKKkbBLE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface SupabaseGalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string;
  created_at?: string;
}

export interface SupabaseApplication {
  id?: string;
  booking_code?: string;
  owner_name: string;
  phone: string;
  email?: string;
  pet_name: string;
  pet_type: "dog" | "cat";
  breed: string;
  package_name: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  status?: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  created_at?: string;
}

export interface SupabaseUserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: "user" | "admin" | "groomer";
  phone?: string;
  created_at?: string;
}

// ----------------------------------------------------
// GALLERY DATABASE HELPERS
// ----------------------------------------------------
export async function fetchGalleryItemsFromDb(): Promise<SupabaseGalleryItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase Gallery fetch notice:", error.message);
      return null;
    }
    return data as SupabaseGalleryItem[];
  } catch (err) {
    console.warn("Gallery fetch fallback:", err);
    return null;
  }
}

// ----------------------------------------------------
// APPLICATION / BOOKING DATABASE HELPERS
// ----------------------------------------------------
export async function submitApplicationToDb(appData: SupabaseApplication) {
  try {
    const booking_code = "SST-" + Math.floor(1000 + Math.random() * 9000);
    const payload = {
      booking_code,
      owner_name: appData.owner_name,
      phone: appData.phone,
      email: appData.email || "",
      pet_name: appData.pet_name,
      pet_type: appData.pet_type,
      breed: appData.breed,
      package_name: appData.package_name,
      appointment_date: appData.appointment_date,
      appointment_time: appData.appointment_time,
      notes: appData.notes || "",
      status: appData.status || "confirmed",
    };

    const { data, error } = await supabase
      .from("applications")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn("Supabase Applications insert notice:", error.message);
      // Fallback response with client-generated code if table not ready
      return { success: true, data: { ...payload, id: booking_code }, isFallback: true };
    }

    return { success: true, data, isFallback: false };
  } catch (err) {
    console.error("Error submitting application to Supabase:", err);
    return { success: false, error: err };
  }
}

export async function fetchApplicationsFromDb(): Promise<SupabaseApplication[] | null> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase Applications fetch notice:", error.message);
      return null;
    }
    return data as SupabaseApplication[];
  } catch (err) {
    console.warn("Applications fetch error:", err);
    return null;
  }
}

export async function updateApplicationStatusInDb(id: string, status: SupabaseApplication["status"]) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Failed to update application status:", err);
    return { success: false, error: err };
  }
}

// ----------------------------------------------------
// USER & ADMIN AUTH HELPERS
// ----------------------------------------------------
export async function signUpUserWithSupabase(email: string, password: string, fullName: string, phone?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: "user",
        },
      },
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || "Sign up failed" };
  }
}

export async function signInUserWithSupabase(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (err: any) {
    return { success: false, error: err.message || "Invalid email or password" };
  }
}

export async function signOutUserWithSupabase() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Sign out failed" };
  }
}
