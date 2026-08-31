import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PromptDetail from '@/components/prompts/PromptDetail';
import { findPrompt, prompts } from '@/lib/prompts';
import { loadPrompt } from '@/lib/prompts.server';

interface PromptPageProps {
  params: { slug: string };
}

/** The registry is the whole route table — anything else is a 404 at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return prompts.map((prompt) => ({ slug: prompt.slug }));
}

export function generateMetadata({ params }: PromptPageProps): Metadata {
  const prompt = findPrompt(params.slug);
  if (!prompt) return {};

  const url = `/prompts/${prompt.slug}`;

  return {
    title: prompt.title,
    description: prompt.summary.az,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${prompt.title} — Fuad Bağıyev`,
      description: prompt.summary.az,
    },
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const prompt = findPrompt(params.slug);
  if (!prompt) notFound();

  const loaded = await loadPrompt(prompt);

  return <PromptDetail prompt={loaded} />;
}
