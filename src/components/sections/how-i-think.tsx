import { Code2, Crosshair, Microscope, ShieldCheck } from "lucide-react";
import { SubsectionHeading } from "@/components/ui/section-heading";
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
    <div>
      <Reveal>
        <SubsectionHeading
          kicker="How I Think"
          title="Build → Break → Analyze → Secure"
          description="The same loop I used to build AegisFlow's detection pipeline is how I approach any backend feature: assume it will be attacked, and design like it."
        />
      </Reveal>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <Reveal
              as="li"
              key={stage.label}
              delay={i * 0.07}
              className="group relative bg-background p-6 transition-colors duration-300 hover:bg-background-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-xs text-muted-dim">0{i + 1}</span>
                <Icon
                  size={18}
                  aria-hidden="true"
                  className="text-muted-dim transition-colors duration-300 group-hover:text-accent"
                />
              </div>
              <h4 className="display mt-8 text-3xl font-bold text-foreground">{stage.label}</h4>
              <ul className="mt-3 space-y-1.5">
                {stage.steps.map((step) => (
                  <li key={step} className="text-sm leading-relaxed text-muted">
                    {step}
                  </li>
                ))}
              </ul>
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
