export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const siteConfig = {
  name: "Sapna Singh",
  title: "Sapna Singh — Full-Stack Developer building toward Security Engineering",
  description:
    "Portfolio of Sapna Singh, a full-stack developer transitioning into Application Security. Projects include AegisFlow, a real API threat detection and SOC platform, plus JWT/RBAC-driven full-stack applications.",
  keywords: [
    "Sapna Singh",
    "Sapna Singh developer",
    "Sapna Singh cybersecurity",
    "Sapna Singh full stack developer",
    "full stack developer cybersecurity",
    "application security developer",
    "backend security developer",
    "security engineer portfolio",
  ],
};
