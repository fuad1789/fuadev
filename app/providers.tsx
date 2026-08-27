'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';
import { Language, Translations, translations } from '@/lib/translations';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = 'az';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/** Layout effect on the client, no-op during SSR — avoids the React warning. */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function isLanguage(value: unknown): value is Language {
  return value === 'az' || value === 'en';
}

function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    // Private mode or blocked storage — fall back to the default silently.
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Runs before paint after hydration, so a stored EN preference does not flash AZ.
  useIsomorphicLayoutEffect(() => {
    const stored = readStoredLanguage();
    if (stored && stored !== DEFAULT_LANGUAGE) {
      setLanguageState(stored);
    }
  }, []);

  // Keep the document language in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Preference simply will not persist; the UI still switches.
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
