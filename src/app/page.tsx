import Link from "next/link";
import { CodeCard } from "@/components/CodeCard";
import { CopyEmail } from "@/components/CopyEmail";
import { DisciplineIcon } from "@/components/DisciplineIcon";
import { ArrowIcon, BrandIcon, LinkedInIcon, MailIcon, PaperIcon, PhoneIcon, PinIcon, ShieldIcon } from "@/components/Icons";
import { Portrait } from "@/components/Portrait";
import { ProjectArt } from "@/components/ProjectArt";
import { Section } from "@/components/Section";
import { Typewriter } from "@/components/Typewriter";
import {
  approach,
  certifications,
  credentials,
  disciplines,
  education,
  experience,
  heroSkills,
  profile,
  projects,
  publication,
  researchInterests,
  site,
  skills,
  stats,
  typedRoles,
} from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phones.map((p) => p.href.replace("tel:", "")),
  jobTitle: site.roles[0],
  description: site.description,
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  knowsAbout: ["Software engineering", "Application security", "Security architecture", "Identity and access management", "Privacy by design", "Generative AI"],
  sameAs: Object.values(site.links).filter(Boolean),
};

const doiUrl = `https://doi.org/${publication.doi}`;

function SocialTiles() {
  const { linkedin, github, researchgate } = site.links;
  const external = { rel: "noopener noreferrer", target: "_blank" } as const;
  return (
    <ul className="tiles">
      {linkedin && (
        <li>
          <a className="tile" href={linkedin} aria-label="LinkedIn" title="LinkedIn" {...external}>
            <LinkedInIcon className="tile-i" />
          </a>
        </li>
      )}
      {github && (
        <li>
          <a className="tile" href={github} aria-label="GitHub" title="GitHub" {...external}>
            <BrandIcon name="siGithub" className="tile-i" />
          </a>
        </li>
      )}
      {researchgate && (
        <li>
          <a className="tile" href={researchgate} aria-label="ResearchGate" title="ResearchGate" {...external}>
            <BrandIcon name="siResearchgate" className="tile-i" />
          </a>
        </li>
      )}
      <li>
        <a className="tile" href={`mailto:${site.email}`} aria-label="Email" title="Email">
          <MailIcon className="tile-i" />
        </a>
      </li>
      <li>
        <a className="tile" href={doiUrl} aria-label="IEEE publication" title="IEEE publication" {...external}>
          <PaperIcon className="tile-i" />
        </a>
      </li>
    </ul>
  );
}

