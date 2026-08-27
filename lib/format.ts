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

/** Strips everything but digits so a formatted number still builds a wa.me link. */
export function toWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}
