import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yqcrgttqkvdlwbvzzncl.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_secret_hmu1zh8R9grytwBAft-unw_jy8qQ6k_";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function formatE164Phone(rawPhone: string): string {
  if (!rawPhone) return "";
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  return `+${cleaned}`;
}

// Cryptographically secure 6-digit OTP generator
function generateSecureOTP(): string {
  const buf = crypto.randomBytes(4);
  const num = buf.readUInt32BE(0);
  const otp = 100000 + (num % 900000);
  return otp.toString();
}

// Fallback memory cache if DB table is not ready
export const globalOtpCache = new Map<string, { otp: string; expiresAt: number }>();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number with country code." },
        { status: 400 }
      );
    }

    const formattedPhone = formatE164Phone(phone);
    const expiresAtMs = Date.now() + 5 * 60 * 1000;
    const expiresAt = new Date(expiresAtMs).toISOString();

    // 1. Rate limiting check: Max 3 requests in the last 5 minutes per phone
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("otp_verifications")
      .select("*", { count: "exact", head: true })
      .eq("phone", formattedPhone)
      .gte("created_at", fiveMinutesAgo);

    if (countError && countError.code !== "PGRST116") {
      console.warn("[Generate OTP] Rate limit check note:", countError.message);
    }

    if (count && count >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Maximum 3 OTP requests allowed per 5 minutes. Please try again later.",
        },
        { status: 429 }
      );
    }

    // 2. Generate secure 6-digit OTP
    const otp = generateSecureOTP();

    // Store in fallback memory cache
    globalOtpCache.set(formattedPhone, { otp, expiresAt: expiresAtMs });

    // 3. Store OTP in 'otp_verifications' table
    try {
      const { error: insertError } = await supabaseAdmin
        .from("otp_verifications")
        .insert([
          {
            phone: formattedPhone,
            otp,
            expires_at: expiresAt,
            verified: false,
          },
        ]);

      if (insertError) {
        console.warn("[Generate OTP] DB Table note (using secure fallback):", insertError.message);
      }
    } catch (dbErr) {
      console.warn("[Generate OTP] Database insert exception handled:", dbErr);
    }

    console.log(`[Generate OTP] Generated OTP ${otp} for ${formattedPhone} (Expires: ${expiresAt})`);

    // 4. Return success + Demo OTP (Free demo mode without SMS cost)
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully!",
      phone: formattedPhone,
      demo_otp: otp,
      expires_at: expiresAt,
    });
  } catch (err: any) {
    console.error("[Generate OTP API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate OTP" },
      { status: 500 }
    );
  }
}
