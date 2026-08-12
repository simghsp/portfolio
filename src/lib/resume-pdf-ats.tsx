import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { profile, projects, securityLab, skills, learning } from "@/lib/data";

// Deliberately plain — single column, one font, no tables, no side-by-side
// layout. Optimized for ATS text-extraction, not visual polish (that's
// what resume-pdf.tsx / the main /resume page are for).
const styles = StyleSheet.create({
  page: { padding: 34, fontSize: 9.5, fontFamily: "Helvetica", color: "#111318" },
  name: { fontSize: 17, fontWeight: 700 },
  headline: { fontSize: 10, marginTop: 2 },
  meta: { fontSize: 8.5, marginTop: 5, lineHeight: 1.4 },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    textTransform: "uppercase",
    marginTop: 11,
    marginBottom: 4,
  },
  paragraph: { fontSize: 9, lineHeight: 1.4 },
  skillLine: { fontSize: 9, lineHeight: 1.45, marginBottom: 1.5 },
  projectName: { fontSize: 9.5, fontWeight: 700, marginTop: 6 },
  projectMeta: { fontSize: 8.5, marginTop: 1, marginBottom: 2 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5 },
  bulletMark: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.3 },
});

export function AtsResumeDocument() {
  const allProjects = [...projects, ...securityLab];

  return (
    <Document title={`${profile.name} — Resume (ATS)`} author={profile.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <Text style={styles.meta}>
          {profile.email} | github.com/{profile.githubUser} | linkedin.com/in/sapna-singh-26a07a244
        </Text>
        <Text style={styles.meta}>{profile.coreCompetencies.join(" | ")}</Text>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>
          Full-stack developer specializing toward Application Security. Built AegisFlow, a
          working API threat-detection gateway with a WAF rule engine, behavioral risk scoring,
          and a live SOC dashboard, backed by 113 automated tests. Experienced across the stack:
          REST APIs, JWT/RBAC authorization, and relational and document databases.
        </Text>

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
