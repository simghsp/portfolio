import {
  KeyRound,
  Lock,
  ShieldAlert,
  UserCheck,
  FileWarning,
  Network,
  ScrollText,
  Timer,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const concepts = [
  {
    icon: KeyRound,
    title: "Authentication",
    detail:
      "JWT-based login flows in AegisFlow and JobBoard, with bcrypt password hashing and timing-safe comparisons to prevent user enumeration.",
  },
  {
    icon: UserCheck,
    title: "Authorization & RBAC",
    detail:
      "Role-based permissions (analyst roles in AegisFlow, candidate/employer roles in JobBoard) enforced server-side, never trusted from the client.",
  },
  {
    icon: ShieldAlert,
    title: "IDOR / Access Control",
    detail:
      "Object-level ownership checks on orders, profiles, and job applications — every lookup is scoped to the authenticated caller's own ID.",
  },
  {
    icon: Network,
    title: "API Security",
    detail:
      "An 8-family WAF rule engine, CORS lockdown, request body limits, and security headers (helmet) across every service I've shipped.",
  },
  {
    icon: FileWarning,
    title: "Input Validation",
    detail:
      "Zod schema validation in AegisFlow, express-validator in JobBoard — rejecting malformed input before it reaches business logic.",
  },
  {
    icon: Timer,
    title: "Rate Limiting & Response",
    detail:
      "Redis-backed adaptive rate limiting and a graduated response ladder (allow → monitor → challenge → block) in AegisFlow's gateway.",
  },
  {
    icon: ScrollText,
    title: "Audit Logging & Redaction",
    detail:
      "Structured, secret-redacted logging (pino) and a full Postgres audit trail — every security decision is explainable after the fact.",
  },
  {
    icon: Lock,
    title: "Secure Error Handling",
    detail:
      "Single error-handling layer per service: operational errors return specific codes, everything else returns a generic message — no stack traces leak.",
  },
];

export function SecurityMindset() {
  return (
    <section id="security-mindset" className="border-t border-border py-24 sm:py-28" aria-label="Security mindset">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Security Mindset"
            title="Engineering with security as a first-class requirement"
            description="Every concept below is backed by working code — the projects and case studies further down this page show exactly where."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((concept, i) => {
            const Icon = concept.icon;
            return (
              <Reveal key={concept.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/30">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-accent">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{concept.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{concept.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
