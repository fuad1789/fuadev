'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import { toDisplayCount, toDisplayDate } from '@/lib/format';
import type { LoadedPrompt } from '@/lib/prompts';
import PromptCopyButton from './PromptCopyButton';
import PromptView from './PromptView';

export default function PromptDetail({ prompt }: { prompt: LoadedPrompt }) {
  const { t, language } = useLanguage();

  const meta = [
    { label: t.prompts.meta.category, value: prompt.category[language] },
    { label: t.prompts.meta.words, value: toDisplayCount(prompt.stats.words, language) },
    { label: t.prompts.meta.models, value: prompt.models },
    { label: t.prompts.meta.updated, value: toDisplayDate(prompt.updated, language) },
  ];

  const steps = [...t.prompts.howToSteps, prompt.input[language]];

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        href="/prompts"
        className="inline-flex items-center gap-1.5 text-sm text-fg-3 transition-colors hover:text-fg"
      >
        <span aria-hidden>←</span>
        {t.prompts.back}
      </Link>

      <h1 className="mt-6 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.75rem]">
        {prompt.title}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-2">
        {prompt.summary[language]}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
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
            <h2 className="text-sm font-semibold">{t.prompts.howToTitle}</h2>

            <ol className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-fg-2">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted-2 text-xs font-medium text-fg"
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <PromptCopyButton
              slug={prompt.slug}
              text={prompt.body}
              layout="stacked"
              className="mt-5"
              buttonClassName="w-full"
              labels={{
                copy: t.prompts.copyFull,
                copied: t.prompts.copied,
                failed: t.prompts.copyFailed,
              }}
            />
          </div>
        </aside>

        <div className="lg:order-1 lg:col-span-2">
          <PromptView slug={prompt.slug} body={prompt.body} />
        </div>
      </div>
    </div>
  );
}
