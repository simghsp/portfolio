import { SubsectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { getRepoActivity } from "@/lib/github";
import { projects } from "@/lib/data";

export async function Projects() {
  const activity = await Promise.all(projects.map((p) => getRepoActivity(p.github)));

  return (
    <div>
        <Reveal>
          <SubsectionHeading
            kicker="Production Engineering"
            title="Projects"
            description="Full-stack applications with real backends, real databases, and real authorization logic — ranked by depth, not stars."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} featured={project.featured} activity={activity[i]} />
            </Reveal>
          ))}
        </div>
    </div>
  );
}
