/**
 * A deliberately tiny Markdown reader for the prompt library.
 *
 * The prompts are authored by hand and only ever use headings, dividers,
 * bullet/numbered lists, bold spans and paragraphs — so a full Markdown
 * dependency would cost more than it returns. Anything this parser does not
 * recognise degrades to a plain paragraph, never to a thrown error, because
 * the raw text stays available through the copy button either way.
 */

export type InlineSpan =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string };

export type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3; spans: InlineSpan[] }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] }
  | { type: "divider" };

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;
const BULLET_PATTERN = /^[-*]\s+(.*)$/;
const ORDERED_PATTERN = /^\d+[.)]\s+(.*)$/;
const DIVIDER_PATTERN = /^(-{3,}|_{3,}|\*{3,})$/;

/** Splits `**bold**` runs out of a line. Unclosed markers stay literal text. */
export function parseInline(line: string): InlineSpan[] {
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

function toHeadingLevel(hashes: string): 1 | 2 | 3 {
  if (hashes.length === 1) return 1;
  if (hashes.length === 2) return 2;
  return 3;
}

/**
 * Turns raw prompt Markdown into a flat block list ready for rendering.
 * Consecutive list items of the same kind collapse into a single list block.
 */
export function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: InlineSpan[][] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", spans: parseInline(paragraph.join(" ")) });
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
        spans: parseInline(heading[2]),
      });
      continue;
    }

    const bullet = BULLET_PATTERN.exec(line);
    const ordered = bullet ? null : ORDERED_PATTERN.exec(line);

    if (bullet || ordered) {
      flushParagraph();
      const isOrdered = ordered !== null;
      const item = parseInline((bullet ?? ordered)![1]);

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

  flushAll();
  return blocks;
}
