import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideDetail from '@/components/guides/GuideDetail';
import { findGuide, guides } from '@/lib/guides';
import { loadGuide } from '@/lib/guides.server';

interface GuidePageProps {
  params: { slug: string };
}

/** The registry is the whole route table — anything else is a 404 at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = findGuide(params.slug);
  if (!guide) return {};

  const url = `/guides/${guide.slug}`;

  return {
    title: guide.title.az,
    description: guide.summary.az,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${guide.title.az} — Fuad Bağıyev`,
      description: guide.summary.az,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = findGuide(params.slug);
  if (!guide) notFound();

  const loaded = await loadGuide(guide);

  return <GuideDetail guide={loaded} />;
}
