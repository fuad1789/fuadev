'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  COPY_COUNTER_ENDPOINT,
  fetchCopyCounts,
  isCountableSlug,
  sendCopyEvent,
  type CopyCounts,
} from '@/lib/copy-counter';

interface CopyCountsValue {
  counts: CopyCounts;
  /** False until the counts have loaded — the badges stay hidden until then. */
  ready: boolean;
  registerCopy: (slug: string) => void;
}

const FALLBACK: CopyCountsValue = {
  counts: {},
  ready: false,
  registerCopy: () => {},
};

const CopyCountsContext = createContext<CopyCountsValue>(FALLBACK);

/** Outside the provider this returns the fallback, so copy buttons still work. */
export function useCopyCounts(): CopyCountsValue {
  return useContext(CopyCountsContext);
}

/**
 * Holds the copy counts for a whole page. It lives above the buttons rather
 * than inside them so the list view makes one request instead of one per card,
 * and so a copy on one button updates every place the same prompt is shown.
 */
export default function CopyCountProvider({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState<CopyCounts>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!COPY_COUNTER_ENDPOINT) return;

    const controller = new AbortController();

    fetchCopyCounts(controller.signal)
      .then((loaded) => {
        setCounts(loaded);
        setReady(true);
      })
      .catch(() => {
        // An unreachable or undeployed script is not an error worth showing:
        // `ready` stays false and the counts are simply never rendered.
      });

    return () => controller.abort();
  }, []);

  const registerCopy = useCallback((slug: string) => {
    if (!COPY_COUNTER_ENDPOINT || !isCountableSlug(slug)) return;

    // Optimistic, and deliberately never rolled back — a number that ticks up
    // and then drops back reads as a bug, and the real value arrives on reload.
    setCounts((current) => ({ ...current, [slug]: (current[slug] ?? 0) + 1 }));

    void sendCopyEvent(slug).catch(() => {
      // The copy itself already succeeded; a lost count is not worth surfacing.
    });
  }, []);

  const value = useMemo<CopyCountsValue>(
    () => ({ counts, ready, registerCopy }),
    [counts, ready, registerCopy],
  );

  return <CopyCountsContext.Provider value={value}>{children}</CopyCountsContext.Provider>;
}
