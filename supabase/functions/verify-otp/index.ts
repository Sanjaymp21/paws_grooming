// Supabase Edge Function: verify-otp
// Deploy with: supabase functions deploy verify-otp --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { phone, otp, fullName } = await req.json();

    if (!phone || !otp) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number and OTP are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formattedPhone = formatE164Phone(phone);
    const nowIso = new Date().toISOString();

    // 1. Verify OTP record existence, expiry, and non-verified state
    const { data: record, error: recordError } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("phone", formattedPhone)
      .eq("otp", otp.trim())
      .eq("verified", false)
      .gt("expires_at", nowIso)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (recordError || !record) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired OTP code." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Mark as verified
    await supabase.from("otp_verifications").update({ verified: true }).eq("id", record.id);

    // 3. User creation / login update
    const digitsOnly = formattedPhone.replace(/\D/g, "");
    const syntheticEmail = `phone_${digitsOnly}@otp.sstgroomers.com`;
    const defaultPassword = `Paws_${digitsOnly}_OtpPass!`;

    let targetUser = null;
    const { data: userList } = await supabase.auth.admin.listUsers();
    if (userList && userList.users) {
      targetUser = userList.users.find(
        (u) => u.phone === formattedPhone || u.email === syntheticEmail || u.user_metadata?.phone === formattedPhone
      );
    }

    if (!targetUser) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
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
        return new Response(
          JSON.stringify({ success: false, error: createError.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      targetUser = newUser.user;
    } else {
      await supabase.auth.admin.updateUserById(targetUser.id, {
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

    // Upsert into profiles
    try {
      await supabase.from("profiles").upsert([
        {
          id: targetUser.id,
          email: syntheticEmail,
          full_name: targetUser.user_metadata?.full_name || fullName || `User ${formattedPhone.slice(-4)}`,
          phone: formattedPhone,
          role: "user",
        },
      ]);
    } catch (profErr) {
      console.warn("Profiles upsert notice:", profErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified successfully!",
        user: targetUser,
        syntheticEmail,
        defaultPassword,
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
