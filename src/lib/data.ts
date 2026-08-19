// Project/security data below is sourced directly from github.com/simghsp
// repositories, their READMEs, source files, and commit history. Employment
// data in `experience` is sourced directly from the person it's about.
// Nothing here is invented.

export const profile = {
  name: "Sapna Singh",
  headline: "Full-Stack Developer building toward Security Engineering.",
  github: "https://github.com/simghsp",
  githubUser: "simghsp",
  email: "sapnasinghsp01@gmail.com",
  linkedin: "https://www.linkedin.com/in/sapna-singh-26a07a244/",
  location: "India",
  education: "B.Sc. Information Technology",
  // One-line scan strip for the resume, under the name/headline — every
  // term here is directly backed by a project below, not aspirational.
  coreCompetencies: [
    "Application Security",
    "API Security (OWASP Top 10)",
    "Authentication & Authorization (JWT/RBAC)",
    "Secure Backend Architecture",
    "Full-Stack Development (React, Node.js, Python)",
  ],
};

export type ExperienceEntry = {
  title: string;
  company: string;
  dateRange: string;
  // ISO dates, kept alongside the display string so total experience can be
  // computed live (via getMonthsOfExperience below) instead of hardcoding a
  // number that quietly goes stale.
  startDate: string;
  endDate: string | null; // null = ongoing
  bullets: string[];
};

// Reverse chronological, most recent first.
export const experience: ExperienceEntry[] = [
  {
    title: "Junior Software Developer",
    company: "Bharatron Technologies Pvt Ltd",
    dateRange: "May 2026 – Present",
    startDate: "2026-05-06",
    endDate: null,
    bullets: [
      "Contributing to production web applications using the MERN stack, TypeScript, Next.js, and Tailwind CSS",
    ],
  },
  {
    title: "Junior Software Developer Intern",
    company: "Nexcore Alliance LLP",
    dateRange: "Feb 2026 – Apr 2026",
    startDate: "2026-02-04",
    endDate: "2026-04-10",
    bullets: [
      "Contributed to production-level applications built with the MERN stack and TypeScript",
    ],
  },
];

// Total professional experience across all roles, in whole months, rounded
// down (conservative — never overstates). Recomputed on every request, so
// it stays accurate without manual updates.
export function getMonthsOfExperience(): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const totalDays = experience.reduce((sum, job) => {
    const start = new Date(job.startDate).getTime();
    const end = (job.endDate ? new Date(job.endDate) : new Date()).getTime();
    return sum + (end - start) / msPerDay;
  }, 0);
  return Math.floor(totalDays / 30.44);
}

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: "production" | "lab";
  featured: boolean;
  date: string;
  problem: string;
  architecture: string[];
  tech: string[];
  security: string[];
  contribution: string;
  // Tight, resume-appropriate bullets — same underlying facts as `security`
  // and `contribution` above, rewritten as accomplishment statements
  // instead of narrative prose. Used by /resume and /resume/pdf.
  resumeBullets: string[];
  // What actually exists at the end of the build — a capability claim, not
  // a business metric. No invented numbers (users, revenue, uptime %).
  result: string;
  github: string;
  status?: string;
  caseStudySlugs?: string[];
};

