'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/app/providers';
import { parseMarkdown } from '@/lib/markdown';
import PromptBody from './PromptBody';
import PromptCopyButton from './PromptCopyButton';

type ViewMode = 'formatted' | 'raw';

/**
 * The prompt document itself. The readable rendering is the default and the
 * untouched raw text is one tap away — that raw view is the manual-selection
 * escape hatch for browsers that block the clipboard.
 *
 * The document scrolls inside its own box so the copy control in the header
 * stays reachable while reading.
 */
export default function PromptView({ slug, body }: { slug: string; body: string }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ViewMode>('formatted');
  const blocks = useMemo(() => parseMarkdown(body), [body]);

  const modes: Array<{ id: ViewMode; label: string }> = [
    { id: 'formatted', label: t.prompts.viewFormatted },
    { id: 'raw', label: t.prompts.viewRaw },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-muted px-3 py-3 sm:px-4">
        <div className="flex items-center rounded-lg border border-line bg-bg p-0.5">
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={mode === item.id}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === item.id ? 'bg-muted text-fg' : 'text-fg-3 hover:text-fg'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <PromptCopyButton
          slug={slug}
          text={body}
          variant="quiet"
          labels={{
            copy: t.prompts.copy,
            copied: t.prompts.copied,
            failed: t.prompts.copyFailed,
          }}
        />
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
        {mode === 'formatted' ? (
          <PromptBody blocks={blocks} />
        ) : (
          <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-fg-2">
            {body}
          </pre>
        )}
      </div>
    </div>
  );
}
