import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { roadmap } from "@/lib/data";

const statusLabel: Record<(typeof roadmap)[number]["status"], string> = {
  practiced: "Shipped",
  current: "Current Focus",
  next: "Next",
};

const statusColor: Record<(typeof roadmap)[number]["status"], string> = {
  practiced: "text-risk-low border-risk-low/40",
  current: "text-accent border-accent/40",
  next: "text-muted border-border-strong",
};

export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-border py-24 sm:py-28" aria-label="Cybersecurity roadmap">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Focus & Trajectory"
            title="Shipped today, sharpening tomorrow"
            description="Full-stack development and authentication/authorization are shipped, production-tested skills, not aspirations. Application security engineering is where most of my current effort goes — the stages below show that progression honestly, not as a claim of mastery I don't have yet."
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {roadmap.map((stage, i) => (
            <Reveal key={stage.title} delay={i * 0.05}>
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/60 p-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="mono flex items-center gap-3 sm:w-10">
                  <span className="text-sm text-muted-dim">0{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">{stage.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{stage.detail}</p>
                </div>
                <span
                  className={cn(
                    "mono w-fit shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide",
                    statusColor[stage.status]
                  )}
                >
                  {statusLabel[stage.status]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
