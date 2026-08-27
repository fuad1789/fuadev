'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/providers';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

export default function Demos() {
  const { t } = useLanguage();

  if (t.demos.items.length === 0) return null;

  return (
    <section id="concepts" className="border-y border-line bg-muted">
      <div className="container-page py-16 sm:py-24">
        <SectionHeader
          eyebrow={t.demos.eyebrow}
          title={t.demos.title}
          subtitle={t.demos.subtitle}
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.demos.items.map((demo, i) => (
            <Reveal as="li" key={demo.name} delay={(i % 3) * 0.05} y={14}>
              <a
                href={demo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive group flex h-full flex-col overflow-hidden"
              >
                <div className="p-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-muted">
                    <Image
                      src={`/screenshots${demo.image}`}
                      alt={`${demo.name} — ${demo.kind}`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold tracking-tight">
                      {demo.name}
                    </h3>
                    <span
                      aria-hidden
                      className="text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    >
                      ↗
                    </span>
                    <span className="ml-auto text-xs text-fg-3">{demo.kind}</span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-fg-2">
                    {demo.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
