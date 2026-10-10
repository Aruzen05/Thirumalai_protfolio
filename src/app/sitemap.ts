import type { MetadataRoute } from "next";
import { projects, site } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time = when the content last changed (the site is rebuilt on every edit).
  const lastModified = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}${site.photo.src}`, `${site.url}${site.contactPhoto.src}`],
    },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/privacy/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
