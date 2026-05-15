'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Demos() {
  const { t } = useLanguage();

  if (!t.demos?.items?.length) return null;

  return (
    <section id="demos" className="relative">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-2.5 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-amber-400/70 mb-3 font-mono">
              <span className="inline-block h-px w-6 bg-amber-400/50" />
              Showcase / Sandbox
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1] text-white">
              {t.demos.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm sm:text-[15px] text-white/50 leading-relaxed">
              {t.demos.subtitle}
            </p>
          </motion.div>

        </div>

        {/* Cards grid — 3 columns to differ from production projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {t.demos.items.map((demo, i) => {
            const tag = (demo.label.split('·')[0] ?? demo.label).trim();
            let host = '';
            try {
              host = new URL(demo.linkUrl).hostname.replace(/^www\./, '');
            } catch {
              host = demo.linkUrl;
            }
            const screenshotSrc = `/screenshots${demo.image}`;
            return (
              <motion.a
                key={demo.name}
                href={demo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/25 hover:shadow-[0_30px_60px_-20px_rgba(251,191,36,0.18)]"
              >
                {/* Browser frame */}
                <div className="relative bg-[#0a0a0a]">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-3 px-3.5 sm:px-4 h-9 border-b border-white/[0.06] bg-gradient-to-b from-[#161616] to-[#0e0e0e]">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-inset ring-black/30" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] ring-1 ring-inset ring-black/30" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-inset ring-black/30" />
                    </div>

                    {/* URL pill */}
                    <div className="flex-1 flex items-center justify-center min-w-0">
                      <div className="inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.06]">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/40" aria-hidden>
                          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c.9 0 2.6 1.9 3.4 5H8.6C9.4 5.9 11.1 4 12 4zm-5.4 5h2.1c-.2 1-.3 2-.3 3s.1 2 .3 3H6.6A8 8 0 016 12c0-1 .2-2 .6-3zm10.8 0H19c.4 1 .6 2 .6 3s-.2 2-.6 3h-2.6c.2-1 .3-2 .3-3s-.1-2-.3-3zM10.4 11h3.2c.1.3.1.7.1 1s0 .7-.1 1h-3.2c-.1-.3-.1-.7-.1-1s0-.7.1-1zM12 20c-.9 0-2.6-1.9-3.4-5h6.8c-.8 3.1-2.5 5-3.4 5z" fill="currentColor" />
                        </svg>
                        <span className="text-[10.5px] font-mono text-white/55 tracking-tight truncate">
                          {host}
                        </span>
                      </div>
                    </div>

                    {/* Demo indicator */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span className="hidden sm:inline text-[10px] font-mono tracking-wider uppercase text-amber-400/70">
                        Demo
                      </span>
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={screenshotSrc}
                      alt={demo.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />

                    {/* Hover veil */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Labels band */}
                <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06] bg-[#0a0a0a]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[16px] sm:text-[18px] text-white tracking-tight font-medium leading-tight truncate">
                        {demo.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-white/45 truncate font-mono tracking-wide">
                        {demo.label}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-white/70 border border-white/15 rounded-full px-2.5 py-1 font-mono transition-colors duration-300 group-hover:border-amber-400/40 group-hover:text-white">
                      <span>{tag}</span>
                      <span aria-hidden className="text-white/40 transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
