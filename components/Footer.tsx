'use client';

import { useLanguage } from '@/app/providers';

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();
  const name = language === 'az' ? 'Fuad Bağıyev' : 'Fuad Bagiyev';

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <p className="text-sm text-fg-3">
          © {year} {name}
        </p>
        <p className="text-sm text-fg-3">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
