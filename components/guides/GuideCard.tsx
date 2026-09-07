'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import type { Guide, GuideStats } from '@/lib/guides';

interface GuideCardProps {
  guide: Guide;
  /** Reading time for the current language; omitted on the home page teaser. */
  stats?: Record<'az' | 'en', GuideStats>;
}

/** The title link stretches over the whole card, so the card is one big target. */
export default function GuideCard({ guide, stats }: GuideCardProps) {
  const { t, language } = useLanguage();
  const minutes = stats?.[language].minutes;

  return (
    <article className="card card-interactive relative flex h-full flex-col p-5">
      <span className="text-xs font-medium text-accent">{guide.category[language]}</span>

      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0">
          {guide.title[language]}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-fg-2">{guide.summary[language]}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {guide.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-sm font-medium text-fg">
          {t.guides.open}
          <span aria-hidden className="ml-1.5">
            →
          </span>
        </span>

        {minutes !== undefined ? (
          <span className="text-xs text-fg-3">
            {minutes} {t.guides.minutes}
          </span>
        ) : null}
      </div>
    </article>
  );
}
