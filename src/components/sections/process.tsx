import { Search, ClipboardList, Code2, FlaskConical, Rocket, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/lib/data";

const icons = [Search, ClipboardList, Code2, FlaskConical, Rocket, LifeBuoy];

export function Process() {
  return (
    <section className="border-t border-border py-24 sm:py-28" aria-label="Development process">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="How I Work"
            title="A clear process, start to finish"
            description="The same six stages regardless of project size — access control and testing are part of the build, not extras."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={step.title} delay={(i % 3) * 0.06}>
                <div className="relative h-full rounded-2xl border border-border bg-surface/60 p-6">
                  <div className="mono mb-4 text-xs text-muted-dim">0{i + 1}</div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
