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
import { SubsectionHeading } from "@/components/ui/section-heading";
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
    <div>
      <Reveal>
        <SubsectionHeading
          kicker="Security Mindset"
          title="Engineering with security as a first-class requirement"
          description="Every concept below is backed by working code — the projects and case studies above show exactly where."
        />
      </Reveal>

      <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
        {concepts.map((concept, i) => {
          const Icon = concept.icon;
          return (
            <Reveal
              key={concept.title}
              delay={(i % 2) * 0.05}
              className="group grid grid-cols-[auto_1fr] gap-x-4 border-t border-border py-5"
            >
              <Icon
                size={18}
                aria-hidden="true"
                className="mt-0.5 text-muted-dim transition-colors duration-300 group-hover:text-accent"
              />
              <div>
                <dt className="text-base font-semibold text-foreground">{concept.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{concept.detail}</dd>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </div>
  );
}
