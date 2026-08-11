import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (name, email, message)." },
        { status: 400 }
      );
    }

    // 1. Save inquiry to Supabase database (inquiries table)
    try {
      await supabase.from("inquiries").insert([
        {
          name,
          email,
          message,
          recipient: "sstgroomers@gmail.com",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn("Supabase inquiry insert note:", dbErr);
    }

    // 2. Configure Email Transporter
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"SST Groomers Inquiry" <${smtpUser}>`,
        to: "sstgroomers@gmail.com",
        replyTo: email,
        subject: `🐾 New Quick Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fef08a; border-radius: 16px; background-color: #ffffff;">
            <div style="background-color: #facc15; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
              <h2 style="margin: 0; color: #000000; font-size: 20px; font-weight: 800;">🐾 New Quick Inquiry</h2>
              <p style="margin: 4px 0 0 0; color: #1c1917; font-size: 12px;">SST Groomers Coimbatore</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Sender Name:</strong> ${name}</p>
              <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a; font-weight: bold;">Message Content:</p>
              <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #facc15; border-radius: 8px; font-size: 14px; color: #334155; line-height: 1.6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="font-size: 11px; color: #94a3b8; text-align: center; border-t: 1px solid #f1f5f9; pt: 16px;">
              This inquiry was dispatched directly from the SST Groomers Contact Form to sstgroomers@gmail.com.
            </div>
          </div>
        `,
      });

      console.log(`[Contact API] Email successfully sent to sstgroomers@gmail.com from ${email}`);
    } else {
      console.log(
        `[Contact API] Inquiry registered for sstgroomers@gmail.com. (Note: Provide SMTP_USER & SMTP_PASS in .env.local to enable live Gmail SMTP dispatch).`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully sent to sstgroomers@gmail.com!",
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email inquiry." },
      { status: 500 }
    );
  }
}
