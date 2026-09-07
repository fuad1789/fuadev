/**
 * A deliberately tiny Markdown reader for the prompt and guide libraries.
 *
 * The default mode is what the prompts need: headings, dividers, bullet and
 * numbered lists, bold spans and paragraphs. A full Markdown dependency would
 * cost more than it returns, and anything this parser does not recognise
 * degrades to a plain paragraph, never to a thrown error, because the raw text
 * stays available through the copy button either way.
 *
 * Guides pass `{ rich: true }` to also get inline code, links and fenced code
 * blocks. That mode is opt-in so a backtick inside a prompt keeps rendering as
 * a literal backtick, exactly as it does when it is pasted into a model.
 */

export type InlineSpan =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; href: string };

export type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3; spans: InlineSpan[] }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] }
  | { type: "code"; text: string }
  | { type: "divider" };

export interface ParseOptions {
  /** Enables inline code, links and fenced code blocks. Off for prompts. */
  rich?: boolean;
}

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;
const BULLET_PATTERN = /^[-*]\s+(.*)$/;
const ORDERED_PATTERN = /^\d+[.)]\s+(.*)$/;
const DIVIDER_PATTERN = /^(-{3,}|_{3,}|\*{3,})$/;
const FENCE_PATTERN = /^\s*```/;

/** Bold, inline code and links in one pass. Unmatched markers stay literal. */
function parseRichInline(line: string): InlineSpan[] {
  // Constructed per call so the shared `lastIndex` of a global regex cannot leak.
  const pattern = /\*\*([^*]+?)\*\*|`([^`]+?)`|\[([^\]]+?)\]\(([^)\s]+?)\)/g;
  const spans: InlineSpan[] = [];
  let cursor = 0;
  let match = pattern.exec(line);

  while (match !== null) {
    const start = match.index;

    if (start > cursor) {
      spans.push({ kind: "text", text: line.slice(cursor, start) });
    }

    if (match[1] !== undefined) {
      spans.push({ kind: "strong", text: match[1] });
    } else if (match[2] !== undefined) {
      spans.push({ kind: "code", text: match[2] });
    } else {
      spans.push({ kind: "link", text: match[3], href: match[4] });
    }

    cursor = start + match[0].length;
    match = pattern.exec(line);
  }

  if (cursor < line.length) {
    spans.push({ kind: "text", text: line.slice(cursor) });
  }

  return spans;
}

/** Splits `**bold**` runs out of a line. Unclosed markers stay literal text. */
function parseBoldInline(line: string): InlineSpan[] {
  const segments = line.split("**");

  // An unbalanced marker leaves an even number of segments — treat as plain text.
  if (segments.length % 2 === 0) {
    return [{ kind: "text", text: line }];
  }

  return segments
    .map((segment, index): InlineSpan => {
      const kind = index % 2 === 1 ? "strong" : "text";
      return { kind, text: segment };
    })
    .filter((span) => span.text.length > 0);
}

export function parseInline(line: string, options: ParseOptions = {}): InlineSpan[] {
  return options.rich ? parseRichInline(line) : parseBoldInline(line);
}

function toHeadingLevel(hashes: string): 1 | 2 | 3 {
  if (hashes.length === 1) return 1;
  if (hashes.length === 2) return 2;
  return 3;
}

/** The readable text of a span run — used for headings ids and excerpts. */
export function spansToText(spans: InlineSpan[]): string {
  return spans.map((span) => span.text).join("");
}

const SLUG_REPLACEMENTS: Record<string, string> = {
  ə: "e",
  ı: "i",
  ö: "o",
  ü: "u",
  ğ: "g",
  ş: "s",
  ç: "c",
};

/**
 * A URL fragment for a heading. Azerbaijani letters are transliterated rather
 * than dropped, so `# Öz domenin` becomes `oz-domenin` instead of `-domenin`.
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[əıöüğşç]/g, (letter) => SLUG_REPLACEMENTS[letter] ?? letter)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Turns raw Markdown into a flat block list ready for rendering.
 * Consecutive list items of the same kind collapse into a single list block.
 */
export function parseMarkdown(source: string, options: ParseOptions = {}): MarkdownBlock[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: InlineSpan[][] } | null = null;
  let fence: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", spans: parseInline(paragraph.join(" "), options) });
    paragraph = [];
  };

  const flushList = () => {
    if (list === null) return;
    blocks.push({ type: "list", ordered: list.ordered, items: list.items });
    list = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const rawLine of lines) {
    // Fenced blocks keep their original indentation, so they read the raw line.
    if (options.rich && FENCE_PATTERN.test(rawLine)) {
      if (fence === null) {
        flushAll();
        fence = [];
      } else {
        blocks.push({ type: "code", text: fence.join("\n") });
        fence = null;
      }
      continue;
    }

    if (fence !== null) {
      fence = [...fence, rawLine];
      continue;
    }

    const line = rawLine.trim();

    if (line.length === 0) {
      flushAll();
      continue;
    }

    if (DIVIDER_PATTERN.test(line)) {
      flushAll();
      blocks.push({ type: "divider" });
      continue;
    }

    const heading = HEADING_PATTERN.exec(line);
    if (heading) {
      flushAll();
      blocks.push({
        type: "heading",
        level: toHeadingLevel(heading[1]),
        spans: parseInline(heading[2], options),
      });
      continue;
    }

    const bullet = BULLET_PATTERN.exec(line);
    const ordered = bullet ? null : ORDERED_PATTERN.exec(line);

    if (bullet || ordered) {
      flushParagraph();
      const isOrdered = ordered !== null;
      const item = parseInline((bullet ?? ordered)![1], options);

      if (list !== null && list.ordered !== isOrdered) {
        flushList();
      }

      list =
        list === null
          ? { ordered: isOrdered, items: [item] }
          : { ordered: list.ordered, items: [...list.items, item] };
      continue;
    }

    flushList();
    paragraph = [...paragraph, line];
  }

  // An unterminated fence still renders as code instead of swallowing the tail.
  if (fence !== null) {
    blocks.push({ type: "code", text: fence.join("\n") });
  }

  flushAll();
  return blocks;
}
