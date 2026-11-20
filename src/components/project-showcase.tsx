"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import { timeAgo, type RepoActivity } from "@/lib/github";
import type { Project } from "@/lib/data";

type Tab = "problem" | "architecture" | "security" | "result";

const tabs: { key: Tab; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "architecture", label: "Architecture" },
  { key: "security", label: "Security" },
  { key: "result", label: "Result" },
];

export function ProjectShowcase({
  projects,
  activity,
}: {
  projects: Project[];
  activity: (RepoActivity | null)[];
}) {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<Tab>("problem");
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const project = projects[selected];
  const repo = activity[selected];

  function choose(i: number) {
    setSelected(i);
    setTab("problem");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      {/* Index */}
      <ol className="border-t border-border" aria-label="Projects">
        {projects.map((p, i) => {
          const isActive = i === selected;
          return (
            <li key={p.slug} className="border-b border-border">
              <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={isActive}
                aria-controls={`${baseId}-panel`}
                className="group relative flex w-full items-baseline gap-5 py-6 text-left"
              >
                <span
                  className={cn(
                    "mono text-xs transition-colors",
                    isActive ? "text-accent" : "text-muted-dim group-hover:text-muted"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "display block text-3xl font-bold transition-[color,transform] duration-300 sm:text-4xl",
                      isActive
                        ? "translate-x-1 text-foreground"
                        : "text-muted-dim group-hover:translate-x-1 group-hover:text-muted"
                    )}
                  >
                    {p.name}
                  </span>
                  <span className="mono mt-2 block text-[11px] uppercase tracking-wider text-muted-dim">
                    {p.date} · {p.tech.slice(0, 3).join(" / ")}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 transition-all duration-300",
                    isActive ? "rotate-45 text-accent" : "text-border-strong group-hover:text-muted"
                  )}
                />
                {isActive ? (
                  <motion.span
                    layoutId={`${baseId}-marker`}
                    className="absolute -bottom-px left-0 h-px w-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 34 }}
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Detail */}
      <div id={`${baseId}-panel`} aria-live="polite" className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.article
            key={project.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-border-strong bg-background-elevated p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="display text-2xl font-bold text-foreground sm:text-3xl">{project.name}</h3>
              {repo ? (
                <span className="mono flex items-center gap-3 text-xs text-muted-dim">
                  <span>Updated {timeAgo(repo.pushedAt)}</span>
                  {repo.stars > 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} aria-hidden="true" />
                      {repo.stars}
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted">{project.tagline}</p>
            {project.status ? (
              <p className="mono mt-3 text-xs text-risk-medium">{project.status}</p>
            ) : null}

            <div className="mt-7 flex gap-1 overflow-x-auto border-b border-border no-scrollbar" role="tablist">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${t.key}`}
                  aria-selected={tab === t.key}
                  aria-controls={`${baseId}-tabpanel`}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative shrink-0 px-3 pb-3 text-sm transition-colors",
                    tab === t.key ? "text-foreground" : "text-muted-dim hover:text-muted"
                  )}
                >
                  {t.label}
                  {tab === t.key ? (
                    <motion.span
                      layoutId={`${baseId}-tab`}
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div
              id={`${baseId}-tabpanel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab}`}
              className="min-h-56 pt-6"
            >
              {tab === "problem" ? (
                <div className="space-y-5">
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{project.problem}</p>
                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-widest text-muted-dim">
                      My contribution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>
                  </div>
                </div>
              ) : null}

              {tab === "architecture" ? (
                <ol className="relative space-y-3 border-l border-border-strong pl-5">
                  {project.architecture.map((layer, i) => (
                    <li key={layer} className="relative text-sm leading-relaxed text-muted">
                      <span
                        className="absolute top-1.5 -left-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-background-elevated bg-accent"
                        aria-hidden="true"
                      />
                      <span className="mono mr-2 text-xs text-muted-dim">{i + 1}</span>
                      {layer}
                    </li>
                  ))}
                  <li className="mono pt-2 text-xs text-muted-dim">
                    {project.tech.join(" · ")}
                  </li>
                </ol>
              ) : null}

              {tab === "security" ? (
                <ul className="divide-y divide-border">
                  {project.security.map((item) => (
                    <li key={item} className="flex gap-3 py-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {tab === "result" ? (
                <blockquote className="display border-l-2 border-accent pl-5 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                  {project.result}
                </blockquote>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-strong"
              >
                <GithubIcon size={14} />
                <span className="link-grow">View repository</span>
              </a>
              {project.caseStudySlugs?.length ? (
                <a
                  href="#case-studies"
                  className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-foreground"
                >
                  <span className="link-grow">
                    {project.caseStudySlugs.length} case stud
                    {project.caseStudySlugs.length > 1 ? "ies" : "y"}
                  </span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-foreground sm:ml-auto"
              >
                <span className="link-grow">Need something similar? Let&rsquo;s talk</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