export const projects: Project[] = [
  {
    slug: "aegisflow",
    name: "AegisFlow",
    tagline:
      "A working API security gateway — WAF, behavioral analysis, risk scoring, and threat correlation in front of a real protected API, with a live SOC dashboard.",
    category: "production",
    featured: true,
    date: "Aug 2026",
    problem:
      "Most portfolio security projects are a static rules list or a dashboard wired to fake numbers. AegisFlow is a real decision pipeline: every request is normalized, scored, and either allowed, challenged, or blocked in milliseconds — and every number on the dashboard is a live query against a real Postgres audit trail, not a placeholder.",
    architecture: [
      "Client / attacker traffic",
      "AegisFlow Gateway (Fastify) — normalize → WAF → behavior → risk score → correlation → response",
      "Demo Protected API (auth, users, products, orders, profile) — not internet-facing",
      "PostgreSQL (audit trail via Prisma) + Redis (rate limits, behavior windows)",
      "React SOC Dashboard — reads live from the gateway's security data API",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "Fastify",
      "React",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
    ],
    security: [
      "8-family WAF rule engine (SQLi, NoSQLi, XSS, path traversal, command injection, HPP, encoding, file access)",
      "Behavioral anomaly detection + 0–100 explainable risk scoring",
      "RBAC with server-enforced permission checks (dashboard UI is a convenience only)",
      "Dual-trust-domain JWT (analyst vs. end-user tokens are structurally incompatible)",
      "Object-level authorization (IDOR prevention on orders/profile)",
      "Timing-safe login (defends against user-enumeration)",
      "Secret redaction in logs + stored evidence",
    ],
    contribution:
      "Designed and built the full monorepo solo: the detection/behavior/risk/correlation/response pipeline, the Prisma schema and repositories, the Fastify APIs, the React SOC dashboard, and 113 automated tests (unit, WAF, live integration, live attack-simulation).",
    resumeBullets: [
      "Architected and built a full-stack API security gateway (TypeScript, Fastify, React) with an 8-family WAF rule engine covering OWASP Top 10 attack classes (SQLi, XSS, command injection, path traversal) plus behavioral anomaly detection and 0–100 explainable risk scoring",
      "Engineered a dual-trust-domain JWT authentication system separating analyst and end-user sessions, enforcing RBAC server-side on every write endpoint rather than trusting client-side UI checks",
      "Defended against IDOR and user-enumeration attacks by design, via object-level authorization checks and timing-safe login comparisons",
      "Validated the full detection pipeline with 113 automated tests (unit, WAF, live integration, attack-simulation) and built a React SOC dashboard reading live from a PostgreSQL audit trail",
    ],
    result:
      "A fully working platform, not a mockup: a live WAF blocking real attack patterns, explainable risk scoring, and a SOC dashboard reading from a real audit trail — validated by 113 automated tests rather than claimed.",
    github: "https://github.com/simghsp/aegisflow-security-platform",
    caseStudySlugs: ["timing-safe-login", "dual-trust-domain-jwt", "object-level-authorization"],
  },
  {
    slug: "jobboard",
    name: "JobBoard",
    tagline:
      "A full-stack MERN job board with separate candidate and employer roles, resume uploads, and email notifications.",
    category: "production",
    featured: true,
    date: "Nov 2025",
    problem:
      "A job board has to keep two roles — candidates and employers — looking at the same job/application data through very different, non-overlapping permissions: an employer must never see another employer's applicants, and a candidate must never post jobs.",
    architecture: [
      "React (Vite) client — role-aware routing for candidate / employer views",
      "Express API — helmet, morgan, CORS locked to the frontend origin",
      "JWT auth middleware — role claim carried in the token",
      "Multer upload pipeline — extension allowlist + 5MB limit for resumes",
      "MongoDB (Mongoose) — Users, Jobs, Applications",
    ],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Mongoose"],
    security: [
      "JWT authentication with role claims (candidate / employer)",
      "express-validator input validation on signup/login",
      "bcrypt password hashing (bcryptjs, salted)",
      "Ownership-based authorization on applications (an employer can only read applications for jobs they posted)",
      "Resume upload validated by file extension and capped at 5MB",
      "helmet security headers + origin-restricted CORS",
    ],
    contribution:
      "Built both the client and server: role-based dashboards, the JWT auth flow, the resume upload pipeline, and the ownership checks that keep employers scoped to their own job postings.",
    resumeBullets: [
      "Delivered a full-stack MERN job board with JWT authentication and role-based access control for candidate and employer accounts",
      "Implemented ownership-scoped authorization defending against broken-object-level-authorization (IDOR) — every applications query is scoped to the authenticated employer's own postings",
      "Built a resume-upload pipeline with server-side file-type/size validation and bcrypt-hashed password storage",
    ],
    result:
      "A working job board where an employer account can never see another employer's applicants or candidate data — the access-control boundary is enforced by design, not by convention.",
    github: "https://github.com/simghsp/jobBoard",
    caseStudySlugs: ["ownership-based-authorization"],
  },
  {
    slug: "expense-manager",
    name: "Expense Manager",
    tagline:
      "A MERN expense tracker with real-time MongoDB Atlas persistence and a clean CRUD REST API.",
    category: "production",
    featured: true,
    date: "Jan 2026",
    problem:
      "Straightforward but foundational: register a user, let them log expenses by name/amount/category/date, and keep the database in sync with every change — the kind of correct, boring CRUD plumbing every larger backend is built on top of.",
    architecture: [
      "React frontend — registration + expense forms/list",
      "Express REST API — /api/users, /api/expense",
      "MongoDB Atlas — cloud-hosted, real-time reads/writes",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Mongoose"],
    security: [
      "Environment-based configuration (Mongo URI via dotenv, not hard-coded)",
      "CORS-enabled REST API boundary",
    ],
    contribution:
      "Built the full stack end to end. This project predates the auth/RBAC work in AegisFlow and JobBoard — it's included deliberately as the foundational full-stack rep, not a security showcase.",
    resumeBullets: [
      "Developed a full-stack MERN expense tracker with a REST API and real-time MongoDB Atlas persistence",
      "Established CRUD operations for user registration and expense logging, using environment-based configuration to keep credentials out of source control",
    ],
    result:
      "A working expense tracker with real-time, cloud-synced persistence — the foundational full-stack build the later security-focused projects are built on top of.",
    github: "https://github.com/simghsp/Expense-Manager-MERN",
    status: "Foundational — no authentication layer yet",
  },
];

export const securityLab: Project[] = [
  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    tagline:
      "An offline Tkinter tool that scores password strength with an explainable 0–100 heuristic and generates cryptographically secure replacements.",
    category: "lab",
    featured: true,
    date: "Aug 2026",
    problem:
      "Show — not just state — how real password crackers think: dictionary attacks, keyboard-walk patterns, and leetspeak substitution (P@ssw0rd is still 'password' to an attacker's tooling), then generate something that isn't.",
    architecture: [
      "Tkinter GUI (single process, nothing leaves the machine)",
      "Rule checks: length, character classes, repetition, sequences, denylist, leetspeak-normalized pattern match",
      "secrets module — cryptographically secure random password generation",
    ],
    tech: ["Python", "Tkinter"],
    security: [
      "Leetspeak-aware denylist matching (defeats naive substitution bypasses)",
      "Sequential / keyboard-walk pattern detection",
      "secrets-based CSPRNG for generated passwords (not random)",
      "Clipboard auto-clear after 20 seconds; password never written to disk or logged",
    ],
    contribution:
      "Built solo as a self-contained, standard-library-only exercise in password security fundamentals — deliberately no web framework, database, or third-party dependency.",
    resumeBullets: [
      "Created an offline Python/Tkinter password auditing tool implementing leetspeak-aware pattern matching to defeat naive substitution bypasses in dictionary-attack defenses",
      "Generated cryptographically secure (CSPRNG) replacement passwords using Python's secrets module instead of the non-cryptographic random module",
    ],
    result:
      "A working, offline password-auditing tool that demonstrates practical cryptographic and pattern-detection concepts end to end, not just in theory.",
    github: "https://github.com/simghsp/password-strength-checker",
  },
];

