'use client';

import { useLanguage } from '@/app/providers';
import { toDisplayCount } from '@/lib/format';
import CopyButton from './CopyButton';
import { useCopyCounts } from './CopyCountProvider';

interface PromptCopyButtonProps {
  /** Identifies the prompt in the counter; the same slug as the route. */
  slug: string;
  text: string;
  labels: { copy: string; copied: string; failed: string };
  variant?: 'solid' | 'quiet';
  /** `stacked` puts the count under a full-width button. */
  layout?: 'inline' | 'stacked';
  /** Applied to the wrapper — placement and stacking context. */
  className?: string;
  /** Applied to the button itself — width and spacing. */
  buttonClassName?: string;
}

/**
 * A copy button that also reports and shows how many times the prompt has been
 * copied. A prompt nobody has copied yet shows no badge at all, so the library
 * never advertises a zero.
 */
export default function PromptCopyButton({
  slug,
  text,
  labels,
  variant = 'solid',
  layout = 'inline',
  className = '',
  buttonClassName = '',
}: PromptCopyButtonProps) {
  const { t, language } = useLanguage();
  const { counts, ready, registerCopy } = useCopyCounts();

  const count = counts[slug] ?? 0;
  const badge =
    ready && count > 0 ? (
      <span className="text-xs tabular-nums text-fg-3">
        {toDisplayCount(count, language)} {t.prompts.copies}
      </span>
    ) : null;

  const wrapper =
    layout === 'stacked'
      ? 'flex flex-col gap-2 text-center'
      : 'inline-flex flex-wrap items-center justify-end gap-x-2.5 gap-y-1';

  return (
    <span className={`${wrapper} ${className}`}>
      {layout === 'inline' ? badge : null}

      <CopyButton
        text={text}
        variant={variant}
        className={buttonClassName}
        labels={labels}
        onCopied={() => registerCopy(slug)}
      />

      {layout === 'stacked' ? badge : null}
    </span>
  );
}
