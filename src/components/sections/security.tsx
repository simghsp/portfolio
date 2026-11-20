import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { HowIThink } from "@/components/sections/how-i-think";
import { SecurityMindset } from "@/components/sections/security-mindset";
import { SecurityLab } from "@/components/sections/security-lab";

export function Security() {
  return (
    <section id="security" className="border-t border-border py-24 sm:py-28" aria-label="Security">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Security"
            title="Security built in, not bolted on"
            description="How I approach a feature, the practices it gets in every project, and the focused labs where I go deeper."
          />
        </Reveal>
        <div className="mt-14 space-y-20">
          <HowIThink />
          <SecurityMindset />
          <SecurityLab />
        </div>
      </Container>
    </section>
  );
}
