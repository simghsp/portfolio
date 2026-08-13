import { Briefcase } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24 sm:py-28" aria-label="Work experience">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Experience"
            title="Where I've worked"
            description="Professional roles, alongside the independent project work throughout the rest of this page."
          />
        </Reveal>

        <div className="relative mt-12 space-y-6 border-l border-border pl-8 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.title}`} delay={i * 0.08}>
              <div className="relative">
                <span
                  className="absolute top-1.5 -left-[2.45rem] flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-background-elevated text-accent sm:-left-[3.15rem]"
                  aria-hidden="true"
                >
                  <Briefcase size={12} />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {job.title} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <span className="mono text-xs text-muted-dim">{job.dateRange}</span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
