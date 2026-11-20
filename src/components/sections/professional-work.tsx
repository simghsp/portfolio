import { ArrowUpRight } from "lucide-react";
import { SubsectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience, professionalWork } from "@/lib/data";

const currentRole = experience[0];

export function ProfessionalWork() {
  return (
    <div>
      <Reveal>
        <SubsectionHeading
          kicker={`Professional Work · ${currentRole.company}`}
          title="Fintech and production systems, shipped at work"
          description="Payments, fintech and production platforms I've built, tested and fixed as a Junior Software Developer. These are employer projects, so there's no public source code. Live links are included where the product is public."
        />
      </Reveal>

      <ol className="mt-10 border-t border-border">
        {professionalWork.map((work, i) => (
          <Reveal
            as="li"
            key={work.name}
            delay={(i % 3) * 0.05}
            className="group grid gap-5 border-b border-border py-8 md:grid-cols-[11rem_1fr] md:gap-10"
          >
            <div>
              <p className="display text-5xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-accent">
                {work.metric.value}
              </p>
              <p className="mono mt-2 text-[11px] uppercase leading-snug tracking-wider text-muted-dim">
                {work.metric.label}
              </p>
            </div>
            <div>
              <p className="mono text-[11px] uppercase tracking-widest text-accent">{work.domain}</p>
              <h4 className="display mt-2 flex flex-wrap items-center gap-x-3 text-2xl font-bold text-foreground sm:text-3xl">
                {work.name}
                {work.url ? (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono inline-flex items-center gap-1 text-xs font-normal tracking-normal text-muted hover:text-accent"
                  >
                    <span className="link-grow">{work.url.replace("https://", "")}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : null}
              </h4>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{work.summary}</p>
              <p className="mono mt-4 text-xs text-muted-dim">{work.stack.join(" · ")}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
