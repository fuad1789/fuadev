import { NextResponse } from 'next/server';
import { isCountableSlug } from '@/lib/copy-counter';
import { isCounterConfigured, readCachedCounts, recordCopy } from '@/lib/copy-counter.server';

/**
 * Same-origin front for the copy counter. The browser talks only to this route:
 * no CORS to fail silently, no two-to-four-second Apps Script wait on the read
 * path, and the sheet's URL never leaves the server.
 *
 * Failures answer with an empty payload rather than an error status — a counter
 * that is down should leave the badges off, not surface a broken request.
 */

/** Reads go through Apps Script's cache; writes must not be cached at all. */
export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  if (!isCounterConfigured()) {
    return NextResponse.json({ ok: false, counts: {} });
  }

  try {
    const counts = await readCachedCounts();
    return NextResponse.json({ ok: true, counts });
  } catch {
    return NextResponse.json({ ok: false, counts: {} });
  }
}

/** Reads the slug from the body; anything malformed is rejected before Google. */
async function readSlug(request: Request): Promise<string | null> {
  try {
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null) return null;

    const slug = (body as { slug?: unknown }).slug;
    return typeof slug === 'string' && isCountableSlug(slug) ? slug : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const slug = await readSlug(request);
  if (!slug) {
    return NextResponse.json({ ok: false, error: 'invalid slug' }, { status: 400 });
  }

  try {
    const count = await recordCopy(slug);
    if (count === null) {
      return NextResponse.json({ ok: false, error: 'not recorded' });
    }
    return NextResponse.json({ ok: true, slug, count });
  } catch {
    return NextResponse.json({ ok: false, error: 'unavailable' });
  }
}
