import type { Metadata } from "next";
import { Download, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { profile, projects, securityLab, skills, learning } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume (ATS-friendly)",
  description: `Plain, single-column, ATS-parseable resume for ${profile.name} — for submitting to job applications and applicant tracking systems.`,
  // Near-duplicate of /resume's content in a different layout — indexing
  // both would just dilute search relevance rather than help it. This page
  // exists for direct use (job applications), not for search discovery.
  robots: { index: false, follow: true },
};

// Deliberately plain: single column, standard section headers, no icons,
// no tables, no multi-column layout. Many ATS parsers read a page in
// column order rather than visual order, so the polished two-column
// /resume design (great for a human browsing the portfolio) can scramble
// badly here. This page trades visual flair for something that pastes
// cleanly into a job application form and parses correctly either way.
export default function AtsResumePage() {
  const allProjects = [...projects, ...securityLab];

  return (
    <div className="bg-background py-14 print:bg-white print:py-0">
      <Container className="max-w-2xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-sm text-muted">
            Plain-text-forward layout for pasting into application forms or ATS uploads. For the
            visual version, see the{" "}
            <a href="/resume" className="text-accent hover:text-accent-strong">
              main resume page
            </a>
            .
          </p>
          <Button href="/resume/ats/pdf" external variant="secondary" size="sm">
            <Download size={15} aria-hidden="true" />
            Download ATS PDF
          </Button>
        </div>

        <article className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-10 print:rounded-none print:border-none print:bg-white print:p-0 print:text-[#111318]">
          <h1 className="text-2xl font-bold text-foreground print:text-[#111318]">{profile.name}</h1>
          <p className="mt-1 text-sm text-muted print:text-[#333]">{profile.headline}</p>
          <p className="mt-3 text-sm text-muted print:text-[#333]">
            {profile.email} | github.com/{profile.githubUser} | linkedin.com/in/sapna-singh-26a07a244
          </p>
          <p className="mt-3 text-sm text-muted print:text-[#333]">
            {profile.coreCompetencies.join(" | ")}
          </p>

          <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-foreground print:text-[#111318]">
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted print:text-[#222]">
            Full-stack developer specializing toward Application Security. Built AegisFlow, a
            working API threat-detection gateway with a WAF rule engine, behavioral risk scoring,
            and a live SOC dashboard, backed by 113 automated tests. Experienced across the stack:
            REST APIs, JWT/RBAC authorization, and relational and document databases.
          </p>

          <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-foreground print:text-[#111318]">
            Skills
          </h2>
          <div className="mt-2 space-y-2">
            {skills.map((group) => (
              <p key={group.title} className="text-sm text-muted print:text-[#333]">
                <span className="font-semibold text-foreground print:text-[#111318]">
                  {group.title}:
                </span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>

          <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-foreground print:text-[#111318]">
            Projects
          </h2>
          <div className="mt-2 space-y-5">
            {allProjects.map((project) => (
              <div key={project.slug}>
                <p className="text-sm font-semibold text-foreground print:text-[#111318]">
                  {project.name} ({project.date})
                </p>
                <p className="text-sm text-muted print:text-[#555]">{project.tech.join(", ")}</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {project.resumeBullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed text-muted print:text-[#333]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-foreground print:text-[#111318]">
            Education
          </h2>
          <p className="mt-2 text-sm text-muted print:text-[#333]">{profile.education}</p>

          <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-foreground print:text-[#111318]">
            Additional Training
          </h2>
          <p className="mt-2 text-sm text-muted print:text-[#333]">
            {learning.title} — {learning.detail}
          </p>
        </article>

        <p className="mt-6 flex items-center gap-2 text-xs text-muted-dim print:hidden">
          <Layers size={13} aria-hidden="true" />
          Same facts as the main resume — reformatted single-column for ATS parsing, not rewritten.
        </p>
      </Container>
    </div>
  );
}
