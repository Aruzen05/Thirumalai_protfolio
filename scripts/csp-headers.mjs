// Post-build step: writes out/_headers for Cloudflare.
//
// Next.js static export inlines small bootstrap scripts into every page, which
// would normally force `script-src 'unsafe-inline'`. Instead, this hashes each
// page's inline scripts and emits a per-page Content-Security-Policy that
// allows exactly those scripts and nothing else.

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
const MAX_LINE = 2000; // Cloudflare's per-line limit for _headers

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!body || /\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
    // Data blocks such as JSON-LD are never executed, so CSP doesn't apply to them.
    if (type && type !== "module" && type !== "text/javascript") continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  return [...hashes].sort();
}

// out/index.html -> "/", out/work/x/index.html -> "/work/x/".
// Other files (404.html) are served for unknown paths and have no route of their own.
function routeFor(file) {
  const rel = relative(OUT, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html") && !rel.startsWith("404/") && !rel.startsWith("_")) {
    return `/${rel.slice(0, -"index.html".length)}`;
  }
  return null;
}

function contentSecurityPolicy(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

const blocks = [
  [
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  X-Frame-Options: DENY",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    "  Strict-Transport-Security: max-age=31536000",
    "  Cross-Origin-Opener-Policy: same-origin",
    "  Cross-Origin-Resource-Policy: same-origin",
  ].join("\n"),
  ["/_next/static/*", "  Cache-Control: public, max-age=31536000, immutable"].join("\n"),
  // Next exports the generated social card without a file extension.
  ["/opengraph-image", "  Content-Type: image/png"].join("\n"),
];

const pages = [];
for await (const file of htmlFiles(OUT)) {
  const route = routeFor(file);
  if (!route) continue;
  const hashes = inlineScriptHashes(await readFile(file, "utf8"));
  const line = `  Content-Security-Policy: ${contentSecurityPolicy(hashes)}`;
  if (line.length > MAX_LINE) {
    throw new Error(`CSP for ${route} is ${line.length} chars, over Cloudflare's ${MAX_LINE}-char line limit.`);
  }
  pages.push({ route, count: hashes.length });
  blocks.push(`${route}\n${line}`);
}

await writeFile(join(OUT, "_headers"), `${blocks.join("\n\n")}\n`);

console.log(`\n_headers: CSP written for ${pages.length} pages`);
for (const p of pages.sort((a, b) => a.route.localeCompare(b.route))) {
  console.log(`  ${p.route.padEnd(36)} ${p.count} inline script hash(es)`);
}
