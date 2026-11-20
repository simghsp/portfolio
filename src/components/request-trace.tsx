"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Illustrative traffic only. The stage names, the 0–100 risk bands and the
// allow → monitor → challenge → block ladder match AegisFlow's real pipeline
// (see Architecture below); the individual requests are sample data, and the
// panel says so on screen.
type Decision = "ALLOW" | "MONITOR" | "CHALLENGE" | "BLOCK";

type TraceEvent = {
  method: string;
  path: string;
  signal: string;
  risk: number;
  decision: Decision;
};

const samples: TraceEvent[] = [
  { method: "GET", path: "/api/products", signal: "clean", risk: 4, decision: "ALLOW" },
  { method: "GET", path: "/api/orders?id=1' OR '1'='1", signal: "WAF · SQLi", risk: 86, decision: "BLOCK" },
  { method: "POST", path: "/api/auth/login", signal: "behavior · burst", risk: 41, decision: "MONITOR" },
  { method: "GET", path: "/api/profile", signal: "clean", risk: 7, decision: "ALLOW" },
  { method: "GET", path: "/files?p=../../etc/passwd", signal: "WAF · traversal", risk: 79, decision: "BLOCK" },
  { method: "POST", path: "/api/search", signal: "WAF · NoSQLi", risk: 62, decision: "CHALLENGE" },
  { method: "GET", path: "/api/orders/1042", signal: "clean", risk: 9, decision: "ALLOW" },
  { method: "POST", path: "/api/auth/login", signal: "correlation · 3 events", risk: 71, decision: "CHALLENGE" },
];

const stages = ["normalize", "waf", "behavior", "risk", "correlate", "respond"];

const decisionStyle: Record<Decision, string> = {
  ALLOW: "text-risk-low border-risk-low/40",
  MONITOR: "text-risk-medium border-risk-medium/40",
  CHALLENGE: "text-risk-high border-risk-high/40",
  BLOCK: "text-risk-critical border-risk-critical/40",
};

function riskColor(risk: number) {
  if (risk >= 75) return "bg-risk-critical";
  if (risk >= 50) return "bg-risk-high";
  if (risk >= 25) return "bg-risk-medium";
  return "bg-risk-low";
}

const VISIBLE = 5;
const TICK_MS = 2200;

export function RequestTrace() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused]);

  const rows = Array.from({ length: VISIBLE }, (_, i) => {
    const n = tick - i;
    return { key: n, event: samples[((n % samples.length) + samples.length) % samples.length] };
  });
  // Blocks among every sample shown so far (index 0 … tick).
  const blocksPerCycle = samples.filter((s) => s.decision === "BLOCK").length;
  const seen = tick + 1;
  const blocked =
    Math.floor(seen / samples.length) * blocksPerCycle +
    samples.slice(0, seen % samples.length).filter((s) => s.decision === "BLOCK").length;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border-strong bg-background-elevated/90 shadow-[0_30px_80px_-30px_rgba(59,130,255,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="img"
      aria-label="Simulated AegisFlow request trace: sample requests are scored 0 to 100 and allowed, monitored, challenged, or blocked."
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="mono flex items-center gap-2 text-[11px] text-muted">
          <span className="relative flex h-2 w-2">
            {!reduceMotion && !paused ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            ) : null}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          aegisflow · request trace
        </div>
        <span className="mono text-[10px] uppercase tracking-widest text-muted-dim">
          {paused ? "paused" : "simulated"}
        </span>
      </div>

      <div className="mono flex flex-wrap gap-1 border-b border-border px-4 py-2.5 text-[10px]" aria-hidden="true">
        {stages.map((stage, i) => (
          <span key={stage} className="flex items-center gap-1">
            <motion.span
              key={`${stage}-${tick}`}
              className="rounded px-1.5 py-0.5 text-muted"
              initial={reduceMotion ? false : { backgroundColor: "rgba(59,130,255,0)", color: "#94a0bd" }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      backgroundColor: ["rgba(59,130,255,0)", "rgba(59,130,255,0.25)", "rgba(59,130,255,0)"],
                      color: ["#94a0bd", "#eef2fb", "#94a0bd"],
                    }
              }
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {stage}
            </motion.span>
            {i < stages.length - 1 ? <span className="text-muted-dim">→</span> : null}
          </span>
        ))}
      </div>

      <ul className="relative h-[290px] overflow-hidden px-2 py-2" aria-hidden="true">
        <AnimatePresence initial={false}>
          {rows.map(({ key, event }) => (
            <motion.li
              key={key}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mono grid grid-cols-[3rem_1fr_auto] items-center gap-x-3 gap-y-1.5 rounded-lg px-2 py-2.5 text-[11px] hover:bg-surface"
            >
              <span className="text-accent-strong">{event.method}</span>
              <span className="truncate text-foreground">{event.path}</span>
              <span
                className={cn(
                  "row-span-2 rounded-full border px-2 py-0.5 text-[10px] tracking-wide",
                  decisionStyle[event.decision]
                )}
              >
                {event.decision}
              </span>
              <span className="text-muted-dim">{String(event.risk).padStart(2, "0")}</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-20 overflow-hidden rounded-full bg-border">
                  <motion.span
                    className={cn("block h-full rounded-full", riskColor(event.risk))}
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${event.risk}%` }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  />
                </span>
                <span className="truncate text-muted-dim">{event.signal}</span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background-elevated to-transparent" />
      </ul>

      <div className="mono flex items-center justify-between border-t border-border px-4 py-3 text-[10px] text-muted-dim">
        <span>sample traffic · real pipeline stages</span>
        <span>
          <span className="text-risk-critical">{blocked}</span> blocked
        </span>
      </div>
    </div>
  );
}
