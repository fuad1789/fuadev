'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/app/providers';
import SkipLink from '@/components/ui/SkipLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Same chrome as the home page. It is a client layout so the language context
 * is available here too; the pages it wraps stay server components and are
 * passed through untouched as children.
 */
export default function PromptsLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SkipLink />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
