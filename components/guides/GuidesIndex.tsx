'use client';

import { useLanguage } from '@/app/providers';
import type { LoadedGuide } from '@/lib/guides';
import Reveal from '@/components/ui/Reveal';
import GuideCard from './GuideCard';

export default function GuidesIndex({ guides }: { guides: LoadedGuide[] }) {
  const { t } = useLanguage();

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-prose">
        <span className="text-sm font-medium text-accent">{t.guides.eyebrow}</span>
        <h1 className="mt-2 text-[2rem] font-semibold leading-[1.12] sm:text-[2.75rem]">
          {t.guides.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-2">{t.guides.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-3">{t.guides.lede}</p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {guides.map((guide, index) => (
          <Reveal as="li" key={guide.slug} delay={(index % 2) * 0.05} y={14}>
            <GuideCard guide={guide} stats={guide.stats} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
