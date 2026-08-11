// Supabase Edge Function: generate-otp
// Deploy with: supabase functions deploy generate-otp --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateSecureOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const num = 100000 + (array[0] % 900000);
  return num.toString();
}

function formatE164Phone(rawPhone: string): string {
  if (!rawPhone) return "";
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  return `+${cleaned}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { phone } = await req.json();

    if (!phone || phone.trim().length < 8) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid phone number." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formattedPhone = formatE164Phone(phone);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    // 1. Rate Limiting Check (Max 3 requests in last 5 minutes)
    const { count } = await supabase
      .from("otp_verifications")
      .select("*", { count: "exact", head: true })
      .eq("phone", formattedPhone)
      .gte("created_at", fiveMinutesAgo);

    if (count && count >= 3) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rate limit exceeded. Maximum 3 OTP requests per 5 minutes allowed.",
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Generate secure 6-digit OTP
    const otp = generateSecureOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // 3. Store OTP in otp_verifications table
    const { error: insertError } = await supabase
      .from("otp_verifications")
      .insert([{ phone: formattedPhone, otp, expires_at: expiresAt, verified: false }]);

    if (insertError) {
      return new Response(
        JSON.stringify({ success: false, error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return success + demo_otp for non-SMS college project demo
    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP generated successfully",
        phone: formattedPhone,
        demo_otp: otp,
        expires_at: expiresAt,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
