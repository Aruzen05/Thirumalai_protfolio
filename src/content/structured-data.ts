// Schema.org structured data (JSON-LD) for search engines and AI answer
// engines. Everything is generated from profile.ts, so it always matches what
// the page says. The pieces reference each other by "@id" to form one graph:
// WebSite → ProfilePage → Person ← ScholarlyArticle / projects / FAQ.

import {
  certifications,
  disciplines,
  education,
  faq,
  type Project,
  projects,
  publication,
  researchInterests,
  seo,
  site,
  skills,
} from "./profile";

const base = site.url;
const [givenName, ...rest] = site.name.split(" ");

export const ids = {
  website: `${base}/#website`,
  profile: `${base}/#profilepage`,
  person: `${base}/#person`,
  paper: `${base}/#ieee-icears-2023`,
  projects: `${base}/#projects`,
  faq: `${base}/#faq`,
};

const unique = (list: string[]) => [...new Set(list)];
const doiUrl = `https://doi.org/${publication.doi}`;
const projectUrl = (p: Project) => `${base}/work/${p.slug}/`;

// Serialise for a <script type="application/ld+json"> tag, escaping "<" so the
// content can never close the script element early.
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const person = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  alternateName: site.alternateNames,
  givenName,
  familyName: rest.join(" "),
  url: `${base}/`,
  mainEntityOfPage: { "@id": ids.profile },
  image: {
    "@type": "ImageObject",
    url: `${base}${site.photo.src}`,
    width: site.photo.width,
    height: site.photo.height,
    caption: `${site.name}, ${site.roles[0]} and ${site.roles[1]}`,
  },
  jobTitle: site.roles,
  description: site.description,
  email: site.email,
  telephone: site.phones.map((p) => p.href.replace("tel:", "")),
  address: { "@type": "PostalAddress", addressRegion: site.region, addressCountry: "GB" },
  homeLocation: { "@type": "Place", name: `${site.region}, ${site.location}` },
  knowsLanguage: "English",
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
    address: { "@type": "PostalAddress", addressLocality: e.place },
  })),
  hasCredential: [
    ...education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      name: e.degree,
      credentialCategory: "degree",
      dateCreated: e.year,
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
      about: e.areas,
    })),
    ...certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.code ? `${c.name} (${c.code})` : c.name,
      credentialCategory: c.code ? "certification" : "course certificate",
      recognizedBy: { "@type": "Organization", name: c.issuer === "Cisco NetAcad" ? "Cisco Networking Academy" : c.issuer },
    })),
  ],
  hasOccupation: site.roles.map((role) => ({
    "@type": "Occupation",
    name: role,
    occupationLocation: { "@type": "Country", name: "United Kingdom" },
  })),
  knowsAbout: unique([
    ...disciplines.map((d) => d.title),
    ...skills.filter((s) => s.group !== "Operations").flatMap((s) => s.items),
    ...researchInterests,
  ]),
  sameAs: Object.values(site.links).filter(Boolean),
};

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: `${base}/`,
        name: `${site.name} — Portfolio`,
        description: seo.description,
        inLanguage: "en-GB",
        publisher: { "@id": ids.person },
        about: { "@id": ids.person },
      },
      {
        "@type": "ProfilePage",
        "@id": ids.profile,
        url: `${base}/`,
        name: seo.title,
        description: seo.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": ids.website },
        mainEntity: { "@id": ids.person },
        dateModified: new Date().toISOString(),
      },
      person,
      {
        "@type": "ScholarlyArticle",
        "@id": ids.paper,
        headline: publication.title,
        name: publication.title,
        description: publication.summary,
        // Authors in published order; this site's owner is linked to the full Person.
        author: publication.authors.map((a) =>
          a === publication.selfAs ? { "@id": ids.person } : { "@type": "Person", name: a },
        ),
        datePublished: publication.date,
        publisher: { "@type": "Organization", name: "IEEE" },
        isPartOf: { "@type": "Book", name: publication.proceedings, alternateName: publication.venue },
        about: ["IoT security", "Cloud security"],
        identifier: { "@type": "PropertyValue", propertyID: "DOI", value: publication.doi },
        url: doiUrl,
        sameAs: doiUrl,
      },
      {
        "@type": "ItemList",
        "@id": ids.projects,
        name: "Selected work",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${projectUrl(p)}#work`,
            name: p.name,
            url: projectUrl(p),
            description: p.summary,
            author: { "@id": ids.person },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        isPartOf: { "@id": ids.profile },
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  const url = projectUrl(project);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.name,
        headline: `${project.name}: ${project.short}`,
        alternativeHeadline: project.short,
        description: project.summary,
        abstract: project.description.join(" "),
        url,
        genre: project.kind,
        creativeWorkStatus: project.stage,
        keywords: unique([project.kind, ...project.stack]).join(", "),
        inLanguage: "en-GB",
        author: { "@type": "Person", "@id": ids.person, name: site.name, url: `${base}/` },
        isPartOf: { "@id": ids.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Selected work", item: `${base}/#work` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}
