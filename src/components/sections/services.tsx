import { Code2, KeyRound, Layers, ShieldCheck, Server } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";

const icons = [Layers, Server, KeyRound, ShieldCheck, Code2];

export function Services() {
  return (
    <section id="services" className="border-t border-border py-24 sm:py-28" aria-label="Services">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="What I Build"
            title="Services"
            description="Each of these maps to a project further down this page — nothing listed here without working code behind it."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent/30">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                  <p className="mono mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-dim">
                    {service.goodFor}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
