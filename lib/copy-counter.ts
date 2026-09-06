/**
 * Shared half of the copy counter: the payload shapes both the browser and the
 * server have to agree on, plus the parsers that guard them.
 *
 * The browser never talks to Apps Script directly. It goes through this app's
 * own API route (`COPY_COUNTS_API_PATH`), which is same-origin — so there is no
 * CORS surface to fail silently — and answers from a server-side cache instead
 * of making every visitor wait the two to four seconds Apps Script needs.
 */

/** Same-origin endpoint the browser uses for both reading and recording. */
export const COPY_COUNTS_API_PATH = '/api/prompt-copies';

/** How long a rendered page may keep showing the counts it was built with. */
export const COPY_COUNTS_REVALIDATE_SECONDS = 60;

/** How long the API route may serve a cached read from Apps Script. */
export const COPY_COUNTS_API_CACHE_SECONDS = 10;

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
export function toCopyCounts(payload: unknown): CopyCounts {
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

/**
 * The write reply carries the stored count, which beats anything the client can
 * guess. A reply for a different slug, or one marked as failed, is treated as
 * no answer at all.
 */
export function toRecordedCount(payload: unknown, slug: string): number | null {
  if (typeof payload !== 'object' || payload === null) return null;

  const body = payload as { ok?: unknown; slug?: unknown; count?: unknown };
  if (body.ok !== true || body.slug !== slug) return null;

  const count = typeof body.count === 'number' ? body.count : Number(body.count);
  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : null;
}

/** Every count in one request. Throws on a network or parsing failure. */
export async function fetchCopyCounts(signal?: AbortSignal): Promise<CopyCounts> {
  const response = await fetch(COPY_COUNTS_API_PATH, { signal, cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Copy counter responded with ${response.status}`);
  }

  return toCopyCounts(await response.json());
}

/**
 * Records one copy and returns the count the sheet now holds, or null when the
 * write was declined. `keepalive` lets the request outlive the page, because a
 * visitor who copies a prompt often navigates away in the same second.
 */
export async function sendCopyEvent(slug: string): Promise<number | null> {
  if (!isCountableSlug(slug)) return null;

  const response = await fetch(COPY_COUNTS_API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`Copy counter responded with ${response.status}`);
  }

  return toRecordedCount(await response.json(), slug);
}
