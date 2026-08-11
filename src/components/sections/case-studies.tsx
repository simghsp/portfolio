import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudies, projects, securityLab } from "@/lib/data";

export function CaseStudies() {
  const allProjects = [...projects, ...securityLab];

  return (
    <section id="case-studies" className="border-t border-border py-24 sm:py-28" aria-label="Security case studies">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Security Engineering / Case Studies"
            title="How the security decisions were actually made"
            description="Not a list of buzzwords — the specific authorization and authentication problems in AegisFlow and JobBoard, how they were reasoned through, and how the fix was verified with a real test. Click a case to expand it."
          />
        </Reveal>

        <div className="mt-12 space-y-4">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.04}>
              <CaseStudyCard
                study={study}
                project={allProjects.find((p) => p.slug === study.projectSlug)}
                defaultOpen={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
