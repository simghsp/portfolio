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
  defaultOpen = false,
}: {
  study: CaseStudy;
  project?: Project;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `case-study-${study.slug}`;

  return (
    <div className="rounded-2xl border border-border bg-surface/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{study.concept}</Badge>
            {project ? <Badge variant="outline">{project.name}</Badge> : null}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{study.title}</h3>
        </div>
        <ChevronDown
          size={18}
          className={cn("mt-1 shrink-0 text-muted transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div id={panelId} hidden={!open} className="px-6 pb-6">
        <div className="space-y-5 border-t border-border pt-5">
          {fields.map((field) => (
            <div key={field.key}>
              <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">
                {field.label}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{study[field.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