export type CaseStudy = {
  slug: string;
  projectSlug: string;
  title: string;
  concept: string;
  problem: string;
  risk: string;
  investigation: string;
  rootCause: string;
  fix: string;
  validation: string;
  lesson: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "timing-safe-login",
    projectSlug: "aegisflow",
    title: "Closing the user-enumeration timing gap on login",
    concept: "Authentication / Side-Channel Defense",
    problem:
      "A naive login handler looks up the user first and only calls bcrypt.compare() if the account exists. That one branch is enough to leak information.",
    risk:
      "An attacker measuring response times can tell 'wrong password' apart from 'no such account' purely from latency — bcrypt.compare() is deliberately slow, so its absence on the no-such-account path is measurable. That turns login into a user-enumeration oracle, which is a stepping stone to credential stuffing and targeted attacks on confirmed accounts.",
    investigation:
      "Threat-modeled the analyst and demo-user login endpoints against the OWASP authentication checklist while designing AegisFlow's own auth (docs/threat-model.md) and asked specifically whether the two failure paths — bad password vs. unknown email — were distinguishable to a caller.",
    rootCause:
      "Short-circuiting on 'user not found' before any password comparison runs skips the one expensive, constant-ish-time operation (bcrypt) that the 'wrong password' path always pays.",
    fix:
      "Both login endpoints now run a real bcrypt.compare() against a fixed dummy hash even when the account doesn't exist, so the unknown-account path pays approximately the same cost as the wrong-password path before responding with an identical generic error.",
    validation:
      "Covered directly in the integration test suite: a test named 'rejects an invalid password without revealing whether the account exists' asserts both paths return the same response shape, and the dummy-hash comparison is exercised on every unknown-account attempt.",
    lesson:
      "Authentication bugs are rarely in the obvious 'is the password right' logic — they're in the asymmetry between the paths that lead there. Security review means looking at what each branch does *not* do.",
  },
  {
    slug: "dual-trust-domain-jwt",
    projectSlug: "aegisflow",
    title: "Keeping analyst sessions and end-user sessions structurally separate",
    concept: "Authorization / Privilege Escalation Prevention",
    problem:
      "AegisFlow has two very different classes of authenticated caller: SOC analysts who read/write security data, and demo end-users who just place orders. A single shared JWT secret and verifier would make it possible for a token minted for one domain to be replayed against the other.",
    risk:
      "If an end-user's JWT were accepted by the analyst-facing SOC API (or vice versa), a low-privilege demo account could potentially reach incident data, rules, or policies never meant for it — a privilege-escalation path baked into the auth layer itself.",
    investigation:
      "Designed the two token domains deliberately up front rather than discovering the overlap later: apps/gateway and apps/api each mint and verify JWTs with independent secrets and independent code paths (gateway/src/lib/jwt.ts vs. api/src/lib/jwt.ts).",
    rootCause:
      "Sharing one JWT secret across roles/domains means the token format — not a deliberate authorization check — becomes the only thing distinguishing an analyst from an end-user.",
    fix:
      "Two secrets, two verifiers. A token minted for one domain is structurally rejected by the other's verifier before any role/permission logic even runs. On top of that, requirePermission() checks a role→permission table (hasPermission()) server-side on every write endpoint — the dashboard's own route guards are UX only and are never trusted.",
    validation:
      "Integration-tested directly: a valid demo-user token gets a 401 from /api/security/overview, and a VIEWER-role analyst token can read the overview but gets a 403 attempting to write a policy.",
    lesson:
      "Authorization enforced only in the frontend (hiding a button) is not authorization. Every permission check in AegisFlow exists twice — once for UX, once for real — and only the server-side one is trusted.",
  },
  {
    slug: "object-level-authorization",
    projectSlug: "aegisflow",
    title: "Scoping every order and profile lookup to the caller's own token",
    concept: "IDOR Prevention / Access Control",
    problem:
      "A REST API with predictable resource IDs (/api/orders/:id, /api/profile) is only as safe as its ownership checks. Trusting a client-supplied user ID anywhere in that path turns the endpoint into an IDOR.",
    risk:
      "Without an explicit ownership check, one authenticated demo user could potentially read another user's orders or profile simply by changing an ID in the URL — a classic broken object-level authorization (BOLA/IDOR) vulnerability.",
    investigation:
      "Reviewed every route in apps/api that returns user-scoped data and traced where the 'which user' value actually comes from: the URL/body, or the verified JWT.",
    rootCause:
      "It's tempting to accept a userId from the request for convenience (fewer lookups) — but that silently hands authorization decisions to the client.",
    fix:
      "Every order and profile lookup is scoped to request.demoUser.id, populated only from the verified JWT in the auth middleware — never from a client-supplied field. There is no code path where one user's token can address another user's resource.",
    validation:
      "Exercised by the live integration and attack-simulation suites hitting the running gateway + API with real tokens for multiple demo accounts, confirming cross-account access is rejected.",
    lesson:
      "'Which record am I allowed to touch' should have exactly one source of truth — the verified identity — never a value the caller can also supply.",
  },
  {
    slug: "ownership-based-authorization",
    projectSlug: "jobboard",
    title: "Scoping employer access to jobs they actually posted",
    concept: "Authorization / Multi-Tenant Boundary",
    problem:
      "JobBoard's /api/applications/employer/:jobId endpoint returns candidate PII — names, emails, resumes — for everyone who applied to a job. Authentication alone (a valid employer JWT) says nothing about whether *this* employer posted *that* job.",
    risk:
      "If the endpoint only checked 'is this a logged-in employer,' any employer account could enumerate jobId values and pull another employer's applicant list, leaking candidate resumes and contact details across tenant boundaries.",
    investigation:
      "Reviewed each route that returns another user's data and asked the authorization question separately from the authentication question: not just 'who is calling,' but 'do they own this specific resource.'",
    rootCause:
      "Authentication middleware confirms identity; it does not — and cannot — know about resource ownership. That has to be a separate, explicit check in the route handler.",
    fix:
      "The handler loads the job, compares job.postedBy against the authenticated req.user.id, and returns 403 Forbidden on any mismatch before touching the applications collection. The candidate-side equivalent (/api/applications/candidate) applies the same pattern, additionally gating on role === 'candidate'.",
    validation:
      "Manually verified with two employer accounts and one candidate account: cross-employer job IDs return 403, and a candidate hitting the employer route is rejected by the role check before the ownership check even runs.",
    lesson:
      "'requireAuth' and 'require ownership' are two different guarantees. A route can be fully authenticated and still leak data across tenants if only the first one is enforced.",
  },
];

