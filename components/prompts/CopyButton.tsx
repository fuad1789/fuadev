'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'error';

const RESET_DELAY_MS = 2200;

interface CopyButtonProps {
  text: string;
  labels: { copy: string; copied: string; failed: string };
  /** `solid` for the primary action, `quiet` for the repeated inline buttons. */
  variant?: 'solid' | 'quiet';
  className?: string;
}

/**
 * Clipboard write with a legacy fallback, because the async Clipboard API is
 * unavailable in insecure contexts and in a few in-app browsers — which is
 * exactly where visitors arriving from a social video tend to land.
 */
async function writeToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand('copy');
    if (!copied) {
      throw new Error('execCommand("copy") was rejected');
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function CopyButton({
  text,
  labels,
  variant = 'solid',
  className = '',
}: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const scheduleReset = useCallback(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState('idle'), RESET_DELAY_MS);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await writeToClipboard(text);
      setState('copied');
    } catch {
      // The raw text is always on the page, so a failure degrades to manual selection.
      setState('error');
    }
    scheduleReset();
  }, [text, scheduleReset]);

  const label =
    state === 'copied' ? labels.copied : state === 'error' ? labels.failed : labels.copy;

  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors';
  const skin =
    variant === 'solid'
      ? 'bg-fg px-4 py-2.5 text-white hover:opacity-90'
      : 'border border-line bg-bg px-3 py-2 text-fg shadow-sm hover:bg-muted';

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-state={state}
      className={`${base} ${skin} ${className}`}
    >
      <span aria-hidden className="text-[0.9em]">
        {state === 'copied' ? '✓' : state === 'error' ? '!' : '⧉'}
      </span>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
