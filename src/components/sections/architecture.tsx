"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Database, LayoutDashboard, Server, ShieldHalf, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const pipeline = [
  { label: "Normalize", detail: "Request shape" },
  { label: "WAF", detail: "8 rule families" },
  { label: "Behavior", detail: "Anomaly windows" },
  { label: "Risk Score", detail: "0–100 heuristic" },
  { label: "Correlation", detail: "Multi-event" },
  { label: "Response", detail: "Allow / Challenge / Block" },
];

export function Architecture() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border py-24 sm:py-28" aria-label="Architecture visualization">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Security Architecture"
            title="AegisFlow — request flow"
            description="The actual pipeline every request passes through, taken directly from the codebase — not an illustrative diagram."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
            <div className="flex min-w-295 flex-col gap-8">
              {/* top row: client -> gateway pipeline -> api */}
              <div className="flex items-center gap-3">
                <FlowNode icon={Users} label="Client Traffic" sub="Browser / API caller" />
                <Connector />
                <div className="relative flex-1 rounded-xl border border-accent/30 bg-accent-soft p-4">
                  <p className="mono mb-3 text-[11px] uppercase tracking-widest text-accent-strong">
                    AegisFlow Gateway
                  </p>
                  <div className="relative flex items-center gap-2">
                    {pipeline.map((stage, i) => (
                      <div key={stage.label} className="flex items-center gap-2">
                        <div className="rounded-lg border border-border-strong bg-background-elevated px-3 py-2 text-center">
                          <p className="text-xs font-medium text-foreground">{stage.label}</p>
                          <p className="mono mt-0.5 text-[10px] text-muted-dim">{stage.detail}</p>
                        </div>
                        {i < pipeline.length - 1 ? (
                          <span className="text-muted-dim" aria-hidden="true">
                            →
                          </span>
                        ) : null}
                      </div>
                    ))}
                    {!reduceMotion ? (
                      <motion.span
                        className="pointer-events-none absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-strong shadow-[0_0_10px_2px_rgba(125,232,239,0.6)]"
                        animate={{ left: ["0%", "97%"] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                </div>
                <Connector />
                <FlowNode icon={Server} label="Demo Protected API" sub="Not internet-facing" />
              </div>

              {/* bottom row: persistence + dashboard */}
              <div className="grid gap-4 sm:grid-cols-3">
                <FlowNode icon={Database} label="PostgreSQL" sub="Audit trail (Prisma)" full />
                <FlowNode icon={ShieldHalf} label="Redis" sub="Rate limits, behavior windows" full />
                <FlowNode icon={LayoutDashboard} label="SOC Dashboard" sub="Reads live security data" full />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-6 flex flex-wrap gap-2">
          <Badge variant="risk" className="border-risk-low/40 text-risk-low">LOW (0–24)</Badge>
          <Badge variant="risk" className="border-risk-medium/40 text-risk-medium">MEDIUM (25–49)</Badge>
          <Badge variant="risk" className="border-risk-high/40 text-risk-high">HIGH (50–74)</Badge>
          <Badge variant="risk" className="border-risk-critical/40 text-risk-critical">CRITICAL (75–100)</Badge>
        </Reveal>
        <p className="mt-3 text-sm text-muted-dim">
          Risk levels map directly to the response decision — documented, not learned, and never claimed
          to be a calibrated probability of maliciousness.
        </p>
      </Container>
    </section>
  );
}

function FlowNode({
  icon: Icon,
  label,
  sub,
  full,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  sub: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "flex items-center gap-3 rounded-xl border border-border-strong bg-background-elevated p-4"
          : "flex w-[168px] shrink-0 flex-col items-center gap-2 rounded-xl border border-border-strong bg-background-elevated p-4 text-center"
      }
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-accent">
        <Icon size={16} aria-hidden="true" />
      </div>
      <div className={full ? "" : ""}>
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="mono mt-0.5 text-[10px] text-muted-dim">{sub}</p>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="h-px w-6 shrink-0 bg-border-strong" aria-hidden="true" />;
}
