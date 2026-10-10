# SEO & GEO playbook

How this portfolio is set up to be found in **search engines** (Google, Bing, DuckDuckGo) and **AI answer engines** (ChatGPT, Perplexity, Claude, Copilot, Gemini and Google AI Overviews), and the off-site steps that only you can do.

**Realistic expectations:** searches for your **name** ("Thirumalai Arumugam", "Thirumalai Arumugam cybersecurity") can start showing the site within days to a few weeks of Google and Bing indexing it. Broad searches like "cybersecurity specialist UK" are very competitive. You'll appear for more specific combinations (name + skill, skill + location, project names), and broad rankings grow over time with content and links from other sites. Nobody can guarantee rankings; anyone selling that, or selling backlinks, should be avoided.

---

## What's built into the site

| Area | What it does |
| --- | --- |
| Page titles & descriptions | Lead with your name and roles; each project page has its own title, description and keywords. |
| Keywords | A curated set in `seo.keywords` in `src/content/profile.ts` (name, roles, roles + location, skills, research, projects). Google ignores the keywords tag itself — the same terms are woven into headings, text and structured data, which is what counts. |
| Structured data (JSON-LD) | A linked graph describing you to machines: website, profile page, **Person** (roles, region, education, 8 credentials, 100 skills, profiles), **IEEE paper** (with DOI), your 6 **projects**, and the **FAQ**. Project pages add breadcrumbs. |
| Quick facts & FAQ section | Short, factual, quotable statements — exactly what AI answer engines extract, and what recruiters skim. |
| `/llms.txt` | A plain-text briefing for AI assistants ([llmstxt.org](https://llmstxt.org)), generated from your content so it never goes stale. |
| `robots.txt` | Explicitly welcomes Google, Bing, Apple, DuckDuckGo and the AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended …). |
| Sitemap | Every page with last-updated dates, plus your photos for image search. |
| Social cards | Large preview image with your photo for LinkedIn, WhatsApp, X etc.; `profile` type with your first/last name. |
| Image search | Descriptive alt text on your photos; Google allowed to show large image previews. |
| Technical | Fast, mobile-friendly, HTTPS, canonical URLs, clean 404s — Lighthouse SEO 100. |

**Confirm one thing:** the site says you're based in **North East England**. If that's not right, change `region` in `site` in `src/content/profile.ts` — it updates every mention.

---

## Showing up when someone searches "Thirumalai Arumugam"

What appears on Google for a name search, and what you can influence:

| On the results page | How it happens |
| --- | --- |
| **Your site as a top result**, with sitelinks to project pages underneath | Google indexes the site and sees it as the official page about you: name in the title, `ProfilePage`/`Person` structured data, canonical URL, links from your profiles. Sitelinks are automatic once the site ranks first for your name. |
| **Your LinkedIn, ResearchGate, IEEE paper** around it | Already exist; linking them all to each other and to the site makes Google group them as the same person. |
| **The "overview" box on the right (Knowledge Panel)** | **Google decides; nobody can switch it on.** It appears once Google is confident you're a distinct, notable person, built from the structured data on this site plus independent sources (Google Scholar, ORCID, LinkedIn, the IEEE listing). Once it appears, click **"Claim this knowledge panel"** at the bottom and verify through this site's Search Console — then you can suggest edits. |

There are other people named Thirumalai Arumugam, so **consistency is what wins**: same name, photo, headline and links everywhere, and every profile linking to `https://thirumalai.aruzen.uk`. The site also declares your published name variants ("Thirumalai A", "A. Thirumalai"), so the IEEE paper is matched to you.

**Optional, strongest independent signal:** a Google Scholar profile and an ORCID iD with the IEEE paper attached (see step 4). Both are sources Google and AI models trust for researchers.

---

## 0. Right after deploying a domain change — Search Console

1. **Sitemaps:** remove any sitemap that points to an old address, then submit `https://thirumalai.aruzen.uk/sitemap.xml`.
2. **URL Inspection:** inspect `https://thirumalai.aruzen.uk/` → **Test live URL** → confirm "URL is available to Google" and that the **user-declared canonical** is `https://thirumalai.aruzen.uk/` → **Request indexing**. Repeat for the six `/work/…/` pages.
3. Expect the home page to appear for your name within a few days to two weeks. **Pages → Indexing** in Search Console shows progress.

---

## 1. Cloudflare — don't block the AI engines (do this first)

Cloudflare blocks AI crawlers by default on many newer domains, which would make you invisible to ChatGPT, Claude and Perplexity no matter what the site says.

In the Cloudflare dashboard, select **aruzen.uk**, then:

1. **AI Crawl Control** (or **Security → Bots**): make sure **Block AI bots** is **off**, and that AI *search* crawlers (OpenAI, Anthropic, Perplexity, Google) are **allowed**.
2. Turn **off** "**Manage your robots.txt**" / "Instruct AI bot traffic with robots.txt" if it's on — it adds its own blocking rules on top of the site's `robots.txt`.
3. **Caching → Configuration → Crawler Hints: On.** Cloudflare then notifies Bing and others (via IndexNow) whenever the site changes, so updates are picked up quickly.

Check afterwards: open `https://thirumalai.aruzen.uk/robots.txt` — it should match the site's own file (a list of crawlers, `Allow: /`, then the sitemap line) with no extra `Disallow` rules.

---

## 2. Google Search Console

1. Go to <https://search.google.com/search-console> → **Add property** → **Domain** → `aruzen.uk` (covers the subdomain too).
2. Verify with the **TXT record** it gives you: add it in Cloudflare under **DNS → Records** (or use the one-click Cloudflare option if offered).
3. **Sitemaps** → submit `https://thirumalai.aruzen.uk/sitemap.xml`.
4. **URL Inspection** → paste `https://thirumalai.aruzen.uk/` → **Request indexing**.
5. Optional: test the structured data at <https://search.google.com/test/rich-results> (expect Profile page, Breadcrumbs, FAQ).

## 3. Bing Webmaster Tools — this is what powers ChatGPT search

ChatGPT search, Microsoft Copilot and DuckDuckGo lean heavily on Bing's index.

1. Go to <https://www.bing.com/webmasters> → sign in → **Import from Google Search Console** (fastest), or add the site and verify via DNS.
2. Submit the sitemap: `https://thirumalai.aruzen.uk/sitemap.xml`.
3. Use **URL Submission** for the home page.

---

## 4. Make every profile point to the same "you"

Search engines and AI models decide who you are by matching the **same name, photo, headline and links** across sites. The site's structured data lists your profiles as `sameAs`; make sure each of them links back.

| Profile | Do this |
| --- | --- |
| **LinkedIn** | Contact info → **Website** → add the portfolio. Add it to **Featured** too. Use the same headline: *Software Engineer · Cybersecurity Specialist · AI Product Developer*. |
| **ResearchGate** | Add the portfolio URL to your profile; make sure the IEEE paper is listed on it. |
| **Google Scholar** | Create a profile at <https://scholar.google.com/citations>, claim the IEEE ICEARS 2023 paper, add the portfolio as homepage. Then put the profile URL in `links.googleScholar` in `profile.ts`. |
| **ORCID** | Free researcher ID at <https://orcid.org> — add the paper (import by DOI) and the website. Put the ORCID URL in `links.orcid`. Strong identity signal for AI engines. |
| **GitHub** | Add the website to your GitHub profile; consider a profile README. Put the URL in `links.github` and a GitHub tile appears on the site. |
| **Microsoft certifications** | Share your Microsoft Learn transcript or Credly badges on LinkedIn (Licenses & certifications) with the credential URLs. |
| **CV & email signature** | Use the portfolio URL everywhere you previously used aruzen.uk. |

Every link you add to `site.links` in `profile.ts` is automatically included in the structured data — rebuild and push after adding them.

---

## 5. Grow over time (optional, highest long-term impact)

- **Write about your work.** A short case study per project (e.g. "Designing continuous authentication with on-device face verification and WebAuthn", "Security-by-design in a NestJS booking platform") targets the specific searches recruiters and engineers actually make. Ask me to add a **Writing / Case studies** section when you're ready.
- **Share it.** Post on LinkedIn when you publish something, linking to the page. Links from real profiles and communities are what lift rankings for competitive terms.
- **Keep facts identical** across the site, LinkedIn and your CV — inconsistent titles or dates confuse both search engines and AI models.

---

## 6. Check how you appear (after 2–6 weeks)

- **Google:** search `Thirumalai Arumugam`, and `site:thirumalai.aruzen.uk` to see what's indexed. Search Console → **Performance** shows the exact searches you appear for.
- **AI engines:** ask ChatGPT (with search on), Perplexity, Copilot and Gemini: *"Who is Thirumalai Arumugam?"* and *"Thirumalai Arumugam cybersecurity portfolio"*. The answers should echo the site's FAQ.
- **Social preview:** <https://www.linkedin.com/post-inspector/> with the site URL.

If an AI answer is wrong or outdated, update the site and your profiles — engines refresh from the web over time.

---

## Updating SEO content

Everything lives in `src/content/profile.ts`:

- `seo.title`, `seo.description`, `seo.keywords` — search snippet and keywords.
- `site.region`, `site.links` — location and profile links.
- `quickFacts`, `faq` — the Quick facts & FAQ section, its structured data and `llms.txt`.

Keep everything factual — these are the lines Google and AI assistants will repeat about you. Then commit and push; Cloudflare redeploys automatically.
