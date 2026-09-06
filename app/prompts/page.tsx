import type { Metadata } from 'next';
import CopyCountProvider from '@/components/prompts/CopyCountProvider';
import PromptsIndex from '@/components/prompts/PromptsIndex';
import { COPY_COUNTS_REVALIDATE_SECONDS, loadCopyCounts } from '@/lib/copy-counter';
import { loadPrompts } from '@/lib/prompts.server';

/** Rebuilds the page periodically so the copy counts do not go stale. */
export const revalidate = COPY_COUNTS_REVALIDATE_SECONDS;

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
  const [prompts, counts] = await Promise.all([loadPrompts(), loadCopyCounts()]);

  return (
    <CopyCountProvider initialCounts={counts}>
      <PromptsIndex prompts={prompts} />
    </CopyCountProvider>
  );
}
