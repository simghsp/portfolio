"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/lib/data";

const coreTech = ["TypeScript", "React", "Node.js", "PostgreSQL", "JWT / RBAC", "API Security"];

export function Hero() {
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
        <motion.div {...fadeUp(0)}>
          <Badge variant="accent" className="mb-6">
            <ShieldCheck size={12} className="mr-1" aria-hidden="true" />
            Full-Stack Engineer → Security Engineering
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp(0.05)}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Full-Stack Developer building toward{" "}
          <span className="text-gradient">Security Engineering.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.12)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          I build backend systems, APIs, and authentication flows — then spend
          just as much time reasoning about how they fail. That path, from
          shipping full-stack products to hardening the access control and API
          boundaries inside them, is what&rsquo;s pulling me toward Application
          Security.
        </motion.p>

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
