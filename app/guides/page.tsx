import type { Metadata } from 'next';
import GuidesIndex from '@/components/guides/GuidesIndex';
import { loadGuides } from '@/lib/guides.server';

const TITLE = 'Bələdçilər';
const DESCRIPTION =
  'Videolarımdakı prosesin yazılı, addım-addım versiyası — deployment, domen və qurulma mərhələləri. Qeydiyyat yoxdur.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/guides' },
  openGraph: {
    type: 'website',
    url: '/guides',
    title: `${TITLE} — Fuad Bağıyev`,
    description: DESCRIPTION,
  },
};

export default async function GuidesPage() {
  const guides = await loadGuides();

  return <GuidesIndex guides={guides} />;
}
