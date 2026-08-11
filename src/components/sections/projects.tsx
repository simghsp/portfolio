import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-24 sm:py-28" aria-label="Production projects">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Production Engineering"
            title="Projects"
            description="Full-stack applications with real backends, real databases, and real authorization logic — ranked by depth, not stars."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} featured={project.featured} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
