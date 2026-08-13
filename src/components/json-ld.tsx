import { profile, experience } from "@/lib/data";
import { siteConfig, siteUrl } from "@/lib/site";

// Person structured data — every field here is already established
// elsewhere on the site (Experience section, contact links, skills). This
// just makes it machine-readable for search engines.
export function JsonLd() {
  const currentRole = experience[0];

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    jobTitle: currentRole.title,
    worksFor: {
      "@type": "Organization",
      name: currentRole.company,
    },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Application Security",
      "API Security",
      "Authentication and Authorization",
      "JWT",
      "Role-Based Access Control",
      "Full-Stack Development",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
    ],
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
