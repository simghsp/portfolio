"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { profile, projects, securityLab } from "@/lib/data";

const coreTech = ["TypeScript", "React", "Node.js", "PostgreSQL", "JWT / RBAC", "API Security"];

const stats = (monthsOfExperience: number) => [
  { value: `${monthsOfExperience}+`, label: "Months Professional Experience" },
  { value: `${projects.length + securityLab.length}`, label: "Projects Shipped" },
  { value: "113", label: "Automated Tests (AegisFlow)" },
  { value: "8", label: "OWASP-Mapped WAF Rule Families" },
];

export function Hero({ monthsOfExperience }: { monthsOfExperience: number }) {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32" aria-label="Introduction">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-140 opacity-60"
        style={{
          background:
            "radial-gradient(600px 320px at 50% 0%, rgba(77,214,224,0.13), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container>
        {/*
          Badge, heading, and subtext render immediately (no Framer Motion
          fade-in) on purpose: the subtext paragraph is this page's Largest
          Contentful Paint element, and animating its opacity/transform via
          JS gated its "final" paint behind hydration + animation completion
          — measured at a ~2.5s render delay in Lighthouse. Everything below
          the fold still animates in; only the LCP-critical content above
          it renders statically.
        */}
        <div>
          <Badge variant="accent" className="mb-6">
            <ShieldCheck size={12} className="mr-1" aria-hidden="true" />
            Full-Stack Developer · Security-Conscious Engineering
          </Badge>
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Full-Stack Developer building{" "}
          <span className="text-gradient">secure, production-ready web applications.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I build full-stack web applications — React/Next.js frontends, Node.js APIs, and the
          databases behind them — with particular attention to authentication, authorization, and
          the access-control mistakes that quietly leak one user&rsquo;s data to another. Currently a
          Junior Software Developer at <span className="text-foreground">Bharatron Technologies</span>.
        </p>

        <motion.div
          {...fadeUp(0.16)}
          className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6 sm:grid-cols-4 sm:gap-x-8"
        >
          {stats(monthsOfExperience).map((stat) => (
            <div key={stat.label}>
              <p className="mono text-2xl font-semibold text-foreground sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted-dim">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap gap-3">
          {coreTech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.28)} className="mt-10 flex flex-wrap gap-3">
          <Button href="#projects">
            View Projects
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button href="#contact" variant="secondary">
            <Mail size={15} aria-hidden="true" />
            Contact Me
          </Button>
          <Button href={profile.github} external variant="ghost">
            <GithubIcon size={15} />
            GitHub
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
