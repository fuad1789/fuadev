'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import { toDisplayDate } from '@/lib/format';
import type { LoadedGuide } from '@/lib/guides';
import { parseMarkdown, spansToText, toSlug } from '@/lib/markdown';
import GuideBody from './GuideBody';

export default function GuideDetail({ guide }: { guide: LoadedGuide }) {
  const { t, language } = useLanguage();

  const body = guide.body[language];
  const blocks = useMemo(() => parseMarkdown(body, { rich: true }), [body]);

  /** Top-level headings only — a two-level table of contents reads as clutter. */
  const contents = useMemo(
    () =>
      blocks.flatMap((block) => {
        if (block.type !== 'heading' || block.level !== 1) return [];
        const text = spansToText(block.spans);
        return [{ id: toSlug(text), text }];
      }),
    [blocks],
  );

  const meta = [
    { label: t.guides.meta.category, value: guide.category[language] },
    {
      label: t.guides.meta.readTime,
      value: `${guide.stats[language].minutes} ${t.guides.minutes}`,
    },
    { label: t.guides.meta.level, value: guide.level[language] },
    { label: t.guides.meta.updated, value: toDisplayDate(guide.updated, language) },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm text-fg-3 transition-colors hover:text-fg"
      >
        <span aria-hidden>←</span>
        {t.guides.back}
      </Link>

      <h1 className="mt-6 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.75rem]">
        {guide.title[language]}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-2">
        {guide.summary[language]}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {guide.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
        {meta.map((item) => (
          <div key={item.label} className="pr-4">
            <dt className="text-xs text-fg-3">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <aside className="lg:order-2">
          <div className="card p-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold">{t.guides.onThisPage}</h2>

            <nav aria-label={t.guides.onThisPage}>
              <ol className="mt-4 space-y-2.5">
                {contents.map((item, index) => (
                  <li key={item.id} className="flex gap-3 text-sm leading-snug">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted-2 text-xs font-medium text-fg"
                    >
                      {index + 1}
                    </span>
                    <a
                      href={`#${item.id}`}
                      className="text-fg-2 transition-colors hover:text-fg"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {guide.shortPath ? (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs text-fg-3">{t.guides.shortLink}</p>
                <p className="mt-1 font-mono text-sm font-medium">fuadev.com{guide.shortPath}</p>
              </div>
            ) : null}
          </div>
        </aside>

        <article className="lg:order-1 lg:col-span-2">
          <GuideBody blocks={blocks} />
        </article>
      </div>
    </div>
  );
}
