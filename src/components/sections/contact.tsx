"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

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

        <Reveal delay={0.08} className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-accent">
              <Mail size={16} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Email</h3>
              <p className="mono mt-1 break-all text-sm text-muted">{profile.email}</p>
            </div>
            <div className="mt-auto flex gap-2">
              <Button href={`mailto:${profile.email}`} size="sm" className="flex-1">
                Email me
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center rounded-lg border border-border-strong px-3 text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-accent">
              <GithubIcon size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">GitHub</h3>
              <p className="mono mt-1 text-sm text-muted">github.com/{profile.githubUser}</p>
            </div>
            <Button href={profile.github} external variant="secondary" size="sm" className="mt-auto">
              View profile
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-accent">
              <LinkedinIcon size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">LinkedIn</h3>
              <p className="mono mt-1 text-sm text-muted">sapna-singh</p>
            </div>
            <Button href={profile.linkedin} external variant="secondary" size="sm" className="mt-auto">
              Connect
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
