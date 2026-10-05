import Link from "next/link";

export default function NotFound() {
  return (
    <section className="missing">
      <p className="missing-cmd">
        <span className="prompt" aria-hidden="true">$</span> cd ./this-page
      </p>
      <h1 className="missing-title">404 — no such file or directory</h1>
      <p>The page you asked for doesn&apos;t exist, or it has moved.</p>
      <div className="actions">
        <Link className="btn btn-primary" href="/">
          Go to the homepage
        </Link>
        <Link className="btn" href="/#work">
          See selected work
        </Link>
      </div>
    </section>
  );
}
