import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/profile";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name}'s website handles personal data: no cookies, no tracking, and what happens if you get in touch.`,
  alternates: { canonical: "/privacy/" },
};

const UPDATED = "5 October 2026";

export default function PrivacyPage() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <article className="legal">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">~</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">privacy</span>
      </nav>

      <header className="legal-head">
        <p className="eyebrow">Legal</p>
        <h1 className="legal-title">Privacy notice</h1>
        <p className="legal-updated">Last updated {UPDATED}</p>
      </header>

      <div className="legal-body">
        <p className="legal-lede">
          This notice explains what personal data is processed when you visit this website, and the rights you have. The
          site is run by {site.name}, based in the {site.location}, who is the controller of that data under UK data
          protection law (the UK GDPR and the Data Protection Act 2018). You can contact me at {mail}.
        </p>

        <section className="legal-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">The short version</h2>
          <ul className="ticks">
            <li>This site sets no cookies and uses no analytics, advertising or tracking tools.</li>
            <li>There are no forms and no accounts. I don&apos;t collect anything from you while you browse.</li>
            <li>My hosting provider processes basic technical data so the site can be delivered and protected.</li>
            <li>If you email or phone me, I use your details only to reply.</li>
          </ul>
        </section>

        <section aria-labelledby="hosting-title">
          <h2 id="hosting-title">1. When you visit the site</h2>
          <p>
            The site is hosted on Cloudflare. To deliver each page, Cloudflare necessarily processes technical
            information about your request: your IP address, browser and device type, the page requested, and the date
            and time. It also uses this information to protect the site from attacks and abuse.
          </p>
          <p>
            Cloudflare acts as my service provider. I don&apos;t use this information to identify visitors, build
            profiles or for marketing. The lawful basis is my legitimate interest in running a secure, working website.
            If Cloudflare needs to check that traffic isn&apos;t automated, it may set a strictly necessary security
            cookie; it is not used for tracking. See{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank">
              Cloudflare&apos;s privacy policy
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="theme-title">
          <h2 id="theme-title">2. Your light/dark theme choice</h2>
          <p>
            If you use the theme switch, your choice is saved in your own browser&apos;s local storage so the site
            remembers it next time. It stays on your device, is never sent to me, and you can clear it at any time through
            your browser settings. Nothing is stored unless you use the switch.
          </p>
        </section>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title">3. If you contact me</h2>
          <p>
            If you email or phone me, I receive the details you choose to share, such as your name, email address, phone
            number and message. I use them only to respond and to discuss the opportunity or question you raised. The
            lawful basis is my legitimate interest in replying to you, or taking steps at your request before entering
            into a contract (for example, a job opportunity).
          </p>
          <p>
            I don&apos;t sell or share your details, except where the law requires it. My email and phone providers
            store messages on my behalf. I keep correspondence only for as long as it is needed and normally delete it
            within 24 months of our last contact, unless we have an ongoing working relationship.
          </p>
        </section>

        <section aria-labelledby="links-title">
          <h2 id="links-title">4. Links to other websites</h2>
          <p>
            This site links to LinkedIn, ResearchGate and IEEE Xplore. Those sites are run by other organisations and
            have their own privacy policies, which apply when you visit them.
          </p>
        </section>

        <section aria-labelledby="transfers-title">
          <h2 id="transfers-title">5. International transfers</h2>
          <p>
            Cloudflare operates a global network, so technical data about your visit may be processed outside the UK.
            Cloudflare provides safeguards for international transfers that are recognised under UK law, as described in
            its privacy policy.
          </p>
        </section>

        <section aria-labelledby="rights-title">
          <h2 id="rights-title">6. Your rights</h2>
          <p>
            You have the right to ask for a copy of your personal data, and to ask me to correct it, delete it, restrict
            or object to how it is used, or transfer it to you. To make a request, email {mail}. I will respond within
            one month. Please note that I generally cannot identify you from hosting data alone.
          </p>
        </section>

        <section aria-labelledby="complaints-title">
          <h2 id="complaints-title">7. Complaints</h2>
          <p>
            If you are unhappy with how your data has been handled, please contact me first so I can put it right. You
            also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK&apos;s data
            protection regulator, at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer" target="_blank">
              ico.org.uk/make-a-complaint
            </a>{" "}
            or on 0303 123 1113.
          </p>
        </section>

        <section aria-labelledby="changes-title">
          <h2 id="changes-title">8. Changes to this notice</h2>
          <p>
            If anything changes, for example if I add analytics or a contact form, I will update this notice and the
            date at the top of the page.
          </p>
        </section>
      </div>
    </article>
  );
}
