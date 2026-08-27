'use client';

import { useLanguage } from '@/app/providers';
import type { Language } from '@/lib/translations';

const LANGUAGES: Language[] = ['az', 'en'];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '#work', label: t.nav.work },
    { href: '#concepts', label: t.nav.demos },
    { href: '#skills', label: t.nav.skills },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-header items-center justify-between gap-4">
          <a href="#top" className="text-[0.9375rem] font-semibold tracking-tight">
            fuadev
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm text-fg-2 transition-colors hover:bg-muted hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Segmented language control */}
            <div className="flex items-center rounded-lg border border-line bg-muted p-0.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-current={language === lang ? 'true' : undefined}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium uppercase transition-colors ${
                    language === lang
                      ? 'bg-bg text-fg shadow-sm'
                      : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
