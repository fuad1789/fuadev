'use client';

import type { StatusTone } from '@/lib/translations';

const DOT_CLASS: Record<StatusTone, string> = {
  live: 'bg-success',
  official: 'bg-accent',
  dev: 'bg-amber-500',
  oss: 'bg-fg-3',
};

interface StatusBadgeProps {
  tone: StatusTone;
  label: string;
}

export default function StatusBadge({ tone, label }: StatusBadgeProps) {
  return (
    <span className="pill">
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[tone]}`} />
      {label}
    </span>
  );
}
