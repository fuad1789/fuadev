import type { Metadata } from 'next';
import PromptsIndex from '@/components/prompts/PromptsIndex';
import { loadPrompts } from '@/lib/prompts.server';

const TITLE = 'Promptlar';
const DESCRIPTION =
  'Videolarımda istifadə etdiyim AI promptlarının tam mətni — kopyalayıb Claude, ChatGPT və ya Gemini-də işlədə bilərsiniz.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/prompts' },
  openGraph: {
    type: 'website',
    url: '/prompts',
    title: `${TITLE} — Fuad Bağıyev`,
    description: DESCRIPTION,
  },
};

export default async function PromptsPage() {
  const prompts = await loadPrompts();

  return <PromptsIndex prompts={prompts} />;
}
