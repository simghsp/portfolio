import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24 sm:py-32" aria-label="Work experience">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Experience"
            title="Where I've worked"
            description="Professional roles, alongside the independent project work throughout the rest of this page."
          />
        </Reveal>

        <ol className="mt-14 border-t border-border">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.title}`}
              delay={i * 0.08}
              className="group grid gap-3 border-b border-border py-8 sm:grid-cols-[12rem_1fr] sm:gap-10"
            >
              <span className="mono flex items-center gap-2 text-xs text-muted-dim">
                {job.endDate === null ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                ) : null}
                {job.dateRange}
              </span>
              <div>
                <h3 className="display text-2xl font-bold text-foreground sm:text-3xl">{job.company}</h3>
                <p className="mt-1 text-sm text-accent-strong">{job.title}</p>
                <ul className="mt-4 space-y-1.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed text-muted">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
