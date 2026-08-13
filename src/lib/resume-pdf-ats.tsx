import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { profile, experience, projects, securityLab, skills, learning } from "@/lib/data";

// Deliberately plain — single column, one font, no tables, no side-by-side
// layout. Optimized for ATS text-extraction, not visual polish (that's
// what resume-pdf.tsx / the main /resume page are for).
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, fontFamily: "Helvetica", color: "#111318" },
  name: { fontSize: 16, fontWeight: 700 },
  headline: { fontSize: 9.5, marginTop: 2 },
  meta: { fontSize: 8, marginTop: 4, lineHeight: 1.3 },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 3,
  },
  paragraph: { fontSize: 8.5, lineHeight: 1.3 },
  skillLine: { fontSize: 8.5, lineHeight: 1.35, marginBottom: 1 },
  projectName: { fontSize: 9, fontWeight: 700, marginTop: 4 },
  projectMeta: { fontSize: 8, marginTop: 1, marginBottom: 1.5 },
  bulletRow: { flexDirection: "row", marginBottom: 1 },
  bulletMark: { width: 9, fontSize: 8.5 },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.25 },
});

export function AtsResumeDocument() {
  const allProjects = [...projects, ...securityLab];

  return (
    <Document title={`${profile.name} — Resume (ATS)`} author={profile.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <Text style={styles.meta}>
          {profile.location} | {profile.email} | github.com/{profile.githubUser} |
          linkedin.com/in/sapna-singh-26a07a244
        </Text>
        <Text style={styles.meta}>{profile.coreCompetencies.join(" | ")}</Text>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>
          Junior Software Developer at Bharatron Technologies, building production web
          applications with the MERN stack, TypeScript, and Next.js. Specializing toward
          Application Security — built AegisFlow, a working API threat-detection gateway with a
          WAF rule engine, behavioral risk scoring, and a live SOC dashboard, backed by 113
          automated tests.
        </Text>

        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((job) => (
          <View key={`${job.company}-${job.title}`}>
            <Text style={styles.projectName}>
              {job.title} — {job.company} ({job.dateRange})
            </Text>
            {job.bullets.map((bullet) => (
              <View key={bullet} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>-</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Skills</Text>
        {skills.map((group) => (
          <Text key={group.title} style={styles.skillLine}>
            {group.title}: {group.items.join(", ")}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Projects</Text>
        {allProjects.map((project) => (
          <View key={project.slug}>
            <Text style={styles.projectName}>
              {project.name} ({project.date})
            </Text>
            <Text style={styles.projectMeta}>{project.tech.join(", ")}</Text>
            {project.resumeBullets.map((bullet) => (
              <View key={bullet} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>-</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.paragraph}>{profile.education}</Text>

        <Text style={styles.sectionTitle}>Additional Training</Text>
        <Text style={styles.paragraph}>
          {learning.title} — {learning.detail}
        </Text>
      </Page>
    </Document>
  );
}
