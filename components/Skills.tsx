'use client';

import type { ElementType } from 'react';
import {
  SiFigma,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { useLanguage } from '@/app/providers';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

const ICONS: Record<string, ElementType> = {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiGit,
  SiFigma,
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="container-page py-16 sm:py-24">
      <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {t.skills.services.map((service, i) => (
          <Reveal key={service} delay={i * 0.05} y={14}>
            <div className="card h-full px-5 py-5">
              <p className="text-base font-medium">{service}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <p className="text-sm font-medium text-fg-3">{t.skills.technologiesTitle}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {t.skills.technologies.map((tech) => {
              const Icon = ICONS[tech.icon];
              return (
                <li key={tech.name}>
                  <span className="pill px-3 py-1.5 text-[0.8125rem]">
                    {Icon ? <Icon aria-hidden className="h-3.5 w-3.5" /> : null}
                    {tech.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
