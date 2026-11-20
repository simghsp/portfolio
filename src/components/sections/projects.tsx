import { SubsectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectShowcase } from "@/components/project-showcase";
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
          description="Full-stack applications with real backends, real databases, and real authorization logic — ranked by depth, not stars. Pick one to open it."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <ProjectShowcase projects={projects} activity={activity} />
      </Reveal>
    </div>
  );
}
