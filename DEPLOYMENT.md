# Going live: GitHub → Cloudflare → your domain

A step-by-step guide to publishing this portfolio. Commands are for **PowerShell on Windows**, run from the project folder (`D:\Aruzen Website\Portfolio`).

**What you'll end up with:** the code in a private GitHub repository, and every `git push` automatically built and deployed by Cloudflare to your own domain over HTTPS. Hosting is free on Cloudflare's Workers free plan; the only cost is your domain renewal.

---

## Before you start

You need:

- A **GitHub** account — <https://github.com/signup>
- A **Cloudflare** account (Free plan) — <https://dash.cloudflare.com/sign-up>
- Your **domain** and the login for the company you bought it from (the "registrar")

---

## Step 1 — Set your domain in the site

The site uses its own address for canonical links, the sitemap, `robots.txt` and the social-media preview card, so set it first.

1. Open `src/content/profile.ts`.
2. Change `url` near the top to your domain, with `https://` and no trailing slash:

   ```ts
   url: "https://your-domain.com",
   ```

3. Build and preview locally to make sure everything still works:

   ```powershell
   pnpm build
   pnpm preview
   ```

   Open <http://localhost:8787>, click around, then press `Ctrl + C` to stop.

---

## Step 2 — Pre-launch checklist (things only you can confirm)

I've handled the technical and policy items (see "What's already done" at the end). These need your judgement before going public:

- [ ] **Photo rights.** Professional headshots are usually the photographer's copyright, licensed to you. Check your licence allows use on a personal website. For the illustrated portrait, check the terms of the artist or the AI tool that made it.
- [ ] **Phone numbers.** Both numbers will be public and can be harvested by spammers and scam callers. Keep them, remove the India number, or use a separate number — edit `site.phones` in `profile.ts`.
- [ ] **Employer and project details.** Listing your Amazon roles is normal, but check your employer's social-media / outside-activity policy, and don't add internal metrics or confidential detail. For any project built with or for another organisation (e.g. Dhyana Stays), confirm you're happy to describe it publicly.
- [ ] **Email inbox works.** Send a test message to `thirumalai@aruzen.uk` and confirm it arrives — that address is used across the site, in the privacy notice and in `security.txt`.
- [ ] **ICO data protection fee.** A personal portfolio that collects no data is very likely exempt, but take the 2-minute check: <https://ico.org.uk/for-organisations/data-protection-fee/self-assessment/>. If you start offering paid services through the site, re-check and add your business details.

> This checklist is practical guidance, not legal advice.

---

## Step 3 — Put the code on GitHub

### 3.1 Create the local repository

```powershell
git init -b main
git add .
git status
```

Read the `git status` list before committing. It should **not** include `node_modules`, `.next`, `out`, `.wrangler` or any `.env` file — `.gitignore` already excludes them. There are no secrets in this project; everything in it is already public on the website.

```powershell
git commit -m "Initial commit: portfolio site"
```

### 3.2 Create an empty repository on GitHub

1. Go to <https://github.com/new>.
2. **Repository name:** `aruzen-portfolio` (any name works).
3. **Visibility:** **Private** recommended. (Public also works if you want the code to be part of your portfolio — nothing in it is secret.)
4. **Leave everything else unticked** — no README, no `.gitignore`, no licence. The repository must be empty.
5. Click **Create repository**.

### 3.3 Push your code

Replace `<your-username>` with your GitHub username:

```powershell
git remote add origin https://github.com/<your-username>/aruzen-portfolio.git
git push -u origin main
```

The first push opens a browser window to sign in to GitHub (Git Credential Manager). Refresh the GitHub page afterwards — your files should be there.

---

## Step 4 — Host it on Cloudflare (auto-deploys from GitHub)

### 4.1 Connect the repository

1. Sign in to <https://dash.cloudflare.com>.
2. Go to **Workers & Pages** → **Create** → **Import a repository**.
3. Click **Connect GitHub**, sign in, and allow the Cloudflare app access to your `aruzen-portfolio` repository (choosing "only select repositories" is fine).
4. Select the repository.