export type SkillCategory = {
  title: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    title: "Software Engineering",
    items: ["TypeScript", "JavaScript (ES6+)", "React", "Next.js", "Node.js", "Python"],
  },
  {
    title: "Backend & APIs",
    items: [
      "REST API design",
      "Express / Fastify",
      "JWT authentication",
      "Role-based authorization (RBAC)",
      "Input validation (Zod, express-validator)",
      "Middleware & error handling",
    ],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "Prisma ORM", "MongoDB", "Mongoose", "Redis"],
  },
  {
    title: "Application Security",
    items: [
      "Authentication & session security",
      "Authorization & access control (IDOR/BOLA prevention)",
      "API security (WAF pattern rules, input sanitization)",
      "Secure password storage (bcrypt)",
      "Audit logging & secret redaction",
      "Threat modeling (learning)",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "CI/CD (GitHub Actions + Vercel)",
      "pnpm workspaces (monorepo)",
      "Git/GitHub",
    ],
  },
];

export type RoadmapStage = {
  title: string;
  detail: string;
  status: "practiced" | "current" | "next";
};

export const roadmap: RoadmapStage[] = [
  {
    title: "Full-Stack Application Development",
    detail: "React/Next.js frontends, Node.js/Express APIs, relational and document databases.",
    status: "practiced",
  },
  {
    title: "Authentication, Authorization & API Security",
    detail: "JWT auth, RBAC, ownership-based access control, input validation, secure password storage — shipped in AegisFlow and JobBoard.",
    status: "practiced",
  },
  {
    title: "Application Security Engineering",
    detail: "WAF rule design, risk scoring, behavioral detection, and secure-by-default backend architecture — the core of AegisFlow.",
    status: "current",
  },
  {
    title: "Vulnerability Research & Security Testing",
    detail: "Structured threat modeling, deeper attack-simulation testing, and formal security testing methodology.",
    status: "next",
  },
];

