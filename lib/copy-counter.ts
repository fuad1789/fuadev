/**
 * Client for the copy counter — a Google Apps Script web app whose source lives
 * in `scripts/copy-counter.gs`.
 *
 * Every request here is a CORS "simple request": a bare GET, or a POST sent as
 * `text/plain`. That is deliberate. Apps Script answers a preflight `OPTIONS`
 * with a redirect rather than the headers a preflight needs, so anything that
 * triggers one — a JSON content type, a custom header — fails in the browser.
 */

/**
 * Public web app URL. Unset is a supported state: the counter simply stays
 * invisible, so the site builds and runs before the script is deployed.
 */
export const COPY_COUNTER_ENDPOINT = process.env.NEXT_PUBLIC_COPY_COUNTER_URL ?? '';

export type CopyCounts = Readonly<Record<string, number>>;

const SLUG_PATTERN = /^[a-z0-9-]{1,64}$/;

/** Guards both what is sent and what is trusted back from the sheet. */
export function isCountableSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

/**
 * The sheet is hand-editable, so a cell can hold anything. Rows that are not a
 * valid slug with a finite, non-negative count are dropped instead of rendered.
 */
function toCopyCounts(payload: unknown): CopyCounts {
  if (typeof payload !== 'object' || payload === null) return {};

  const raw = (payload as { counts?: unknown }).counts;
  if (typeof raw !== 'object' || raw === null) return {};

  return Object.entries(raw as Record<string, unknown>).reduce<Record<string, number>>(
    (counts, [slug, value]) => {
      if (!isCountableSlug(slug)) return counts;

      const count = typeof value === 'number' ? value : Number(value);
      if (!Number.isFinite(count) || count < 0) return counts;

      return { ...counts, [slug]: Math.floor(count) };
    },
    {},
  );
}

interface FetchOptions {
  signal?: AbortSignal;
  /**
   * Server-side only. Caches the response for this many seconds instead of
   * bypassing the cache — without it the surrounding route turns dynamic and
   * every visitor waits on Apps Script, which answers in two to four seconds.
   */
  revalidateSeconds?: number;
}

/** Every count in one request. Throws on a network or parsing failure. */
export async function fetchCopyCounts({
  signal,
  revalidateSeconds,
}: FetchOptions = {}): Promise<CopyCounts> {
  if (!COPY_COUNTER_ENDPOINT) return {};

  const caching =
    typeof revalidateSeconds === 'number'
      ? { next: { revalidate: revalidateSeconds } }
      : { cache: 'no-store' as const };

  const response = await fetch(COPY_COUNTER_ENDPOINT, { signal, ...caching });
  if (!response.ok) {
    throw new Error(`Copy counter responded with ${response.status}`);
  }

  return toCopyCounts(await response.json());
}

/** How long a rendered page may keep showing the counts it was built with. */
export const COPY_COUNTS_REVALIDATE_SECONDS = 60;

/**
 * Server-side read for the initial render, so the numbers arrive inside the
 * HTML instead of appearing seconds later. It swallows failures on purpose: a
 * counter that is down must not fail the build or blank the page — the badges
 * are simply left off until the next revalidation succeeds.
 */
export async function loadCopyCounts(): Promise<CopyCounts> {
  try {
    return await fetchCopyCounts({ revalidateSeconds: COPY_COUNTS_REVALIDATE_SECONDS });
  } catch {
    return {};
  }
}

/**
 * Records one copy. `keepalive` lets the request outlive the page, because a
 * visitor who copies a prompt often navigates away in the same second.
 */
export async function sendCopyEvent(slug: string): Promise<void> {
  if (!COPY_COUNTER_ENDPOINT || !isCountableSlug(slug)) return;

  await fetch(COPY_COUNTER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ slug }),
    keepalive: true,
  });
}
