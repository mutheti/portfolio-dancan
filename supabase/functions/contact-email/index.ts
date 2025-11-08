import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const CONTACT_NOTIFICATION_EMAIL = Deno.env.get("CONTACT_NOTIFICATION_EMAIL") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is required"),
});

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function sendEmail(payload: z.infer<typeof contactSchema>) {
  if (!RESEND_API_KEY || !CONTACT_NOTIFICATION_EMAIL) {
    console.warn("Email credentials not configured; skipping email send.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [CONTACT_NOTIFICATION_EMAIL],
      subject: `New portfolio inquiry: ${payload.subject}`,
      reply_to: payload.email,
      html: `
        <h2>New Message from ${payload.name}</h2>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${payload.message}</pre>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend email error", errorText);
    throw new Error("Failed to send notification email");
  }
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": Deno.env.get("CORS_ORIGIN") ?? "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: "unread",
    });

    if (error) {
      console.error("Supabase insert error", error);
      throw new Error("Failed to save message");
    }

    await sendEmail(data);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    const message = err instanceof z.ZodError ? err.flatten() : err.message ?? "Unexpected error";
    console.error("Contact edge function error", err);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
    );
  }
});

