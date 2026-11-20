"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { nav, profile } from "@/lib/data";

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // Highlight the nav item for whichever section is crossing the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-3 print:hidden">
      <Container className="flex h-14 items-center justify-between rounded-full border border-border bg-background/75 backdrop-blur-xl sm:px-5">
        <Link
          href="/"
          className="display text-base font-bold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          sapna<span className="text-accent">.</span>singh
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-hover"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}
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
          ref={menuButtonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border-strong p-2 text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      <motion.div
        className="fixed inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {open ? (
        <div id="mobile-nav" className="lg:hidden">
          <Container className="mt-2 flex flex-col gap-1 rounded-3xl border border-border bg-background-elevated py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm hover:bg-surface hover:text-foreground",
                  active === item.href ? "text-foreground" : "text-muted"
                )}
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
