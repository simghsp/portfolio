import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { profile, projects, securityLab, skills, learning } from "@/lib/data";

// "Helvetica" is one of @react-pdf/renderer's built-in standard PDF fonts
// (along with Times-Roman and Courier) — no font file or registration
// needed, unlike next/font which only covers the HTML rendering path.
const accent = "#0f766e";
const muted = "#555555";
const mutedDim = "#888888";
const ink = "#111318";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: ink,
  },
  name: { fontSize: 21, fontWeight: 700 },
  headline: { fontSize: 11.5, color: accent, marginTop: 3 },
  contactRow: { flexDirection: "row", gap: 14, marginTop: 8, fontSize: 8.5, color: muted },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 12, marginBottom: 12 },
  body: { flexDirection: "row", gap: 22 },
  sidebar: { width: "31%" },
  main: { width: "69%" },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#777",
    marginBottom: 6,
  },
  section: { marginBottom: 14 },
  paragraph: { fontSize: 9.5, lineHeight: 1.5, color: "#222" },
  skillGroup: { marginBottom: 8 },
  skillGroupTitle: { fontSize: 8.5, fontWeight: 700, color: ink, marginBottom: 2 },
  skillGroupItems: { fontSize: 8.5, color: muted, lineHeight: 1.4 },
  learningTitle: { fontSize: 8.5, fontWeight: 700, color: ink, marginBottom: 2 },
  projectBlock: { marginBottom: 11 },
  projectHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  projectName: { fontSize: 10, fontWeight: 700 },
  projectDate: { fontSize: 8, color: mutedDim },
  projectTech: { fontSize: 7.5, color: mutedDim, marginTop: 1, marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5 },
  bulletMark: { width: 9, fontSize: 8.5, color: muted },
  bulletText: { flex: 1, fontSize: 8.5, color: "#333", lineHeight: 1.4 },
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

        <View style={styles.body}>
          <View style={styles.sidebar}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((group) => (
                <View key={group.title} style={styles.skillGroup}>
                  <Text style={styles.skillGroupTitle}>{group.title}</Text>
                  <Text style={styles.skillGroupItems}>{group.items.join(", ")}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <Text style={styles.paragraph}>{profile.education}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Learning</Text>
              <Text style={styles.learningTitle}>{learning.title}</Text>
              <Text style={styles.paragraph}>{learning.detail}</Text>
            </View>
          </View>

          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.paragraph}>
                Full-stack developer specializing toward Application Security. Built AegisFlow, a
                working API threat-detection gateway with a WAF rule engine, behavioral risk scoring,
                and a live SOC dashboard — backed by 113 automated tests. Comfortable across the
                stack: REST APIs, JWT/RBAC authorization, and relational and document databases.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {allProjects.map((project) => (
                <View key={project.slug} style={styles.projectBlock}>
                  <View style={styles.projectHeaderRow}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text style={styles.projectDate}>{project.date}</Text>
                  </View>
                  <Text style={styles.projectTech}>{project.tech.slice(0, 5).join(" · ")}</Text>
                  {project.resumeBullets.map((bullet) => (
                    <View key={bullet} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
