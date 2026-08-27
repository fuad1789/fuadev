'use client';

import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-prose">
          <span className="text-sm font-medium text-accent">{eyebrow}</span>
          <h2 className="mt-2 text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.1]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-fg-2">{subtitle}</p>
          ) : null}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}
