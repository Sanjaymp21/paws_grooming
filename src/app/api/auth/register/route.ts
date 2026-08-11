import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin Client with Service Role Key to update auth.users top-level phone column
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yqcrgttqkvdlwbvzzncl.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_secret_hmu1zh8R9grytwBAft-unw_jy8qQ6k_";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_D-YMNrFS0_NW6Dc1TSQn-Q_wKKkbBLE";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const supabaseAnon = createClient(supabaseUrl, anonKey);

function formatE164Phone(rawPhone: string): string {
  if (!rawPhone) return "";
  // Strip non-digit characters except leading '+'
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  // If 10 digits (e.g. Indian mobile number), prepend +91
  if (cleaned.length === 10) return `+91${cleaned}`;
  // Default fallback prepend '+'
  return `+${cleaned}`;
}

export async function POST(req: Request) {
  try {
    const { email, password, fullName, phone } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const formattedPhone = phone ? formatE164Phone(phone) : "";

    // 1. Create user using Admin API (Bypasses email confirmation bottlenecks)
    let user = null;
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone: formattedPhone || phone,
        phone_number: formattedPhone || phone,
        role: "user",
      },
    });

    if (adminError) {
      console.warn("[Register API] Admin createUser notice, trying anon signUp:", adminError.message);
      const { data: anonData, error: anonErr } = await supabaseAnon.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: formattedPhone || phone,
            phone_number: formattedPhone || phone,
            role: "user",
          },
        },
      });

      if (anonErr) {
        const userMsg = anonErr.message.includes("Database error")
          ? "Account already exists or DB trigger issue. Please try logging in."
          : anonErr.message;
        return NextResponse.json({ success: false, error: userMsg }, { status: 400 });
      }
      user = anonData.user;
    } else {
      user = adminData.user;
    }

    // 2. Attempt updating top-level phone if phone provider is enabled
    if (user && formattedPhone) {
      try {
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
          phone: formattedPhone,
          phone_confirm: true,
        });
      } catch (pErr) {
        console.warn("[Register API] Phone column update note:", pErr);
      }
    }

    // 3. Upsert into public 'profiles' table for record-keeping
    if (user) {
      try {
        await supabaseAdmin.from("profiles").upsert([
          {
            id: user.id,
            email: email,
            full_name: fullName,
            phone: formattedPhone || phone || "",
            role: "user",
          },
        ]);
      } catch (profErr) {
        console.warn("[Register API] Profiles upsert notice:", profErr);
      }
    }

    return NextResponse.json({
      success: true,
      user: user,
      session: null,
    });
  } catch (err: any) {
    console.error("[Register API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}
