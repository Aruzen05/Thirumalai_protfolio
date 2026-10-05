import * as simpleIcons from "simple-icons";
import { LOCAL_ICONS } from "@/components/Icons";
import { heroSkills } from "@/content/profile";

// Builds /icons.svg at build time: one SVG sprite holding every skill logo.
// The page references symbols with <use href="/icons.svg#id">, so the (large)
// logo paths are downloaded once and cached instead of being inlined into the
// HTML and the hydration payload.
export const dynamic = "force-static";

type SimpleIcon = { path: string };

export function GET() {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  const symbols = heroSkills
    .map(({ icon }) => {
      const local = LOCAL_ICONS[icon];
      if (local?.outline) {
        return `<symbol id="${icon}" viewBox="0 0 24 24"><path d="${local.d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>`;
      }
      const d = icons[icon]?.path ?? local?.d;
      return d ? `<symbol id="${icon}" viewBox="0 0 24 24"><path d="${d}" fill="currentColor"/></symbol>` : "";
    })
    .join("");

  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
