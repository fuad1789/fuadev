'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AwardDiscProps {
  amount: string;
  label: string;
}

function AwardDisc({ amount, label }: AwardDiscProps) {
  return (
    <div
      className="pointer-events-none absolute z-10 bottom-3 right-3 sm:bottom-4 sm:right-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      aria-label={`${amount} ${label}`}
      title={`${amount} ${label}`}
    >
      {/* solid emerald disc, white typography */}
      <div
        className="relative flex flex-col items-center justify-center rounded-full"
        style={{
          width: '92px',
          height: '92px',
          background: '#047857',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.10) inset, 0 0 0 5px rgba(11,11,11,0.7), 0 14px 30px rgba(0,0,0,0.55)',
        }}
      >
        {/* faint inner concentric hairline */}
        <span
          aria-hidden
          className="absolute inset-2 rounded-full pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}
        />

        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white/90 mb-1"
          aria-hidden
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.7 21l1.7-7L2 9.2l7.1-.6L12 2z" />
        </svg>

        <span
          className="text-white leading-none tabular-nums"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {amount}
        </span>

        <span
          className="mt-1.5 text-white/75 leading-none uppercase"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: '7px',
            letterSpacing: '0.32em',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-2.5 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/40 mb-3 font-mono">
              <span className="inline-block h-px w-6 bg-white/30" />
              Portfolio
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1] text-white">
              {t.projects.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm sm:text-[15px] text-white/50 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </motion.div>

          <motion.a
            href="https://github.com/fuad1789"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white border border-white/15 hover:border-white/35 rounded-full px-4 py-2 transition-colors font-mono shrink-0"
          >
            <span>{t.projects.seeAll}</span>
            <span aria-hidden className="text-white/40">↗</span>
          </motion.a>
        </div>

        {/* Cards grid — editorial / catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
          {t.projects.items.map((project, i) => {
            const parts = project.label.split('·').map((s) => s.trim());
            const kind = parts[0] || 'Project';
            const index = String(i + 1).padStart(2, '0');
            let host = '';
            try {
              host = new URL(project.linkUrl).hostname.replace(/^www\./, '');
            } catch {
              host = project.linkUrl;
            }
            const screenshotSrc = `/screenshots${project.image}`;
            const status = (() => {
              const s = project.status.toLowerCase();
              if (s.includes('açıq mənbə') || s.includes('open source')) return 'Open Source';
              if (s.includes('rəsmi') || s.includes('universitet') || s.includes('official')) return 'Official';
              if (s.includes('inkişaf davam') || s.includes('in development')) return 'In Dev';
              if (s.includes('aktiv') || s.includes('active')) return 'Live';
              return 'Active';
            })();

            return (
              <motion.a
                key={project.name}
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block bg-[#0b0b0b] transition-colors duration-500 hover:bg-[#0e0e0e]"
              >
                {/* Catalog header strip */}
                <div className="flex items-center gap-3 px-6 sm:px-8 pt-6 pb-5 text-[10px] font-mono tracking-[0.22em] uppercase">
                  <span className="text-white/65 tabular-nums">№ {index}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-white/15 via-white/[0.06] to-transparent" />
                  <span className="text-white/35 truncate max-w-[160px] sm:max-w-[220px] normal-case tracking-tight font-mono">
                    {host}
                  </span>
                  <span aria-hidden className="text-white/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </div>

                {/* Screenshot — no chrome, just a flat plate with subtle inset */}
                <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] ring-1 ring-inset ring-white/[0.05]">
                  <Image
                    src={screenshotSrc}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                  />
                  {/* faint inner highlight along top — depth */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent" />

                  {project.award && (
                    <AwardDisc amount={project.award.line2} label={project.award.line1} />
                  )}
                </div>

                {/* Editorial body */}
                <div className="px-6 sm:px-8 pb-7 sm:pb-9">
                  <p className="text-[10px] font-mono tracking-[0.24em] uppercase text-white/35">
                    {kind}
                  </p>

                  <h3
                    className="mt-3 sm:mt-4 font-display text-white leading-[0.98] tracking-[-0.035em]"
                    style={{
                      fontWeight: 500,
                      fontSize: 'clamp(30px, 3.6vw, 42px)',
                    }}
                  >
                    {project.name}
                  </h3>

                  <p className="mt-4 sm:mt-5 text-[14px] sm:text-[14.5px] leading-[1.6] text-white/55 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Spec sheet */}
                  <div className="mt-7 sm:mt-9 pt-5 border-t border-white/[0.07] grid grid-cols-2 gap-5 sm:gap-8">
                    {[
                      { label: 'Kind', value: kind },
                      { label: 'Status', value: status },
                    ].map((row) => (
                      <div key={row.label} className="min-w-0">
                        <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/30 mb-1.5">
                          {row.label}
                        </p>
                        <p className="text-[12px] sm:text-[12.5px] font-mono text-white/85 tracking-tight truncate">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover marginalia — left edge tick */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-6 h-[calc(100%-3rem)] w-px bg-white/30 origin-top scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-100"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Mobile see-all */}
        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href="https://github.com/fuad1789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 border border-white/15 rounded-full px-4 py-2 font-mono"
          >
            <span>{t.projects.seeAll}</span>
            <span aria-hidden className="text-white/40">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
