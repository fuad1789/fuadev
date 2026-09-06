'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/app/providers';
import SkipLink from '@/components/ui/SkipLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CopyCountProvider from '@/components/prompts/CopyCountProvider';

/**
 * Same chrome as the home page. It is a client layout so the language context
 * is available here too; the pages it wraps stay server components and are
 * passed through untouched as children.
 *
 * The copy counts are fetched once here rather than per button, so the list
 * view costs a single request no matter how many prompts it renders.
 */
export default function PromptsLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CopyCountProvider>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </CopyCountProvider>
    </LanguageProvider>
  );
}
