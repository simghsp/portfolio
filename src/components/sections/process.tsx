import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section className="border-t border-border py-24 sm:py-32" aria-label="Development process">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="How I Work"
            title="A clear process, start to finish"
            description="The same six stages regardless of project size — access control and testing are part of the build, not extras."
          />
        </Reveal>

        <div className="relative mt-16">
          <span
            className="absolute top-[1.1rem] right-0 left-0 hidden h-px bg-border-strong lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="group relative">
                <span className="mono relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-background text-xs text-muted transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </Reveal>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
