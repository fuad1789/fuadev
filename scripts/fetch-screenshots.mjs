#!/usr/bin/env node
/**
 * Fetches live screenshots for all projects + demos via Microlink API
 * and saves them into public/screenshots/.
 *
 * Run once when you want fresh screenshots:
 *   npm run screenshots
 *
 * Free tier: 50 requests/day. We have ~16 URLs, so well within limit.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "screenshots");

// `manual: true` — keep the existing public/screenshots/<file> as-is.
// Use it for sites where auto-capture misses content (loaders, auth walls,
// custom cursor states, etc.) and you want to preserve a hand-picked image.
const TARGETS = [
  { url: "https://azeri.edu.az", file: "azeri-edu.png" },
  { url: "https://payla.az", file: "paylaaz.png", manual: true },
  { url: "https://karyera.sdu.edu.az", file: "sdukaryera.png" },
  { url: "https://unim.az", file: "unimaz.png", manual: true },
  { url: "https://github.com/fuad1789/Loyaltybar", file: "loyaltybar.png", manual: true },
  { url: "https://sustainability.sdu.edu.az", file: "dayaniqli-inkisaf.png" },
  { url: "https://oksigen-seven.vercel.app/", file: "oksigen.png" },
  { url: "https://megadent.vercel.app/", file: "megadent.png" },
  { url: "https://nabran-emlak.vercel.app/", file: "nabran.jpg" },
  { url: "https://villabaku-az.vercel.app/", file: "villabaku.png" },
  { url: "https://zaman-kurslari.vercel.app/", file: "zaman.png" },
  { url: "https://bfc-kurslari.vercel.app/", file: "bfc.png" },
  { url: "https://qafqaz-tedris-merkezi.vercel.app/", file: "qafqaz.png" },
  { url: "https://oxutedris-az.vercel.app/", file: "oxutedris.png" },
  { url: "https://boomberry-az.vercel.app/", file: "boomberry.png", manual: true },
];

const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
const TIMEOUT_MS = 60_000;

function buildMicrolinkUrl(targetUrl, waitFor) {
  const params = new URLSearchParams({
    url: targetUrl,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": String(VIEWPORT_WIDTH),
    "viewport.height": String(VIEWPORT_HEIGHT),
    waitUntil: "networkidle0",
  });
  if (waitFor) {
    params.set("waitFor", String(waitFor));
  }
  return `https://api.microlink.io/?${params.toString()}`;
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchScreenshot({ url, file, waitFor }) {
  const apiUrl = buildMicrolinkUrl(url, waitFor);
  process.stdout.write(`→ ${url} ${waitFor ? `(waitFor ${waitFor}ms) ` : ""}... `);

  const res = await fetchWithTimeout(apiUrl, TIMEOUT_MS);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  // embed mode returns the binary image directly
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = path.join(OUT_DIR, file);
  await writeFile(outPath, buf);
  console.log(`saved ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true });
  }

  console.log(`Fetching ${TARGETS.length} screenshots → ${OUT_DIR}\n`);

  let ok = 0;
  let fail = 0;
  let skipped = 0;
  for (const t of TARGETS) {
    if (t.manual) {
      console.log(`→ ${t.url} ... skipped (manual)`);
      skipped++;
      continue;
    }
    try {
      await fetchScreenshot(t);
      ok++;
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} saved, ${skipped} skipped, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
