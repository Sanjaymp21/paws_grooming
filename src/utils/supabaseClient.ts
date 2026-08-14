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
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName, phone }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, user: result.user, session: result.session };
    }

    if (result.error) {
      throw new Error(result.error);
    }

    // Fallback to client signUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          phone_number: phone,
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

export async function requestPhoneOTP(phone: string) {
  try {
    const res = await fetch("/api/auth/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to generate OTP");
    }

    return {
      success: true,
      demoOtp: data.demo_otp,
      expiresAt: data.expires_at,
      phone: data.phone,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to request OTP" };
  }
}

export async function verifyPhoneOTP(phone: string, otp: string, fullName?: string) {
  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp, fullName }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Invalid or expired OTP");
    }

    return { success: true, user: data.user, session: data.session };
  } catch (err: any) {
    return { success: false, error: err.message || "OTP verification failed" };
  }
}

// ----------------------------------------------------
// CART DATABASE HELPERS (cart_items table in Supabase)
// ----------------------------------------------------
export interface SupabaseCartItem {
  id?: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export async function fetchCartItemsFromDb(userId: string): Promise<SupabaseCartItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.warn("Supabase cart_items fetch notice:", error.message);
      return null;
    }

    if (!data) return [];

    console.log("🛒 Fetched items from Supabase cart_items:", data.length);
    return data.map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id || item.item_id || item.id,
      product_name: item.product_name || item.name || item.title || "Product",
      product_price: Number(item.product_price || item.price || item.mrp || 0),
      product_image: item.product_image || item.image || item.image_url || "",
      quantity: Number(item.quantity || 1),
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.warn("cart_items fetch error:", err);
    return null;
  }
}

export async function addToCartInDb(
  userId: string,
  product: { id: string; name: string; mrp: number; discount: number; image: string },
  quantity: number = 1
) {
  try {
    const price = Math.round(product.mrp * (1 - product.discount / 100));

    const { data: existingItems } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", product.id);

    if (existingItems && existingItems.length > 0) {
      const existing = existingItems[0];
      const newQty = (existing.quantity || 1) + quantity;
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: newQty, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select();

      if (!error) {
        console.log("🛒 Updated item quantity in Supabase cart_items:", data);
        return { success: true, data };
      }
    }

    const primaryPayload = {
      user_id: userId,
      product_id: product.id,
      product_name: product.name,
      product_price: price,
      product_image: product.image,
      quantity,
    };

    let { data, error } = await supabase
      .from("cart_items")
      .insert([primaryPayload])
      .select();

    if (!error) {
      console.log("🛒 Inserted item into Supabase cart_items:", data);
      return { success: true, data };
    }

    const fallbackPayloadA = {
      user_id: userId,
      product_id: product.id,
      name: product.name,
      price: price,
      image: product.image,
      quantity,
    };

    const resA = await supabase
      .from("cart_items")
      .insert([fallbackPayloadA])
      .select();

    if (!resA.error) {
      console.log("🛒 Inserted item into Supabase cart_items (fallback A):", resA.data);
      return { success: true, data: resA.data };
    }

    const fallbackPayloadB = {
      user_id: userId,
      product_id: product.id,
      quantity,
    };

    const resB = await supabase
      .from("cart_items")
      .insert([fallbackPayloadB])
      .select();

    if (!resB.error) {
      console.log("🛒 Inserted item into Supabase cart_items (fallback B):", resB.data);
      return { success: true, data: resB.data };
    }

    console.warn("Supabase cart_items insert error:", error?.message || resA.error?.message);
    return { success: false, error: error?.message || resA.error?.message };
  } catch (err: any) {
    console.warn("Supabase cart_items insert exception:", err?.message || err);
    return { success: false, error: err?.message };
  }
}

export async function updateCartQuantityInDb(userId: string, productId: string, newQuantity: number) {
  try {
    if (newQuantity <= 0) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) throw error;
      return { success: true };
    } else {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("product_id", productId)
        .select();

      if (error) throw error;
      return { success: true, data };
    }
  } catch (err: any) {
    console.warn("Supabase cart_items update notice:", err?.message || err);
    return { success: false, error: err?.message };
  }
}

export async function clearCartInDb(userId: string) {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.warn("Supabase cart_items clear notice:", err?.message || err);
    return { success: false, error: err?.message };
  }
}

// ----------------------------------------------------
// PRODUCT ORDERS DATABASE HELPERS (orders table in Supabase)
// ----------------------------------------------------
export interface SupabaseOrder {
  id?: string;
  order_code?: string;
  user_id: string;
  items: any[];
  total_price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at?: string;
}

export async function createOrderInDb(userId: string, cartItems: any[], totalPrice: number) {
  try {
    const order_code = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      order_code,
      user_id: userId,
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        quantity: item.quantity,
        price: Math.round(item.product.mrp * (1 - item.product.discount / 100)),
      })),
      total_price: totalPrice,
      status: "confirmed",
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([payload])
      .select();

    if (error) {
      console.warn("Supabase orders insert notice:", error.message);
      return { success: false, error: error.message };
    }

    console.log("📦 Order saved to Supabase orders table:", data);
    return { success: true, data };
  } catch (err: any) {
    console.warn("createOrderInDb exception:", err?.message || err);
    return { success: false, error: err?.message };
  }
}



