'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import type { Prompt } from '@/lib/prompts';
import CopyButton from './CopyButton';

interface PromptCardProps {
  prompt: Prompt;
  /** Pass the raw body to offer copying straight from the list. */
  body?: string;
}

/**
 * The title link stretches over the whole card, so the card is one big target.
 * The copy button sits above that overlay and stays independently clickable.
 */
export default function PromptCard({ prompt, body }: PromptCardProps) {
  const { t, language } = useLanguage();

  return (
    <article className="card card-interactive relative flex h-full flex-col p-5">
      <span className="text-xs font-medium text-accent">{prompt.category[language]}</span>

      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        <Link href={`/prompts/${prompt.slug}`} className="after:absolute after:inset-0">
          {prompt.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-fg-2">{prompt.summary[language]}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-sm font-medium text-fg">
          {t.prompts.open}
          <span aria-hidden className="ml-1.5">
            →
          </span>
        </span>

        {body ? (
          <CopyButton
            text={body}
            variant="quiet"
            className="relative z-10"
            labels={{
              copy: t.prompts.copy,
              copied: t.prompts.copied,
              failed: t.prompts.copyFailed,
            }}
          />
        ) : null}
      </div>
    </article>
  );
}
