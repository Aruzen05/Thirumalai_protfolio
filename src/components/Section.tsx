// A home-page section: small uppercase eyebrow, large title, optional intro.
export function Section({
  id,
  eyebrow,
  title,
  intro,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`section ${className ?? ""}`} aria-labelledby={`${id}-title`}>
      <header className="section-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {intro && <p className="section-intro">{intro}</p>}
      </header>
      {children}
    </section>
  );
}
