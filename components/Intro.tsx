'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/app/providers';

/**
 * Opening section — introduction and background in one block. Everything the
 * old hero and about sections said, minus the repetition.
 */
export default function Intro() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="container-page pb-14 pt-10 sm:pb-16 sm:pt-14">
      <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-medium">{t.intro.name}</span>
        <span aria-hidden className="text-fg-3">
          ·
        </span>
        <span className="text-sm text-fg-2">{t.intro.role}</span>

        <span className="pill ml-1">
          <span aria-hidden className="relative flex h-2 w-2">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {t.intro.availability}
        </span>
      </motion.div>

      <motion.h1
        {...rise(0.06)}
        className="mt-6 max-w-4xl text-[2.25rem] font-semibold leading-[1.08] sm:mt-8 sm:text-[3.25rem] lg:text-[3.75rem]"
      >
        {t.intro.statement}
      </motion.h1>

      <motion.p
        {...rise(0.12)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg"
      >
        {t.intro.lede}
      </motion.p>

      <motion.p
        {...rise(0.16)}
        className="mt-4 max-w-2xl text-base leading-relaxed text-fg-2"
      >
        {t.intro.body}
      </motion.p>

      <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="group inline-flex items-center gap-2 rounded-lg bg-fg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {t.intro.primaryButton}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-lg border border-line bg-bg px-5 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:bg-muted"
        >
          {t.intro.secondaryButton}
        </a>
      </motion.div>

      <motion.dl
        {...rise(0.26)}
        className="mt-12 grid grid-cols-2 gap-y-8 border-t border-line pt-8 sm:mt-14 md:grid-cols-4"
      >
        {t.intro.stats.map((stat) => (
          /* col-reverse keeps dt-before-dd semantics while printing the figure on top */
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-sm text-fg-3">{stat.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
