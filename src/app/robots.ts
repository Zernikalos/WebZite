import type { MetadataRoute } from 'next';
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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