### 4.2 Build settings

| Setting | Value |
| --- | --- |
| Project name | `aruzen-portfolio` — **must match** `name` in `wrangler.toml` |
| Production branch | `main` |
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` (the default) |
| Root directory | leave blank |

Node and pnpm versions are picked up automatically from `.node-version` and `package.json`.

Click **Create and deploy**. The first build takes 2–4 minutes; you can watch the log.

### 4.3 Check the preview address

When it finishes, Cloudflare shows a `https://aruzen-portfolio.<your-account>.workers.dev` address. Open it and check the home page, a project page and `/privacy/`.

> **Manual alternative:** you can also deploy straight from your PC with `npx wrangler login` once, then `pnpm run deploy`. With the GitHub connection, you never need to.

---

## Step 5 — Connect your domain

### 5.1 Move the domain's DNS to Cloudflare (skip if it's already in your Cloudflare account)

If you bought the domain somewhere else (GoDaddy, Namecheap, 123-reg, IONOS, etc.):

1. In Cloudflare, click **Add a domain** (top of the dashboard home), enter your domain, choose the **Free** plan.
2. Cloudflare imports your existing DNS records. **Keep any `MX` and `TXT` records** if the domain has email. You can delete old website records (`A`, `AAAA`, `CNAME` for `@` and `www`).
3. Cloudflare shows **two nameservers** (like `xxx.ns.cloudflare.com`).
4. At your registrar: if **DNSSEC** is on, turn it off first. Then replace the domain's nameservers with Cloudflare's two.
5. Wait for Cloudflare to email you that the domain is **Active** — usually under an hour, occasionally up to 24 hours.

### 5.2 Attach the domain to the site

1. **Workers & Pages** → **aruzen-portfolio** → **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
2. Enter `your-domain.com` → **Add domain**.
3. Repeat for `www.your-domain.com`.

Cloudflare creates the DNS records and HTTPS certificate automatically (a few minutes). If it says a DNS record already exists for that name, delete that record under **DNS → Records** and try again.

> **Using a subdomain** (this site lives at `thirumalai.aruzens.com`): add exactly that name as the custom domain, and skip `www` and Step 5.3 — they only apply to a bare domain.
>
> Choose **Custom domain**, not **Route**. A route doesn't create a DNS record, so the address won't exist and browsers show `DNS_PROBE_FINISHED_NXDOMAIN`.

### 5.3 Send `www` to the main address

**Rules** → **Create rule** → **Redirect Rules** → use the template **Redirect from WWW to Root** → **Deploy**. Now `www.your-domain.com` redirects to `your-domain.com`, so search engines see one address.

### 5.4 Recommended Cloudflare settings for the domain

Under **SSL/TLS → Edge Certificates**:

- **Always Use HTTPS:** On
- **Minimum TLS Version:** TLS 1.2
- **Automatic HTTPS Rewrites:** On
- **HSTS:** leave **off** here — the site already sends its own HSTS header, and doubling it up causes conflicts.

**Leave these OFF** — they inject or rewrite scripts, which the site's Content Security Policy will (correctly) block, and they would contradict the "no tracking" privacy notice:

- **Rocket Loader** (Speed → Optimization)
- **Web Analytics automatic setup / Zaraz**
- **Email Address Obfuscation** (Scrape Shield)

---

## Step 6 — After it's live

