'use client';

import { LanguageProvider } from './providers';
import SkipLink from '@/components/ui/SkipLink';
import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import Demos from '@/components/Demos';
import Prompts from '@/components/Prompts';
import Guides from '@/components/Guides';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <SkipLink />
      <Header />

      <main id="main">
        <Intro />
        <Projects />
        <Demos />
        <Skills />
        <Prompts />
        <Guides />
        <Contact />
      </main>

      <Footer />
    </LanguageProvider>
  );
}
