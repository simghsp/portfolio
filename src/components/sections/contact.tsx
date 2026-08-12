"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactForm } from "@/app/actions/contact";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<
    { state: "idle" } | { state: "success" } | { state: "error"; message: string }
  >({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus({ state: "idle" });
    const result = await submitContactForm(data);
    if (result.ok) {
      setStatus({ state: "success" });
      reset();
    } else {
      setStatus({ state: "error", message: result.error });
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the email is also shown as plain text and a mailto link.
    }
  }

  return (
    <section id="contact" className="border-t border-border py-24 sm:py-28" aria-label="Contact">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Contact"
            title="Let's talk about a role, a project, or a security finding"
            description="Open to Application Security, Backend, and Full-Stack roles. I read every message myself."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8"
            >
              {/* Honeypot — hidden from real users, only bots fill every field */}
              <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-lg border border-border-strong bg-background-elevated px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus-visible:border-accent"
                    placeholder="Your name"
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-risk-high">{errors.name.message}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-border-strong bg-background-elevated px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus-visible:border-accent"
                    placeholder="you@company.com"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="mt-1.5 text-xs text-risk-high">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border-strong bg-background-elevated px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus-visible:border-accent"
                  placeholder="What's the role or project you'd like to talk about?"
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="mt-1.5 text-xs text-risk-high">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={15} aria-hidden="true" />
                  )}
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>

                {status.state === "success" ? (
                  <p className="text-sm text-risk-low" role="status">
                    Sent — thanks, I&rsquo;ll get back to you soon.
                  </p>
                ) : null}
                {status.state === "error" ? (
                  <p className="text-sm text-risk-high" role="alert">
                    {status.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5">
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong text-accent">
                <Send size={16} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mono truncate text-sm text-muted">{profile.email}</p>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border-strong p-2 text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/30"
            >
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong text-accent">
                <GithubIcon size={16} />
              </div>
              <p className="text-sm text-muted">github.com/{profile.githubUser}</p>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/30"
            >
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong text-accent">
                <LinkedinIcon size={16} />
              </div>
              <p className="text-sm text-muted">sapna-singh</p>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
