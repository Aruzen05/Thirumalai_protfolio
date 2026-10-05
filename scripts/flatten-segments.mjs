// Post-build step: make Next's segment-prefetch files reachable on a static host.
//
// For nested routes, `next build` with `output: "export"` writes prefetch data as
// directories (work/x/__next.work/$d$slug/__PAGE__.txt) while the client router
// requests the dotted flat name (work/x/__next.work.$d$slug.__PAGE__.txt).
// Copy each nested file to its flat name so prefetches resolve instead of 404ing.

import { copyFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) await flatten(path, dir);
    else await walk(path);
  }
}

async function flatten(segmentDir, parent) {
  for (const entry of await readdir(segmentDir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile()) continue;
    const file = join(entry.parentPath, entry.name);
    const flatName = relative(parent, file).split(sep).join(".");
    await copyFile(file, join(parent, flatName));
    copied++;
  }
}

await walk(OUT);
console.log(`flatten-segments: ${copied} prefetch file(s) copied to flat names`);
