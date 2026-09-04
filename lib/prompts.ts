import type { Language } from "./translations";

/** Bilingual copy that lives with the prompt instead of the UI dictionary. */
export type Localized<T> = Record<Language, T>;

export interface Prompt {
  /** URL segment — also the file name under `content/prompts`. */
  slug: string;
  /** Shown as-is in both languages; product names are not translated. */
  title: string;
  category: Localized<string>;
  /** One or two sentences — the card and the meta description. */
  summary: Localized<string>;
  /** What the reader has to paste in after the prompt for it to work. */
  input: Localized<string>;
  /** Short, neutral labels rendered as pills. */
  tags: string[];
  /** Models the prompt has actually been used with. */
  models: string;
  /** ISO date of the last edit to the Markdown file. */
  updated: string;
}

export interface PromptStats {
  words: number;
  characters: number;
}

/** A prompt with its Markdown body attached — what the pages actually render. */
export interface LoadedPrompt extends Prompt {
  /** Raw Markdown, exactly as it is copied to the clipboard. */
  body: string;
  stats: PromptStats;
}

export const prompts: Prompt[] = [
  {
    slug: "local-business-website-prompt",
    title: "Local Business Website Prompt",
    category: {
      az: "Veb sayt dizaynı",
      en: "Website design",
    },
    summary: {
      az: "Kiçik, fiziki bizneslər — restoran, salon, təmir emalatxanası, klinika, tikinti şirkəti — üçün tək fayllıq sayt qurdurmaq üçün prompt. Bənövşəyi-mavi qradienti, boş şüarları və saxta etibar bloklarını adbaad qadağan edir, saytı isə tək bir hədəfin ətrafında qurur: zəng, sifariş və ya ünvana gəliş.",
      en: "The prompt for building a single-file site for a local, physical business — restaurant, salon, repair shop, clinic, construction company. It bans the purple-blue gradient, empty slogans and fake trust blocks by name, and builds the page around one job: a call, an order or a visit.",
    },
    input: {
      az: "Promptu yapışdırın, «BUSINESS DETAILS» bölməsindəki sətirləri biznesin real məlumatı ilə doldurun və «COPY RULES» hissəsindəki [LANGUAGE] yerinə saytın dilini (məsələn, Azərbaycan dili) yazıb göndərin.",
      en: "Paste the prompt, fill the lines under “BUSINESS DETAILS” with the real business information, and replace [LANGUAGE] under “COPY RULES” with the language the site should be written in.",
    },
    tags: ["Web design", "Landing page", "Local business", "Conversion"],
    models: "Claude · GPT · Gemini",
    updated: "2026-09-05",
  },
  {
    slug: "master-website-prompt",
    title: "Master Website Prompt",
    category: {
      az: "Veb sayt dizaynı",
      en: "Website design",
    },
    summary: {
      az: "Google Maps-dən götürülmüş biznes məlumatını təhlil edib həmin bizneslə uyğun, şablona bənzəməyən premium sayt qurdurmaq üçün tam prompt. AI görünüşlü dizayn, uydurma məzmun və hazır şablon strukturunu qadağan edən qaydalar daxildir.",
      en: "The full prompt for turning a business's Google Maps listing into a custom, agency-grade website. It bans AI-looking layouts, invented content and one-size-fits-all page structures.",
    },
    input: {
      az: "Promptu yapışdırın, altına biznesin Google Maps məlumatını (ad, kateqoriya, ünvan, telefon, iş saatları, rəylər, şəkillər, xidmətlər) əlavə edib göndərin.",
      en: "Paste the prompt, add the business's Google Maps details underneath it (name, category, address, phone, hours, reviews, photos, services) and send.",
    },
    tags: ["Web design", "Landing page", "Google Maps", "UX"],
    models: "Claude · GPT · Gemini",
    updated: "2026-08-31",
  },
];

export function findPrompt(slug: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.slug === slug);
}
