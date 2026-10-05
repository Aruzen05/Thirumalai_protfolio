import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArt } from "@/components/ProjectArt";
import { projects, site } from "@/content/profile";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      locale: "en_GB",
      siteName: site.name,
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}/`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="project">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">~</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#work">work</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.slug}</span>
      </nav>

      <header className="project-head">
        <div className="project-head-text">
          <p className="project-meta">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.kind}</span>
            <span className={`stage phase-${project.phase}`}>{project.stage}</span>
          </p>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-lede">{project.summary}</p>
          <ul className="chips chips-lg" aria-label="Technology">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="project-art">
          <ProjectArt slug={project.slug} />
        </div>
      </header>

      <div className="project-grid">
        <div className="prose project-prose">
          {project.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        {project.security && (
          <aside className="secure" aria-labelledby="secure-title">
            <h2 id="secure-title" className="secure-title">
              Security &amp; privacy
            </h2>
            <ul className="ticks">
              {project.security.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {project.sections.map((section) => (
        <section key={section.title} className="project-section">
          <h2 className="sub">{section.title}</h2>
          <ul className="ticks ticks-cols">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <nav className="pager" aria-label="More work">
        <Link href={`/work/${prev.slug}/`} className="pager-link">
          <span className="pager-dir">← previous</span>
          <span className="pager-name">{prev.name}</span>
        </Link>
        <Link href={`/work/${next.slug}/`} className="pager-link pager-next">
          <span className="pager-dir">next →</span>
          <span className="pager-name">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