export const learning = {
  title: "CodSoft Python Programming Internship",
  detail:
    "Project-based virtual internship: five self-contained Python programs (To-Do list, calculator, password generator, Rock-Paper-Scissors, contact book) covering core programming and CLI application structure.",
  github: "https://github.com/simghsp/CODSOFT",
};

export type Service = {
  title: string;
  description: string;
  goodFor: string;
};

// Every service maps directly to something already shipped in a project
// above — nothing listed here without working code behind it.
export const services: Service[] = [
  {
    title: "Full-Stack Web Application Development",
    description:
      "Complete web applications — frontend, backend, and database — using React, Next.js, Node.js, and Express or Fastify.",
    goodFor: "New products, internal tools, or rebuilding an existing app on a more maintainable stack.",
  },
  {
    title: "Backend & API Development",
    description:
      "REST APIs with proper input validation, structured error handling, and middleware, built on Node.js with Express or Fastify, backed by PostgreSQL or MongoDB.",
    goodFor: "Products that need a reliable backend for a frontend, mobile app, or third-party integration.",
  },
  {
    title: "Authentication & Authorization",
    description:
      "JWT-based auth, role-based access control, and ownership-scoped authorization — the access-control layer that keeps one user's data from leaking to another.",
    goodFor: "Any application with user accounts, multiple roles, or data that needs to stay scoped per user or organization.",
  },
  {
    title: "Security-Conscious Application Development",
    description:
      "Input validation, secure password storage, audit logging, and defense against access-control and injection vulnerabilities — the kind of gaps that let one user see another's data or let malicious input reach the database — built in from the start rather than added later.",
    goodFor: "Applications handling user data or anything where an access-control mistake would be costly.",
  },
  {
    title: "React / TypeScript Frontend Development",
    description: "Type-safe, component-based frontends with React, Next.js, and Tailwind CSS.",
    goodFor: "Dashboards, admin panels, and customer-facing web apps that need to stay maintainable as they grow.",
  },
  {
    title: "Admin & Operations Dashboards",
    description:
      "Internal dashboards for teams that need visibility into what an application is actually doing — built with real role-gating, not just a UI wrapped around a database (as shipped in AegisFlow's SOC dashboard).",
    goodFor: "Internal tools, ops consoles, or any product that needs a separate, permission-gated view for staff or admins.",
  },
  {
    title: "Performance Optimization",
    description:
      "Diagnosing why a page actually loads slowly — render-blocking scripts, hydration delays, oversized assets — and fixing the real bottleneck instead of guessing.",
    goodFor: "Existing sites or apps with slow page loads or a poor Core Web Vitals / Lighthouse score.",
  },
];

export type ProcessStep = {
  title: string;
  detail: string;
};

export const process: ProcessStep[] = [
  {
    title: "Discovery",
    detail: "Understand the problem, the users, and what success actually looks like before writing any code.",
  },
  {
    title: "Planning",
    detail: "Define scope, data model, and architecture — including the trust boundaries, not just the feature list.",
  },
  {
    title: "Development",
    detail: "Build in small, reviewable increments, with input validation and access control as part of each feature, not an afterthought.",
  },
  {
    title: "Testing",
    detail: "Automated tests where they matter most — auth flows, access control, core logic — plus manual verification of the real user path.",
  },
  {
    title: "Deployment",
    detail: "Ship with CI, environment-based configuration, and security headers in place from day one.",
  },
  {
    title: "Support",
    detail: "Available for fixes and follow-up questions after delivery — not a handoff into silence.",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Security", href: "#security-mindset" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
