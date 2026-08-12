import type { Metadata } from "next";
import { Download, FileText, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, projects, securityLab, skills, learning } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Recruiter-friendly resume summary for ${profile.name}, a full-stack developer building toward security engineering.`,
};

export default function ResumePage() {
  const allProjects = [...projects, ...securityLab];

  return (
    <div className="bg-background py-14 print:bg-white print:py-0">
      <Container className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <p className="text-sm text-muted">
            A recruiter-friendly summary generated from real project work — not a claim of employment
            history that doesn&rsquo;t exist.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/resume/ats" variant="ghost" size="sm">
              <FileText size={15} aria-hidden="true" />
              ATS-friendly version
            </Button>
            <Button href="/resume/pdf" external variant="secondary" size="sm">
              <Download size={15} aria-hidden="true" />
              Download PDF
            </Button>
            <PrintButton />
          </div>
        </div>

        <article className="rounded-2xl border border-border bg-surface/60 print:rounded-none print:border-none print:bg-white print:text-[#111318]">
          {/* Header band */}
          <header className="border-b border-border px-8 py-8 sm:px-12 print:border-b-[#ccc] print:px-0 print:pb-5 print:pt-0">
            <h1 className="text-3xl font-bold text-foreground print:text-[#111318]">{profile.name}</h1>
            <p className="mt-1 text-base text-accent print:text-[#0f766e]">{profile.headline}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted print:text-[#444]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail size={14} aria-hidden="true" /> {profile.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GithubIcon size={14} /> github.com/{profile.githubUser}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LinkedinIcon size={14} /> linkedin.com/in/sapna-singh-26a07a244
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 print:hidden">
              {profile.coreCompetencies.map((c) => (
                <Badge key={c} variant="accent">
                  {c}
                </Badge>
              ))}
            </div>
            <p className="mt-4 hidden text-[13px] leading-relaxed text-[#333] print:block">
              {profile.coreCompetencies.join(" · ")}
            </p>
          </header>

          {/* Two-column body */}
          <div className="grid gap-8 px-8 py-8 sm:px-12 sm:grid-cols-[1fr_2.1fr] print:gap-6 print:px-0 print:py-5">
            {/* Sidebar */}
            <aside className="space-y-7">
              <section>
                <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
                  Skills
                </h2>
                <div className="mt-3 space-y-3.5">
                  {skills.map((group) => (
                    <div key={group.title}>
                      <p className="text-xs font-semibold text-foreground print:text-[#111318]">
                        {group.title}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted print:text-[#333]">
                        {group.items.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
                  Education
                </h2>
                <p className="mt-3 text-[13px] text-muted print:text-[#333]">{profile.education}</p>
              </section>

              <section>
                <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
                  Learning
                </h2>
                <p className="mt-3 text-[13px] font-semibold text-foreground print:text-[#111318]">
                  {learning.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted print:text-[#333]">
                  {learning.detail}
                </p>
              </section>
            </aside>

            {/* Main column */}
            <div className="space-y-7">
              <section>
                <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
                  Summary
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted print:text-[#222]">
                  Full-stack developer specializing toward Application Security. Built AegisFlow, a
                  working API threat-detection gateway with a WAF rule engine, behavioral risk
                  scoring, and a live SOC dashboard — backed by 113 automated tests. Comfortable across
                  the stack: REST APIs, JWT/RBAC authorization, and relational and document databases.
                </p>
              </section>

              <section>
                <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
                  Projects
                </h2>
                <div className="mt-3 space-y-5">
                  {allProjects.map((project) => (
                    <div key={project.slug}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <h3 className="text-sm font-semibold text-foreground print:text-[#111318]">
                          {project.name}
                        </h3>
                        <span className="mono text-xs text-muted-dim print:text-[#666]">
                          {project.date}
                        </span>
                      </div>
                      <p className="mono mt-0.5 text-[11px] text-muted-dim print:text-[#777]">
                        {project.tech.slice(0, 5).join(" · ")}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {project.resumeBullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2 text-[13px] leading-relaxed text-muted print:text-[#333]"
                          >
                            <span aria-hidden="true">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
