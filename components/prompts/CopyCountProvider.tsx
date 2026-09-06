'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchCopyCounts, isCountableSlug, sendCopyEvent, type CopyCounts } from '@/lib/copy-counter';
import { readStoredCounts, storeCounts } from '@/lib/copy-counter.storage';

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
 * Takes the higher count for each slug. A fetch that started before a copy
 * landed would otherwise pull the number back down a second after the visitor
 * watched it go up, which reads as the button having failed.
 */
function mergeCounts(current: CopyCounts, incoming: CopyCounts): CopyCounts {
  return Object.entries(incoming).reduce<Record<string, number>>(
    (merged, [slug, count]) => ({ ...merged, [slug]: Math.max(merged[slug] ?? 0, count) }),
    { ...current },
  );
}

interface CopyCountProviderProps {
  /**
   * Counts read on the server so the badges are in the first paint. Apps
   * Script takes two to four seconds to answer, so fetching from the browser
   * instead would blank every number for that long on each page load.
   */
  initialCounts?: CopyCounts;
  children: ReactNode;
}

/**
 * Holds the copy counts for a whole page. It lives above the buttons rather
 * than inside them so one copy updates every place the same prompt is shown.
 */
export default function CopyCountProvider({
  initialCounts = {},
  children,
}: CopyCountProviderProps) {
  const hasServerCounts = Object.keys(initialCounts).length > 0;

  const [counts, setCounts] = useState<CopyCounts>(initialCounts);
  const [ready, setReady] = useState(hasServerCounts);

  // After mount, never during render: reading storage while rendering would
  // disagree with the server-rendered markup and break hydration.
  useEffect(() => {
    const stored = readStoredCounts();
    if (Object.keys(stored).length === 0) return;

    setCounts((current) => mergeCounts(current, stored));
    setReady(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // The server-rendered numbers come from a page that revalidates on an
    // interval, so they can be a minute or two behind. This refetch corrects
    // them in the background: the badge is already on screen from the first
    // paint, and it only ever moves up to the live value.
    fetchCopyCounts(controller.signal)
      .then((loaded) => {
        setCounts((current) => mergeCounts(current, loaded));
        setReady(true);
      })
      .catch(() => {
        // An unreachable or undeployed script is not an error worth showing.
        // With server counts the badge keeps them; without, it stays hidden.
      });

    return () => controller.abort();
  }, []);

  const registerCopy = useCallback((slug: string) => {
    if (!isCountableSlug(slug)) return;

    // Optimistic, so the number reacts in the same frame as the click. Apps
    // Script takes seconds to reply and the visitor is looking at the button now.
    setCounts((current) => ({ ...current, [slug]: (current[slug] ?? 0) + 1 }));

    sendCopyEvent(slug)
      .then((recorded) => {
        // The reply carries what the sheet actually stored, which is the only
        // number that survives a reload — adopt it over the local guess.
        if (recorded === null) return;
        setCounts((current) => {
          const next = { ...current, [slug]: Math.max(current[slug] ?? 0, recorded) };
          // Persist so the next page load starts from the confirmed number
          // rather than whatever the page cache still holds.
          storeCounts(next);
          return next;
        });
      })
      .catch(() => {
        // The copy itself already succeeded; a lost count is not worth surfacing.
      });
  }, []);

  const value = useMemo<CopyCountsValue>(
    () => ({ counts, ready, registerCopy }),
    [counts, ready, registerCopy],
  );

  return <CopyCountsContext.Provider value={value}>{children}</CopyCountsContext.Provider>;
}
