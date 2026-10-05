# Thirumalai Arumugam — portfolio

Personal portfolio for Thirumalai Arumugam. Next.js (App Router) exported as a fully static site and served from Cloudflare.

**Going live:** follow [DEPLOYMENT.md](DEPLOYMENT.md) — GitHub, Cloudflare hosting, custom domain, and the pre-launch checklist.

## Editing content

Everything the site says lives in [`src/content/profile.ts`](src/content/profile.ts): profile, projects, experience, research, education, certifications and skills. Add a project to the `projects` array and its page at `/work/<slug>/` is generated automatically.

- **Site address:** `site.url` — used for canonical links, the sitemap, `robots.txt` and the social preview card. Set it to your live domain before deploying.
- **Contact:** `site.email`, `site.phones` and `site.links` (LinkedIn, ResearchGate, GitHub). Empty links are hidden.
- **Hero skill icons:** `heroSkills` — each `icon` is a [simple-icons](https://simpleicons.org) export name (e.g. `siPython`), or `cloud` / `database` for the two drawn locally. The icons are bundled into one cached file, `/icons.svg`, at build time.

**Photos:**

| File | Used for |
| --- | --- |
| `public/profile.webp` | Hero portrait |
| `public/profile-contact.webp` | Contact card |
| `public/avatar.webp` | Round brand icon in the header and footer (from the illustrated portrait) |
| `src/app/icon.png`, `src/app/apple-icon.png` | Browser tab icon and iPhone home-screen icon |
| `src/assets/og-photo.jpg` | Photo on the social-media preview card |

To swap a photo, replace the file and update its `width`/`height` in `site.photo` / `site.contactPhoto` in `profile.ts`. If a photo file is missing, the page falls back to a "TA" monogram.

**Accent colour:** change `--accent` (and `--accent-hover`, `--accent-soft`) at the top of [`src/app/globals.css`](src/app/globals.css).

**Privacy notice:** [`src/app/privacy/page.tsx`](src/app/privacy/page.tsx). Update it (and its "Last updated" date) if you ever add analytics, a contact form or anything else that collects data.

**Security contact:** [`public/.well-known/security.txt`](public/.well-known/security.txt). Renew its `Expires` date before 5 October 2027.

## Commands

```sh
pnpm install
pnpm dev        # local dev server at http://localhost:3000
pnpm build      # static export to ./out + generates ./out/_headers
pnpm preview    # serve ./out through Wrangler at http://localhost:8787, with the real headers
pnpm deploy     # build + wrangler deploy (manual deploy from this PC)
pnpm typecheck  # TypeScript check
```

## Security headers

`pnpm build` runs two post-build steps:

- [`scripts/flatten-segments.mjs`](scripts/flatten-segments.mjs) copies Next.js prefetch files to the names the client router requests, so prefetching works on a static host.
- [`scripts/csp-headers.mjs`](scripts/csp-headers.mjs) hashes every inline script Next.js writes into each page and emits a per-page `Content-Security-Policy` in `out/_headers`, so scripts are restricted to `'self'` plus those exact hashes — no `'unsafe-inline'`. It also sets HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and COOP/CORP for every path.

The site loads no third-party scripts, fonts or trackers and sets no cookies: fonts are self-hosted by `next/font` at build time.
