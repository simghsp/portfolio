"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { profile } from "@/lib/data";

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContactForm(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Honeypot: a real visitor never fills this field. If it's non-empty, the
  // submitter is almost certainly a bot — reject without saying why.
  if (parsed.data.company) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    const minutes = Math.ceil((limit.retryAfterMs ?? 0) / 60_000);
    return { ok: false, error: `Too many messages sent. Try again in about ${minutes} minute(s).` };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form submitted but RESEND_API_KEY is not configured.");
    return {
      ok: false,
      error: `The contact form isn't fully wired up yet — please email ${profile.email} directly.`,
    };
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || profile.email,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return { ok: false, error: "Failed to send. Please try emailing directly instead." };
  }

  return { ok: true };
}