export default function Home() {
  const [first] = site.name.split(" ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ---------------------------------------------------------- Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Software · Security · AI</p>
          <h1 id="hero-title" className="hero-title">
            <span className="sr-only">
              {site.name} — {site.roles.join(", ")}
            </span>
            <span aria-hidden="true">
              <span className="hero-hi">
                Hi, I&apos;m <span className="hl">{first}</span>
              </span>
              <span className="hero-role">
                <Typewriter phrases={typedRoles} />
              </span>
            </span>
          </h1>
          <p className="hero-lede">{profile.lede}</p>
          <div className="actions">
            <a className="btn btn-primary" href="#contact">
              Connect with me
            </a>
            <a className="btn btn-ghost" href="#work">
              View my work <ArrowIcon className="i" />
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <p className="label">Find me on</p>
              <SocialTiles />
            </div>
            <div className="meta-skills">
              <p className="label">
                Best skills on <span className="label-count">{heroSkills.length}</span>
              </p>
              {/* Focusable so keyboard users can scroll it where it becomes a swipe strip on phones. */}
              <ul className="tiles tiles-skills" tabIndex={0} aria-label={`${heroSkills.length} technologies`}>
                {heroSkills.map((s) => (
                  <li key={s.label}>
                    <span className="tile tile-static" data-label={s.label}>
                      <BrandIcon name={s.icon} className="tile-i" colored sprite />
                      <span className="sr-only">{s.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait-wrap">
            <div className="portrait-card">
              <Portrait priority />
            </div>
            <div className="float float-a">
              <ShieldIcon className="float-i" />
              <span>
                <strong>MSc Cybersecurity</strong>
                <small>Teesside University</small>
              </span>
            </div>
            <div className="float float-b">
              <PaperIcon className="float-i" />
              <span>
                <strong>IEEE published</strong>
                <small>ICEARS 2023</small>
              </span>
            </div>
            <div className="float float-c">
              <span className="status-dot" aria-hidden="true" />
              Open to roles
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Credential strip */}
      <section className="strip" aria-label="Credentials">
        <p className="strip-label">Certified &amp; published with</p>
        <ul className="strip-list">
          {credentials.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------------- About */}
      <Section id="about" eyebrow="About me" title="Builder, engineer, security specialist.">
        <div className="about">
          <div className="prose">
            {profile.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="stats">
            {stats.map((s) => (
              <li key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* -------------------------------------------------------- Services */}
      <Section id="services" eyebrow="Expertise" title="What I do">
        <div className="services">
          <div className="services-visual">
            <CodeCard />
          </div>
          <ol className="service-list">
            {disciplines.map((d) => (
              <li key={d.key} className="service">
                <div className="service-head">
                  <span className="service-icon">
                    <DisciplineIcon k={d.key} />
                  </span>
                  <h3>{d.title}</h3>
                </div>
                <p>{d.line}</p>
                <ul className="dots">
                  {d.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Work */}
      <Section
        id="work"
        eyebrow="Portfolio"
        title="Selected work"
        intro="Products and research I've designed and built — each with security and privacy treated as part of the architecture, not an add-on."
      >
        <ul className="work-grid">
          {projects.map((p) => (
            <li key={p.slug} className="work-card">
              <div className="work-art">
                <ProjectArt slug={p.slug} />
              </div>
              <div className="work-body">
                <p className="work-meta">
                  <span className="work-kind">{p.kind}</span>
                  <span className={`stage phase-${p.phase}`}>{p.stage}</span>
                </p>
                <h3 className="work-name">
                  <Link href={`/work/${p.slug}/`} className="work-link">
                    {p.name}
                  </Link>
                </h3>
                <p className="work-summary">{p.summary}</p>
                <ul className="chips" aria-label="Technology">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="work-cta" aria-hidden="true">
                  View project <ArrowIcon className="i" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- Approach */}
      <Section
        id="approach"
        eyebrow="How I work"
        title="Security by design, in practice"
        intro="Security is analysed while the product is being designed — not handed to a separate team after launch."
      >
        <ol className="steps">
          {approach.map((a, i) => (
            <li key={a.step} className="step">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------ Experience */}
      <Section id="experience" eyebrow="Resume" title="Experience">
        <ol className="timeline">
          {experience.map((r) => (
            <li key={r.org + r.period} className={`tl-item${r.current ? " is-current" : ""}`}>
              <article className="tl-card">
                <header className="tl-head">
                  <div>
                    <h3 className="tl-title">{r.title}</h3>
                    <p className="tl-org">
                      {r.org} · {r.place}
                    </p>
                  </div>
                  <span className={`badge${r.current ? " badge-live" : ""}`}>{r.period}</span>
                </header>
                <p className="tl-summary">{r.summary}</p>
                <ul className="dots">
                  {r.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {/* -------------------------------------------------------- Research */}
      <Section id="research" eyebrow="Education & research" title="Research & credentials">
        <article className="paper">
          <p className="paper-venue">Publication · {publication.venue}</p>
          <h3 className="paper-title">“{publication.title}”</h3>
          <p className="paper-summary">{publication.summary}</p>
          <a className="btn btn-ghost btn-sm" href={doiUrl} rel="noopener noreferrer" target="_blank">
            Read on IEEE Xplore <ArrowIcon className="i" />
          </a>
        </article>

        <div className="edu-grid">
          {education.map((e) => (
            <article key={e.degree} className="edu-card">
              <div className="edu-top">
                <h3>{e.degree}</h3>
                <span className="badge">{e.year}</span>
              </div>
              <p className="edu-school">
                {e.school} · {e.place}
              </p>
              <ul className="chips">
                {e.areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="sub">Certifications &amp; courses</h3>
        <ul className="cert-grid">
          {certifications.map((c) => (
            <li key={c.name} className="cert">
              <span className="cert-issuer">{c.issuer}</span>
              <span className="cert-name">{c.name}</span>
              {c.code && <span className="cert-code">{c.code}</span>}
            </li>
          ))}
        </ul>

        <h3 className="sub">Research interests</h3>
        <ul className="chips chips-lg">
          {researchInterests.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------- Skills */}
      <Section id="skills" eyebrow="Toolbox" title="Skills & technologies">
        <div className="skill-grid">
          {skills.map((s) => (
            <div key={s.group} className="skill-card">
              <h3>{s.group}</h3>
              <ul className="chips">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Contact */}
      <Section id="contact" eyebrow="Contact" title="Let's build something secure.">
        <div className="contact">
          <aside className="contact-card">
            <div className="contact-photo">
              <Portrait photo={site.contactPhoto} />
            </div>
            <h3 className="contact-name">{site.name}</h3>
            <p className="contact-roles">{site.roles.join(" · ")}</p>
            <ul className="contact-lines">
              <li>
                <MailIcon className="i" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <PhoneIcon className="i" />
                  <a href={p.href}>{p.display}</a>
                  <span className="contact-tag">{p.label}</span>
                </li>
              ))}
              <li>
                <PinIcon className="i" />
                {site.location}
              </li>
            </ul>
            <p className="label">Find me on</p>
            <SocialTiles />
          </aside>

          <div className="contact-cta">
            <span className="pill">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </span>
            <p className="cta-intro">
              Hiring for software engineering, security engineering or AI product work — or want to talk about something
              you&apos;re building? Email is the fastest way to reach me.
            </p>
            <p className="contact-email">
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                Send an email
              </a>
              <CopyEmail email={site.email} />
            </div>
            <ul className="cta-phones" aria-label="Phone">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href}>
                    <PhoneIcon className="i" />
                    <span>
                      <small>{p.label}</small>
                      {p.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
