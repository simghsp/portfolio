import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/print-button";
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
      <Container className="max-w-3xl">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <p className="text-sm text-muted">
            A recruiter-friendly summary generated from real project work — not a claim of employment
            history that doesn&rsquo;t exist.
          </p>
          <PrintButton />
        </div>

        <article className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 print:rounded-none print:border-none print:bg-white print:p-0 print:text-[#111318]">
          <header className="border-b border-border pb-6 print:border-b-[#ccc]">
            <h1 className="text-3xl font-bold text-foreground print:text-[#111318]">{profile.name}</h1>
            <p className="mt-1 text-base text-accent print:text-[#0f766e]">{profile.headline}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted print:text-[#444]">
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
          </header>

          <section className="mt-6">
            <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
              Summary
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted print:text-[#222]">
              Full-stack developer (B.Sc. Information Technology) with hands-on experience building
              REST APIs, JWT authentication, role-based authorization, and relational/document
              databases. Currently specializing toward Application Security — designed and built
              AegisFlow, a working API threat-detection gateway with a WAF rule engine, behavioral
              risk scoring, and a live SOC dashboard, backed by 113 automated tests.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
              Projects
            </h2>
            <div className="mt-3 space-y-4">
              {allProjects.map((project) => (
                <div key={project.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground print:text-[#111318]">
                      {project.name}
                    </h3>
                    <span className="mono text-xs text-muted-dim print:text-[#666]">
                      {project.tech.slice(0, 4).join(" · ")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted print:text-[#333]">
                    {project.tagline}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-dim print:text-[#555]">
                    Security: {project.security.slice(0, 3).join("; ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
              Skills
            </h2>
            <div className="mt-3 space-y-2">
              {skills.map((group) => (
                <p key={group.title} className="text-sm text-muted print:text-[#333]">
                  <span className="font-medium text-foreground print:text-[#111318]">
                    {group.title}:
                  </span>{" "}
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
              Education
            </h2>
            <p className="mt-2 text-sm text-muted print:text-[#333]">{profile.education}</p>
          </section>

          <section className="mt-6">
            <h2 className="mono text-xs font-semibold uppercase tracking-widest text-muted-dim print:text-[#666]">
              Learning
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted print:text-[#333]">
              {learning.title} — {learning.detail}
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
