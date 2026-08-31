'use client';

import { useLanguage } from '@/app/providers';
import type { LoadedPrompt } from '@/lib/prompts';
import Reveal from '@/components/ui/Reveal';
import PromptCard from './PromptCard';

export default function PromptsIndex({ prompts }: { prompts: LoadedPrompt[] }) {
  const { t } = useLanguage();

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-prose">
        <span className="text-sm font-medium text-accent">{t.prompts.eyebrow}</span>
        <h1 className="mt-2 text-[2rem] font-semibold leading-[1.12] sm:text-[2.75rem]">
          {t.prompts.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-2">{t.prompts.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-3">{t.prompts.lede}</p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {prompts.map((prompt, index) => (
          <Reveal as="li" key={prompt.slug} delay={(index % 2) * 0.05} y={14}>
            <PromptCard prompt={prompt} body={prompt.body} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
