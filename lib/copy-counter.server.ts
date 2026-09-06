import {
  COPY_COUNTS_API_CACHE_SECONDS,
  COPY_COUNTS_REVALIDATE_SECONDS,
  isCountableSlug,
  toCopyCounts,
  toRecordedCount,
  type CopyCounts,
} from './copy-counter';

/**
 * Server-only half of the copy counter — the only place that knows the Apps
 * Script URL. Keeping it here means the browser never holds the address, so it
 * cannot be hit directly and can be changed without rebuilding the client.
 *
 * `COPY_COUNTER_URL` is the name to use. The public one is still read so an
 * existing deployment configured before the proxy existed keeps working.
 */
const ENDPOINT =
  process.env.COPY_COUNTER_URL ?? process.env.NEXT_PUBLIC_COPY_COUNTER_URL ?? '';

export function isCounterConfigured(): boolean {
  return ENDPOINT.length > 0;
}

/**
 * Reads every count. Cached rather than bypassing the cache on purpose: Apps
 * Script takes two to four seconds, and without this each caller would pay it.
 */
async function readCounts(revalidateSeconds: number): Promise<CopyCounts> {
  if (!ENDPOINT) return {};

  const response = await fetch(ENDPOINT, { next: { revalidate: revalidateSeconds } });
  if (!response.ok) {
    throw new Error(`Copy counter responded with ${response.status}`);
  }

  return toCopyCounts(await response.json());
}

/** Read for the API route — short-lived cache, so the browser sees fresh numbers. */
export function readCachedCounts(): Promise<CopyCounts> {
  return readCounts(COPY_COUNTS_API_CACHE_SECONDS);
}

/**
 * Read for the initial page render, so the numbers arrive inside the HTML
 * instead of appearing seconds later. It swallows failures on purpose: a
 * counter that is down must not fail the build or blank the page.
 */
export async function loadCopyCounts(): Promise<CopyCounts> {
  try {
    return await readCounts(COPY_COUNTS_REVALIDATE_SECONDS);
  } catch {
    return {};
  }
}

/** Records one copy and returns the stored count, or null if it was declined. */
export async function recordCopy(slug: string): Promise<number | null> {
  if (!ENDPOINT || !isCountableSlug(slug)) return null;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ slug }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Copy counter responded with ${response.status}`);
  }

  return toRecordedCount(await response.json(), slug);
}
