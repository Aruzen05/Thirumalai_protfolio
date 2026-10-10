import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { seo, site } from "@/content/profile";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Only used for the code card and small technical labels.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const [firstName, ...rest] = site.name.split(" ");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s | ${site.name}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName,
    lastName: rest.join(" "),
    locale: "en_GB",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Let Google show large image previews and full-length snippets
  // (also used by AI Overviews and Discover).
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    ...(seo.verification.google && { google: seo.verification.google }),
    ...(seo.verification.bing && { other: { "msvalidate.01": seo.verification.bing } }),
  },
  // Location signals for regional search engines.
  other: {
    "geo.region": "GB-ENG",
    "geo.placename": `${site.region}, ${site.location}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Runs before first paint so a saved dark theme never flashes light.
// Its hash is added to the page's Content-Security-Policy at build time.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="frame">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
