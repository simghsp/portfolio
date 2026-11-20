import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24 sm:py-32" aria-label="Technical skills">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Skills"
            title="What I actually know how to use"
            description="Organized by category, not percentages — every item here has shipped in at least one of the projects above."
          />
        </Reveal>

        <dl className="mt-14 border-t border-border">
          {skills.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.04}
              className="grid gap-4 border-b border-border py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
            >
              <dt className="mono text-xs font-medium uppercase tracking-widest text-accent">
                {group.title}
              </dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-strong px-3 py-1 text-sm text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
