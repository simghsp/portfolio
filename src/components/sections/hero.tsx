"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { RequestTrace } from "@/components/request-trace";
import { profile, projects, securityLab } from "@/lib/data";

const coreTech = ["TypeScript", "React", "Node.js", "PostgreSQL", "JWT / RBAC", "API Security"];

const stats = (monthsOfExperience: number) => [
  { value: `${monthsOfExperience}+`, label: "Months professional experience" },
  { value: `${projects.length + securityLab.length}`, label: "Projects shipped" },
  { value: "113", label: "Automated tests (AegisFlow)" },
  { value: "8", label: "OWASP-mapped WAF rule families" },
];

export function Hero({ monthsOfExperience }: { monthsOfExperience: number }) {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28" aria-label="Introduction">
      <Container>
        {/*
          Eyebrow, heading, and intro paragraphs render immediately (no Framer
          Motion fade-in) on purpose: the intro paragraph is this page's Largest
          Contentful Paint element, and animating it gated its paint behind
          hydration — measured at a ~2.5s render delay in Lighthouse. Only the
          secondary content below animates in.
        */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="min-w-0">
            <p className="mono mb-7 inline-flex items-center gap-2 rounded-full border border-border-strong px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted">
              <ShieldCheck size={12} className="text-accent" aria-hidden="true" />
              Full-Stack Developer · Security-Conscious Engineering
            </p>

            <h1 className="display text-[2.6rem] font-extrabold leading-[0.98] text-foreground sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
              Full-Stack Developer building{" "}
              <span className="relative whitespace-nowrap text-accent">
                secure,
                <svg
                  className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent/50"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 9 C 50 2, 150 2, 198 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              production-ready web applications.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              I build full-stack web applications — React/Next.js frontends, Node.js APIs, and the
              databases behind them — with particular attention to authentication, authorization, and
              the access-control mistakes that quietly leak one user&rsquo;s data to another. Currently a
              Junior Software Developer at <span className="text-foreground">Bharatron Technologies</span>,
              and open to select freelance or contract projects alongside that role.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Every backend feature I shipped kept raising the same question:{" "}
              <em className="text-foreground">
                who is allowed to do this, and what happens if they aren&rsquo;t?
              </em>{" "}
              That&rsquo;s why I built AegisFlow from scratch — a detection and response pipeline with
              real tests, a real audit trail, and documented limitations.
            </p>

            <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#contact">
                <CalendarDays size={15} aria-hidden="true" />
                Book a call
              </Button>
              <Button href="#projects" variant="secondary">
                View Projects
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
              <Button href={profile.github} external variant="ghost">
                <GithubIcon size={15} />
                GitHub
              </Button>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.25)} className="min-w-0">
            <RequestTrace />
          </motion.div>
        </div>

        <motion.dl
          {...fadeUp(0.3)}
          className="mt-20 grid grid-cols-2 border-y border-border sm:grid-cols-4"
        >
          {stats(monthsOfExperience).map((stat, i) => (
            <div
              key={stat.label}
              className={`group flex flex-col py-6 pr-4 sm:py-8 ${i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""} ${i % 2 === 1 ? "border-l border-border pl-4 sm:pl-6" : ""} ${i > 1 ? "border-t border-border sm:border-t-0" : ""}`}
            >
              <dt className="mono order-2 mt-2 text-[11px] uppercase leading-snug tracking-wider text-muted-dim">
                {stat.label}
              </dt>
              <dd className="display order-1 text-4xl font-bold text-foreground transition-colors group-hover:text-accent sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.p
          {...fadeUp(0.35)}
          className="mono mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-dim"
        >
          <span className="text-muted">core stack</span>
          {coreTech.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < coreTech.length - 1 ? <span className="ml-3 text-border-strong">/</span> : null}
            </span>
          ))}
        </motion.p>
      </Container>
    </section>
  );
}
