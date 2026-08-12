import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { profile, projects, securityLab, skills, learning } from "@/lib/data";

// "Helvetica" is one of @react-pdf/renderer's built-in standard PDF fonts
// (along with Times-Roman and Courier) — no font file or registration
// needed, unlike next/font which only covers the HTML rendering path.
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  name: { fontSize: 22, fontWeight: 700 },
  headline: { fontSize: 12, color: "#0f766e", marginTop: 4 },
  contactRow: { flexDirection: "row", gap: 16, marginTop: 10, fontSize: 9, color: "#444" },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 12, marginBottom: 12 },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#666",
    marginBottom: 6,
  },
  section: { marginBottom: 14 },
  paragraph: { fontSize: 10, lineHeight: 1.5, color: "#222" },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  projectName: { fontSize: 10.5, fontWeight: 700 },
  projectTech: { fontSize: 8.5, color: "#666" },
  projectTagline: { fontSize: 9.5, color: "#333", marginBottom: 2, lineHeight: 1.4 },
  projectSecurity: { fontSize: 8.5, color: "#555", lineHeight: 1.4 },
  projectBlock: { marginBottom: 10 },
  skillLine: { fontSize: 9.5, color: "#333", marginBottom: 4, lineHeight: 1.5 },
  skillLabel: { fontWeight: 700, color: "#1a1a1a" },
});

export function ResumeDocument() {
  const allProjects = [...projects, ...securityLab];

  return (
    <Document title={`${profile.name} — Resume`} author={profile.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <View style={styles.contactRow}>
          <Text>{profile.email}</Text>
          <Text>github.com/{profile.githubUser}</Text>
          <Text>linkedin.com/in/sapna-singh-26a07a244</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>
            Full-stack developer (B.Sc. Information Technology) with hands-on experience building
            REST APIs, JWT authentication, role-based authorization, and relational/document
            databases. Currently specializing toward Application Security — designed and built
            AegisFlow, a working API threat-detection gateway with a WAF rule engine, behavioral
            risk scoring, and a live SOC dashboard, backed by 113 automated tests.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {allProjects.map((project) => (
            <View key={project.slug} style={styles.projectBlock}>
              <View style={styles.projectRow}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectTech}>{project.tech.slice(0, 4).join(" · ")}</Text>
              </View>
              <Text style={styles.projectTagline}>{project.tagline}</Text>
              <Text style={styles.projectSecurity}>
                Security: {project.security.slice(0, 3).join("; ")}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map((group) => (
            <Text key={group.title} style={styles.skillLine}>
              <Text style={styles.skillLabel}>{group.title}: </Text>
              {group.items.join(", ")}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.paragraph}>{profile.education}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning</Text>
          <Text style={styles.paragraph}>
            {learning.title} — {learning.detail}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