1. **Visit** `https://your-domain.com` — check the padlock, the home page, a project page, `/privacy/`, `/sitemap.xml` and `/.well-known/security.txt`.
2. **Security headers:** <https://securityheaders.com> — expect **A** or **A+**.
3. **Speed:** <https://pagespeed.web.dev>.
4. **Link previews:** paste your URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to check the preview card (it also refreshes LinkedIn's cache).
5. **Google:** add the domain in [Google Search Console](https://search.google.com/search-console) (choose "Domain", verify with the DNS TXT record in Cloudflare), then submit `https://your-domain.com/sitemap.xml`.
6. **Update your profiles:** add the URL to your LinkedIn, CV, ResearchGate and email signature.

---

## Updating the site later

```powershell
pnpm dev                     # make and check your changes at http://localhost:3000
git add .
git commit -m "Describe the change"
git push
```

Cloudflare rebuilds and deploys automatically in 2–3 minutes. To undo a bad deploy: **Workers & Pages → aruzen-portfolio → Deployments** → pick an earlier one → **Rollback**.

**Yearly:** renew the `Expires` date in `public/.well-known/security.txt` (currently 5 October 2027), and run `pnpm update` then `pnpm audit` to pick up security fixes.

---

## If something goes wrong

| Problem | Fix |
| --- | --- |
| Build fails: Worker name doesn't match | The Cloudflare project name must be `aruzen-portfolio`, the same as `name` in `wrangler.toml`. |
| Build fails fetching fonts | Fonts are downloaded from Google at build time; it's usually a temporary network blip — click **Retry build**. |
| Chrome: `DNS_PROBE_FINISHED_NXDOMAIN` / "This site can't be reached" | The address has no DNS record: add it under **Settings → Domains & Routes → Add → Custom domain** (not a Route). Afterwards run `ipconfig /flushdns` and wait a few minutes — a "not found" answer can be cached for up to 30 minutes. |
| "DNS record already exists" when adding the domain | Delete the existing `A` / `AAAA` / `CNAME` record for that name under **DNS → Records**, then add the custom domain again. |
| Domain stuck on "Pending" | Nameservers haven't changed yet at the registrar, or DNSSEC is still on there. |
| Console shows "Content Security Policy" errors | A Cloudflare feature is injecting scripts — turn off Rocket Loader, Zaraz and automatic Web Analytics (Step 5.4). |
| Old version still showing | Hard refresh (`Ctrl + F5`); if needed, **Caching → Configuration → Purge Everything**. |

---

## What's already done (production verification)

Checked on the final build before writing this guide:

- **Build:** TypeScript and production build pass cleanly.
- **Dependencies:** `pnpm audit` — no known vulnerabilities.
- **Security headers on every route:** strict per-page Content Security Policy (hash-only scripts, no `unsafe-inline`), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP. 404s return a real 404.
- **Accessibility:** axe-core automated audit — 0 violations on every page, in light and dark themes and on mobile. Keyboard navigation, skip link, focus styles, screen-reader labels and reduced-motion support in place.
- **Lighthouse:** Accessibility 100, Best Practices 100, SEO 100 (mobile and desktop); Performance 99 desktop, ~76 on Lighthouse's simulated slow phone (the remaining cost is the Next.js/React runtime itself).
- **Responsive:** tested from 360 px phones to 3440 px ultrawide — no horizontal scrolling, no console errors.
- **Links:** DOI resolves to the IEEE Xplore paper; LinkedIn and ResearchGate URLs match the ones you supplied (both sites block automated checks).

**Ethical and legal items handled:**

- **Privacy notice** at `/privacy/` (UK GDPR / Data Protection Act 2018): who runs the site, what Cloudflare processes, theme storage, how contact details are used, retention, your visitors' rights and the ICO complaint route. Linked from the footer.
- **No cookie banner needed:** the site sets no cookies and has no analytics or tracking. The only thing stored is the light/dark choice, in the visitor's own browser, and only when they use the switch.
- **`security.txt`** (RFC 9116) so security researchers know how to reach you.
- **Accurate claims:** Cisco items are labelled as Cisco Networking Academy course certificates rather than implying full Cisco certifications; all project technologies were checked against the actual code.
- **Trademarks:** technology logos come from Simple Icons and are used only to name skills (no endorsement implied). The "Certified & published with" row uses plain text, not organisations' logos.
