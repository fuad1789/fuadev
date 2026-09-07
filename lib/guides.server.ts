import { readFile } from "node:fs/promises";
import path from "node:path";
import { guides, type Guide, type GuideStats, type LoadedGuide } from "./guides";
import type { Language } from "./translations";

/**
 * Server-only half of the guide library. Kept apart from `guides.ts` so the
 * client bundle can import the registry and its types without pulling
 * `node:fs` in.
 */

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const LANGUAGES: Language[] = ["az", "en"];

/** Roughly 180 words a minute, floored at one so nothing shows "0 min". */
function measure(body: string): GuideStats {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 180)) };
}

async function readBody(slug: string, language: Language): Promise<string> {
  const filePath = path.join(GUIDES_DIR, `${slug}.${language}.md`);

  try {
    return await readFile(filePath, "utf8");
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message : "unknown error";
    throw new Error(`Guide "${slug}" (${language}) could not be read from ${filePath}: ${reason}`);
  }
}

/**
 * Reads both language files for one guide. A missing file throws with the slug
 * and path in the message so the build fails loudly instead of shipping a page
 * that is blank in one language only.
 */
export async function loadGuide(guide: Guide): Promise<LoadedGuide> {
  const bodies = await Promise.all(
    LANGUAGES.map(async (language) => [language, await readBody(guide.slug, language)] as const),
  );

  const body = Object.fromEntries(bodies) as Record<Language, string>;
  const stats = Object.fromEntries(
    bodies.map(([language, text]) => [language, measure(text)]),
  ) as Record<Language, GuideStats>;

  return { ...guide, body, stats };
}

export async function loadGuides(): Promise<LoadedGuide[]> {
  return Promise.all(guides.map(loadGuide));
}
