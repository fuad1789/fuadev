import type { MetadataRoute } from 'next';
import { guides } from '@/lib/guides';
import { prompts } from '@/lib/prompts';

const SITE_URL = 'https://fuadev.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const promptPages: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${SITE_URL}/prompts/${prompt.slug}`,
    lastModified: new Date(prompt.updated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...promptPages,
    ...guidePages,
  ];
}
