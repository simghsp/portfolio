import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProfessionalWork } from "@/components/sections/professional-work";
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
            description="Fintech and production work from my job first, then my own projects, a look inside AegisFlow's request pipeline, and the security decisions behind them."
          />
        </Reveal>
        <div className="mt-14 space-y-20">
          <ProfessionalWork />
          <Projects />
          <Architecture />
          <CaseStudies />
        </div>
      </Container>
    </section>
  );
}
