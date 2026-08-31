'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import { prompts } from '@/lib/prompts';
import PromptCard from './prompts/PromptCard';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

/**
 * Home-page entry point to the prompt library. Visitors arriving from a video
 * land on `/` first, and the header nav is hidden on small screens — so this
 * section is what makes the prompts findable on a phone.
 */
export default function Prompts() {
  const { t } = useLanguage();

  if (prompts.length === 0) return null;

  return (
    <section id="prompts" className="border-y border-line bg-muted">
      <div className="container-page py-16 sm:py-24">
        <SectionHeader
          eyebrow={t.prompts.eyebrow}
          title={t.prompts.title}
          subtitle={t.prompts.subtitle}
          action={
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted-2"
            >
              {t.prompts.seeAll}
              <span aria-hidden>→</span>
            </Link>
          }
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {prompts.slice(0, 4).map((prompt, index) => (
            <Reveal as="li" key={prompt.slug} delay={(index % 2) * 0.05} y={14}>
              <PromptCard prompt={prompt} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
