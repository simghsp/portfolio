import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { learning } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-28" aria-label="About">
      <Container>
        <Reveal>
          <SectionHeading kicker="About" title="From building applications to breaking them, carefully" />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.05} className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&rsquo;m a B.Sc. Information Technology student who started, like most
              developers, by learning to build things: React frontends, REST
              APIs, database schemas. What kept pulling my attention past
              &ldquo;does it work&rdquo; was a different question — <em className="text-foreground">who is allowed
              to do this, and what happens if they aren&rsquo;t?</em>
            </p>
            <p>
              Building JWT authentication for a job board meant confronting
              what a token actually proves. Building role-based dashboards
              meant confronting the difference between hiding a button and
              actually blocking a request. Every backend feature I shipped
              quietly turned into a question about trust boundaries — and
              answering those questions well is closer to security engineering
              than to feature development.
            </p>
            <p>
              That&rsquo;s the reason AegisFlow exists: not as a certificate or a
              course project, but as a deliberate, from-scratch attempt to
              build the thing security teams actually operate — a detection
              and response pipeline with real tests, a real audit trail, and
              documented limitations — instead of just reading about how one
              works.
            </p>
            <p>
              I&rsquo;m not presenting myself as someone who has finished this
              transition. I&rsquo;m early in it, and I&rsquo;m specific about what I&rsquo;ve
              actually shipped versus what I&rsquo;m still learning (see the{" "}
              <a href="#roadmap" className="text-accent hover:text-accent-strong">
                current-focus roadmap
              </a>{" "}
              below). What I can show is working code, real tests, and
              reasoning that holds up when someone reads the source.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Card>
              <h3 className="mono text-xs uppercase tracking-widest text-muted-dim">
                Currently
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Specializing toward Application Security / Backend Security
                after two years of full-stack and backend development.
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="mono text-xs uppercase tracking-widest text-muted-dim">
                  Foundations
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {learning.detail}
                </p>
                <a
                  href={learning.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-accent hover:text-accent-strong"
                >
                  {learning.title} ↗
                </a>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
