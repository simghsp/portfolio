"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy, Project } from "@/lib/data";

const fields: { key: keyof CaseStudy; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "risk", label: "Risk" },
  { key: "investigation", label: "Investigation" },
  { key: "rootCause", label: "Root Cause" },
  { key: "fix", label: "Fix" },
  { key: "validation", label: "Validation" },
  { key: "lesson", label: "Engineering Lesson" },
];

export function CaseStudyCard({
  study,
  project,
  index,
  defaultOpen = false,
}: {
  study: CaseStudy;
  project?: Project;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `case-study-${study.slug}`;

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_auto]"
      >
        <span
          className={cn(
            "mono pt-1.5 text-xs transition-colors",
            open ? "text-accent" : "text-muted-dim group-hover:text-muted"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h4
            className={cn(
              "display text-xl font-bold transition-colors sm:text-2xl",
              open ? "text-foreground" : "text-muted group-hover:text-foreground"
            )}
          >
            {study.title}
          </h4>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{study.concept}</Badge>
            {project ? <Badge variant="outline">{project.name}</Badge> : null}
          </div>
        </div>
        <span
          className={cn(
            "mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
            open
              ? "rotate-180 border-accent bg-accent text-white"
              : "border-border-strong text-muted group-hover:border-accent group-hover:text-accent"
          )}
          aria-hidden="true"
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <div id={panelId} hidden={!open} className="pb-8 sm:pl-16">
        <dl className="divide-y divide-border rounded-2xl border border-border bg-background-elevated">
          {fields.map((field) => (
            <div key={field.key} className="grid gap-1.5 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt
                className={cn(
                  "mono text-[11px] uppercase tracking-widest",
                  field.key === "fix" || field.key === "lesson" ? "text-accent" : "text-muted-dim"
                )}
              >
                {field.label}
              </dt>
              <dd className="text-sm leading-relaxed text-muted">{study[field.key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
