import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export const dynamic = "force-static";

// Search and AI answer-engine crawlers, explicitly welcomed so the portfolio
// can appear in Google, Bing, ChatGPT search, Claude, Perplexity, Apple and
// DuckDuckGo answers. ("*" already allows everyone; naming them makes the
// intent unambiguous if a host or tool adds its own defaults.)
const crawlers = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "DuckDuckBot",
  "DuckAssistBot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: crawlers, allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
