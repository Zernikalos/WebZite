import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { normalizeBasePath } from '@/lib/normalizeBasePath';

export const dynamic = 'force-static';

function getSiteUrl(): string {
  // Prefer explicit configuration; fall back to production domain.
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    'https://zernikalos.dev'
  ).replace(/\/+$/, '');
}

function joinUrl(base: string, path: string): string {
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: joinUrl(siteUrl, `${basePath}/`),
      lastModified: now,
      priority: 1,
    },
    // API docs entry point (do not enumerate all endpoints)
    {
      url: joinUrl(siteUrl, `${basePath}/api/`),
      lastModified: now,
      priority: 0.5,
    },
  ];

  // `generateParams()` is already used by the docs route; leverage it here
  // to keep the sitemap aligned with the statically generated docs pages.
  const params = source.generateParams() as Array<{ slug?: string[] }>;

  for (const p of params) {
    const slugs = p.slug ?? [];
    const path = slugs.length ? `/docs/${slugs.join('/')}/` : '/docs/';
    entries.push({
      url: joinUrl(siteUrl, `${basePath}${path}`),
      lastModified: now,
      priority: 0.5,
    });
  }

  return entries;
}
