import {
  certifications,
  education,
  experience,
  faq,
  heroSkills,
  projects,
  publication,
  researchInterests,
  site,
} from "@/content/profile";

// /llms.txt — a plain-text briefing for AI assistants and answer engines
// (https://llmstxt.org). Generated from profile.ts at build time, so it always
// matches the site.
export const dynamic = "force-static";

const LINK_NAMES: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  researchgate: "ResearchGate",
  orcid: "ORCID",
  googleScholar: "Google Scholar",
};

export function GET() {
  const url = site.url;
  const links = Object.entries(site.links).filter(([, v]) => v);
  const lines = [
    `# ${site.name}`,
    "",
    // The first FAQ answer is the one-paragraph "who is" summary.
    `> ${faq[0].a} ${site.status}.`,
    "",
    "## Key facts",
    "",
    `- Roles: ${site.roles.join(", ")}`,
    `- Based in: ${site.region}, ${site.location}`,
    ...education.map((e) => `- Education: ${e.degree}, ${e.school}, ${e.place} (${e.year})`),
    `- Publication: "${publication.title}" — ${publication.authors.join(", ")} — ${publication.proceedings} (${publication.venue}), ${publication.date}, https://doi.org/${publication.doi}`,
    `- Also published as: ${site.alternateNames.join(", ")}`,
    `- Certifications: ${certifications.map((c) => (c.code ? `${c.name} (${c.code})` : `${c.issuer === "Cisco NetAcad" ? "Cisco Networking Academy" : c.issuer} ${c.name}`)).join("; ")}`,
    `- Technologies: ${heroSkills.map((s) => s.label).join(", ")}`,
    `- Research interests: ${researchInterests.join(", ")}`,
    `- Status: ${site.status}`,
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    ...site.phones.map((p) => `- Phone (${p.label}): ${p.display}`),
    ...links.map(([name, href]) => `- ${LINK_NAMES[name] ?? name}: ${href}`),
    "",
    "## Pages",
    "",
    `- [Portfolio home](${url}/): profile, expertise, selected work, experience, research, skills, FAQ and contact`,
    ...projects.map((p) => `- [${p.name}](${url}/work/${p.slug}/): ${p.summary}`),
    `- [Privacy notice](${url}/privacy/)`,
    "",
    "## Experience",
    "",
    ...experience.map((r) => `- ${r.title} — ${r.org}, ${r.place} (${r.period}): ${r.summary}`),
    "",
    "## FAQ",
    "",
    ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
