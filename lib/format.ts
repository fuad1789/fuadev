/**
 * Display hostname for a project link — "www." stripped, trailing slash gone.
 * Falls back to the raw value when the URL cannot be parsed, so a malformed
 * entry degrades to visible text instead of throwing during render.
 */
export function toDisplayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

const EN_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Groups thousands with the separator each locale expects, without relying on
 * `toLocaleString` — the ICU data available to Node and to the browser can
 * disagree, and a mismatch here would be a hydration error.
 */
export function toDisplayCount(value: number, language: 'az' | 'en'): string {
  const separator = language === 'az' ? '.' : ',';
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Formats a `YYYY-MM-DD` string without going through `Date`, so the server and
 * the client always print the same day regardless of the visitor's time zone.
 * An unparsable value is returned untouched.
 */
export function toDisplayDate(iso: string, language: 'az' | 'en'): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;

  const [, year, month, day] = match;
  if (language === 'az') return `${day}.${month}.${year}`;

  const monthName = EN_MONTHS[Number(month) - 1] ?? month;
  return `${monthName} ${Number(day)}, ${year}`;
}

/** Strips everything but digits so a formatted number still builds a wa.me link. */
export function toWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}
