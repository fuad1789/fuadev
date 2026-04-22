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
                className="group relative block overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#0a0a0a]"
              >
                {/* Image area — full screenshot, no crop */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]">
                  {demo.image ? (
                    <Image
                      src={demo.image}
                      alt={demo.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950" />
                  )}

                  {/* Hover ring — amber tint */}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/0 group-hover:ring-amber-400/20 transition-all duration-500" />
                </div>

                {/* Labels band — outside the image */}
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
                    <span className="shrink-0 text-[9px] tracking-[0.3em] uppercase text-white/70 border border-white/15 rounded-full px-2.5 py-1 font-mono">
                      {tag}
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
