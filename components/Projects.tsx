'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/providers';
import type { ProjectItem } from '@/lib/translations';
import { toDisplayHost } from '@/lib/format';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';
import StatusBadge from './ui/StatusBadge';

const GITHUB_URL = 'https://github.com/fuad1789';

/** Stack strings are authored as "Next.js · MongoDB · Nginx" — one pill each. */
function toStackTags(stack?: string): string[] {
  if (!stack) return [];
  return stack
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean);
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const host = toDisplayHost(project.linkUrl);
  const tags = toStackTags(project.stack);

  return (
    <a
      href={project.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-interactive group flex h-full flex-col overflow-hidden"
    >
      {/* Screenshot inset in the card, the way product sites frame previews */}
      <div className="p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-muted">
          <Image
            src={`/screenshots${project.image}`}
            alt={`${project.name} — ${project.kind}`}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 560px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            {project.name}
          </h3>
          <span
            aria-hidden
            className="text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
          >
            ↗
          </span>
          <span className="ml-auto hidden text-sm text-fg-3 sm:block">{host}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge tone={project.statusTone} label={project.status} />
          <span className="text-sm text-fg-3">{project.kind}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-fg-2">{project.description}</p>

        {/* The achievement, given a highlighted callout rather than body text */}
        <div className="mt-4 rounded-xl border border-accent/15 bg-accent-soft px-4 py-3">
          {project.award ? (
            <p className="mb-1.5 text-sm font-semibold text-accent">
              {project.award.value} · {project.award.label}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-fg-2">{project.highlight}</p>
        </div>

        {tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="work" className="container-page py-16 sm:py-24">
      <SectionHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
        action={
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
          >
            {t.projects.seeAll}
            <span aria-hidden className="text-fg-3">
              ↗
            </span>
          </a>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <Reveal key={project.name} delay={(i % 2) * 0.06} y={16}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
