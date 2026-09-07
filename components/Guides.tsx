'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/providers';
import { guides } from '@/lib/guides';
import GuideCard from './guides/GuideCard';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

/**
 * Home-page entry point to the guides. Visitors arriving from a video land on
 * `/` first, and the header nav is trimmed on small screens — so this section
 * is what makes the guides findable on a phone.
 */
export default function Guides() {
  const { t } = useLanguage();

  if (guides.length === 0) return null;

  return (
    <section id="guides">
      <div className="container-page py-16 sm:py-24">
        <SectionHeader
          eyebrow={t.guides.eyebrow}
          title={t.guides.title}
          subtitle={t.guides.subtitle}
          action={
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted-2"
            >
              {t.guides.seeAll}
              <span aria-hidden>→</span>
            </Link>
          }
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {guides.slice(0, 4).map((guide, index) => (
            <Reveal as="li" key={guide.slug} delay={(index % 2) * 0.05} y={14}>
              <GuideCard guide={guide} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
