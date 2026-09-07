import type { Language } from "./translations";
import type { Localized } from "./prompts";

/**
 * The written companion to a video. A guide is not a blog post: it has no
 * publication date on display, it is expected to be edited rather than
 * superseded, and its address is meant to be readable out loud in a video.
 *
 * The body lives in `content/guides/<slug>.<language>.md`, one file per
 * language, because the language is chosen in the browser — both versions ship
 * and the client picks, exactly like `translations.ts` does.
 */
export interface Guide {
  /** URL segment — also the file name stem under `content/guides`. */
  slug: string;
  title: Localized<string>;
  category: Localized<string>;
  /** One or two sentences — the card and the meta description. */
  summary: Localized<string>;
  /** Who the guide is written for, shown in the meta row. */
  level: Localized<string>;
  /** Short, neutral labels rendered as pills. */
  tags: string[];
  /**
   * The short path announced in the video, e.g. `/vercel`. The redirect itself
   * is declared in `next.config.js`; this field is what the page advertises.
   */
  shortPath?: string;
  /** ISO date of the last edit to the Markdown files. */
  updated: string;
}

export interface GuideStats {
  words: number;
  /** Rounded reading time in minutes, never below one. */
  minutes: number;
}

/** A guide with both language bodies attached — what the pages render. */
export interface LoadedGuide extends Guide {
  body: Record<Language, string>;
  stats: Record<Language, GuideStats>;
}

export const guides: Guide[] = [
  {
    slug: "localhost-to-vercel",
    title: {
      az: "Saytı localhost-dan internetə çıxarmaq",
      en: "Getting a site off localhost and onto the internet",
    },
    category: {
      az: "Deployment",
      en: "Deployment",
    },
    summary: {
      az: "Kompüterində işləyən sayt niyə başqasında açılmır və onu GitHub ilə Vercel-də pulsuz, 5 dəqiqəyə necə yayımlayırsan — öz domenini bağlamağa qədər.",
      en: "Why a site that runs on your machine opens nowhere else, and how to publish it free in five minutes with GitHub and Vercel — up to connecting your own domain.",
    },
    level: {
      az: "Başlanğıc — terminal təcrübəsi tələb olunmur",
      en: "Beginner — no terminal experience required",
    },
    tags: ["Vercel", "GitHub", "Deployment", "Domain"],
    shortPath: "/vercel",
    updated: "2026-09-07",
  },
];

export function findGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
