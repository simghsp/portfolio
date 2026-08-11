import { Code2, Crosshair, Microscope, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const stages = [
  {
    icon: Code2,
    label: "Build",
    steps: ["Build the application", "Map the trust boundaries"],
  },
  {
    icon: Crosshair,
    label: "Break",
    steps: ["Identify the attack surface", "Test authorization, not just authentication"],
  },
  {
    icon: Microscope,
    label: "Analyze",
    steps: ["Find the vulnerability", "Trace it to its root cause"],
  },
  {
    icon: ShieldCheck,
    label: "Secure",
    steps: ["Fix the cause, not the symptom", "Validate with a test, then watch production"],
  },
];

export function HowIThink() {
  return (
    <section className="border-t border-border py-24 sm:py-28" aria-label="How I approach engineering">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="How I Think"
            title="Build → Break → Analyze → Secure"
            description="The same loop I used to build AegisFlow's detection pipeline is how I approach any backend feature: assume it will be attacked, and design like it."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal key={stage.label} delay={i * 0.07}>
                <div className="relative h-full rounded-2xl border border-border bg-surface/60 p-6">
                  <div className="mono mb-4 text-xs text-muted-dim">0{i + 1}</div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{stage.label}</h3>
                  <ul className="mt-3 space-y-2">
                    {stage.steps.map((step) => (
                      <li key={step} className="text-sm leading-relaxed text-muted">
                        {step}
                      </li>
                    ))}
                  </ul>
                  {i < stages.length - 1 ? (
                    <div
                      className="absolute top-1/2 -right-2.5 hidden h-px w-5 bg-border-strong lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
