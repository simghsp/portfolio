import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24 sm:py-28" aria-label="Technical skills">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Skills"
            title="What I actually know how to use"
            description="Organized by category, not percentages — every item here has shipped in at least one of the projects below."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="mono text-xs font-medium uppercase tracking-widest text-accent">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
