import { toCopyCounts, type CopyCounts } from './copy-counter';

/**
 * A per-tab floor for counts this visitor recorded themselves.
 *
 * Pages are rendered from a cache that can be up to a minute behind, so a
 * reload right after copying would briefly show the number from before the
 * click and read as the copy having been lost. Remembering what the server
 * confirmed keeps the visitor's own contribution on screen from the first
 * moment, without waiting on any request.
 *
 * Session storage on purpose: this is a display floor for the current visit,
 * not a record worth keeping, and it must not outlive the tab.
 */
const STORAGE_KEY = 'fuadev:copy-counts';

/** Storage can be unavailable or hold anything; failures degrade to no floor. */
export function readStoredCounts(): CopyCounts {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return toCopyCounts({ counts: JSON.parse(raw) as unknown });
  } catch {
    return {};
  }
}

export function storeCounts(counts: CopyCounts): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {
    // Private-mode or quota failures are not worth surfacing: the floor is an
    // improvement on the cached number, never a requirement for correctness.
  }
}
