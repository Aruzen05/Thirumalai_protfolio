import Link from "next/link";
import { site } from "@/content/profile";
import { MailIcon } from "./Icons";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";

export const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#research", label: "Research" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [first] = site.name.split(" ");
  return (
    <header className="bar">
      <div className="bar-inner">
        <Link href="/" prefetch={false} className="brand" aria-label={`${site.name} — home`}>
          <img className="brand-mark" src={site.avatar} alt="" width={40} height={40} />
          <span className="brand-name">
            {first}
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="bar-end">
          <a className="bar-mail" href={`mailto:${site.email}`}>
            <MailIcon className="i" />
            <span>{site.email}</span>
          </a>
          <ThemeToggle />
          <NavMenu items={navItems} />
        </div>
      </div>
      <div className="progress" aria-hidden="true" />
    </header>
  );
}
