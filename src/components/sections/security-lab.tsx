import { SubsectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectShowcase } from "@/components/project-showcase";
import { getRepoActivity } from "@/lib/github";
import { securityLab } from "@/lib/data";

export async function SecurityLab() {
  const activity = await Promise.all(securityLab.map((p) => getRepoActivity(p.github)));

  return (
    <div id="security-lab" className="scroll-mt-24">
      <Reveal>
        <SubsectionHeading
          kicker="Security Research / Labs"
          title="Security Lab"
          description="Smaller, focused projects built specifically to understand a security concept end-to-end — separate from production application work."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <ProjectShowcase projects={securityLab} activity={activity} />
      </Reveal>
    </div>
  );
}
