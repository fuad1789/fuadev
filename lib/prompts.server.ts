import { readFile } from "node:fs/promises";
import path from "node:path";
import { prompts, type LoadedPrompt, type Prompt, type PromptStats } from "./prompts";

/**
 * Server-only half of the prompt library. Kept apart from `prompts.ts` so the
 * client bundle can import the registry and its types without pulling
 * `node:fs` in.
 */

const PROMPTS_DIR = path.join(process.cwd(), "content", "prompts");

function measure(body: string): PromptStats {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return { words, characters: body.length };
}

/**
 * Reads one prompt file. A missing or unreadable file throws with the slug and
 * path in the message so the build fails loudly instead of rendering a blank
 * page in production.
 */
export async function loadPrompt(prompt: Prompt): Promise<LoadedPrompt> {
  const filePath = path.join(PROMPTS_DIR, `${prompt.slug}.md`);

  try {
    const body = await readFile(filePath, "utf8");
    return { ...prompt, body, stats: measure(body) };
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message : "unknown error";
    throw new Error(`Prompt "${prompt.slug}" could not be read from ${filePath}: ${reason}`);
  }
}

export async function loadPrompts(): Promise<LoadedPrompt[]> {
  return Promise.all(prompts.map(loadPrompt));
}
