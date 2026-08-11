import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { globalOtpCache } from "../generate-otp/route";

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
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  return `+${cleaned}`;
}

export async function POST(req: Request) {
  try {
    const { phone, otp, fullName } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: "Phone number and OTP code are required." },
        { status: 400 }
      );
    }

    const formattedPhone = formatE164Phone(phone);
    const nowIso = new Date().toISOString();

    // 1. Check matching unverified, non-expired OTP record
    let isValidOtp = false;

    try {
      const { data: record, error: recordError } = await supabaseAdmin
        .from("otp_verifications")
        .select("*")
        .eq("phone", formattedPhone)
        .eq("otp", otp.trim())
        .eq("verified", false)
        .gt("expires_at", nowIso)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (record && !recordError) {
        isValidOtp = true;
        await supabaseAdmin
          .from("otp_verifications")
          .update({ verified: true })
          .eq("id", record.id);
      }
    } catch (dbErr) {
      console.warn("[Verify OTP] DB query notice:", dbErr);
    }

    // Fallback memory check
    if (!isValidOtp) {
      const cached = globalOtpCache.get(formattedPhone);
      if (cached && cached.otp === otp.trim() && cached.expiresAt > Date.now()) {
        isValidOtp = true;
        globalOtpCache.delete(formattedPhone);
      }
    }

    if (!isValidOtp) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP code. Please check your code or request a new one." },
        { status: 400 }
      );
    }

    // 3. Find or Create User in Supabase Auth
    const digitsOnly = formattedPhone.replace(/\D/g, "");
    const syntheticEmail = `phone_${digitsOnly}@otp.sstgroomers.com`;
    const defaultPassword = `Paws_${digitsOnly}_OtpPass!`;

    let targetUser = null;

    // Search existing user by phone or synthetic email
    const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
    if (userList && userList.users) {
      targetUser = userList.users.find(
        (u) => u.phone === formattedPhone || u.email === syntheticEmail || u.user_metadata?.phone === formattedPhone
      );
    }

    if (!targetUser) {
      // Create new user with phone & synthetic email
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: syntheticEmail,
        password: defaultPassword,
        phone: formattedPhone,
        email_confirm: true,
        phone_confirm: true,
        user_metadata: {
          full_name: fullName || `User ${formattedPhone.slice(-4)}`,
          phone: formattedPhone,
          phone_number: formattedPhone,
          role: "user",
        },
      });

      if (createError) {
        console.error("[Verify OTP] Create user error:", createError);
        return NextResponse.json(
          { success: false, error: `Failed to create user profile: ${createError.message}` },
          { status: 500 }
        );
      }
      targetUser = newUser.user;
    } else {
      // Update top-level phone column & metadata for existing user
      await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        phone: formattedPhone,
        phone_confirm: true,
        user_metadata: {
          ...targetUser.user_metadata,
          phone: formattedPhone,
          phone_number: formattedPhone,
          full_name: targetUser.user_metadata?.full_name || fullName || `User ${formattedPhone.slice(-4)}`,
        },
      });
    }

    // 4. Also upsert into public 'profiles' table
    try {
      await supabaseAdmin.from("profiles").upsert([
        {
          id: targetUser.id,
          email: syntheticEmail,
          full_name: targetUser.user_metadata?.full_name || fullName || `User ${formattedPhone.slice(-4)}`,
          phone: formattedPhone,
          role: "user",
        },
      ]);
    } catch (profErr) {
      console.warn("[Verify OTP] Profiles upsert notice:", profErr);
    }

    // 5. Authenticate user session
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email: syntheticEmail,
      password: defaultPassword,
    });

    if (signInError) {
      console.warn("[Verify OTP] Client sign in warning:", signInError.message);
    }

    return NextResponse.json({
      success: true,
      message: "Phone OTP verified successfully!",
      user: targetUser,
      session: signInData?.session || null,
    });
  } catch (err: any) {
    console.error("[Verify OTP API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
