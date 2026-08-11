"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { nav, profile } from "@/lib/data";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md print:hidden">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="mono text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          sapna<span className="text-accent">.</span>singh
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/resume" variant="ghost" size="sm">
            <FileText size={15} aria-hidden="true" />
            Resume
          </Button>
          <Button href={profile.github} external variant="secondary" size="sm">
            <GithubIcon size={15} />
            GitHub
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border-strong p-2 text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3 px-3">
              <Button href="/resume" variant="secondary" size="sm" className="flex-1">
                Resume
              </Button>
              <Button href={profile.github} external variant="secondary" size="sm" className="flex-1">
                GitHub
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
