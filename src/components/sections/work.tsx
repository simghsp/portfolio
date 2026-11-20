import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Projects } from "@/components/sections/projects";
import { Architecture } from "@/components/sections/architecture";
import { CaseStudies } from "@/components/sections/case-studies";

export function Work() {
  return (
    <section id="projects" className="border-t border-border py-24 sm:py-28" aria-label="Work">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Work"
            title="What I've built, and how it holds up"
            description="Production projects first, then a look inside AegisFlow's request pipeline, then the security decisions behind them."
          />
        </Reveal>
        <div className="mt-14 space-y-20">
          <Projects />
          <Architecture />
          <CaseStudies />
        </div>
      </Container>
    </section>
  );
}
