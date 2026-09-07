'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/providers';
import type { Language } from '@/lib/translations';

const LANGUAGES: Language[] = ['az', 'en'];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

  /** Section anchors only resolve on the home page; elsewhere they route back to it. */
  const section = (hash: string) => (isHome ? hash : `/${hash}`);

  const navItems = [
    { href: section('#work'), label: t.nav.work, alwaysVisible: false },
    { href: section('#concepts'), label: t.nav.demos, alwaysVisible: false },
    { href: section('#skills'), label: t.nav.skills, alwaysVisible: false },
    { href: '/guides', label: t.nav.guides, alwaysVisible: true },
    { href: '/prompts', label: t.nav.prompts, alwaysVisible: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-header items-center justify-between gap-2 sm:gap-4">
          <Link
            href={isHome ? '#top' : '/'}
            className="text-[0.9375rem] font-semibold tracking-tight"
          >
            fuadev
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href} className={item.alwaysVisible ? '' : 'hidden md:block'}>
                  <Link
                    href={item.href}
                    // Tighter on phones: two always-visible items, the logo and
                    // the language switch have to fit a 360px viewport.
                    className={`whitespace-nowrap rounded-lg px-2 py-2 text-[0.8125rem] transition-colors hover:bg-muted hover:text-fg sm:px-3 sm:text-sm ${
                      item.alwaysVisible ? 'font-medium text-fg' : 'text-fg-2'
                    }`}
                  >
                    {item.label}
                  </Link>
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

            <Link
              href={section('#contact')}
              className="hidden rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
