import Link from "next/link";
import { site } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [first] = site.name.split(" ");
  return (
    <footer className="foot">
      <div className="foot-inner">
        <Link href="/" prefetch={false} className="brand" aria-label={`${site.name} — home`}>
          <img className="brand-mark" src={site.avatar} alt="" width={40} height={40} />
          <span className="brand-name">
            {first}
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <p className="colophon">
          © {year} {site.name} · Static site on Cloudflare · strict CSP · no cookies, trackers or third-party scripts
        </p>
        <nav className="foot-links" aria-label="Footer">
          <Link href="/privacy/">Privacy</Link>
          <a href="/#main">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
