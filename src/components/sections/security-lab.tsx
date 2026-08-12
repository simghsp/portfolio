import { FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { getRepoActivity } from "@/lib/github";
import { securityLab } from "@/lib/data";

export async function SecurityLab() {
  const activity = await Promise.all(securityLab.map((p) => getRepoActivity(p.github)));

  return (
    <section id="security-lab" className="border-t border-border py-24 sm:py-28" aria-label="Security research and labs">
      <Container>
        <Reveal>
          <div className="mb-2 inline-flex items-center gap-2 text-accent">
            <FlaskConical size={16} aria-hidden="true" />
          </div>
          <SectionHeading
            kicker="Security Research / Labs"
            title="Security Lab"
            description="Smaller, focused projects built specifically to understand a security concept end-to-end — separate from production application work."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {securityLab.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} featured activity={activity[i]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
