import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="border-t border-border py-24 sm:py-32" aria-label="Services">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="What I Build"
            title="Services"
            description="Each of these maps to a project further down this page — nothing listed here without working code behind it. Best fit: teams building or maintaining a web application with real user accounts, more than one permission level, or data that needs to stay properly access-controlled."
          />
        </Reveal>

        <ol className="mt-14 border-t border-border">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={(i % 4) * 0.04} className="group relative grid gap-3 border-b border-border py-7 transition-colors sm:grid-cols-[4rem_1fr_1fr_auto] sm:items-baseline sm:gap-8">
                <span
                  className="absolute inset-y-0 -left-4 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="mono text-xs text-muted-dim transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl font-bold text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.7rem]">
                    {service.title}
                  </h3>
                  <p className="mono mt-2 text-xs leading-relaxed text-muted-dim">{service.goodFor}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="hidden text-border-strong transition-all duration-300 group-hover:rotate-45 group-hover:text-accent sm:block"
                />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
