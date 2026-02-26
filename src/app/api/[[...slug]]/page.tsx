import { notFound } from 'next/navigation';
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { type Metadata } from 'next';
import { getApiStaticParams, getApiFileContent, processDokkaHtml } from '../apiTools';
import ApiToggles from '../ApiToggles';
import { normalizeBasePath } from '@/lib/normalizeBasePath';

export const dynamicParams = false;

function safeDecodeSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function decodeSlug(rawSlug: string[]): string[] {
  return rawSlug.map((part) => safeDecodeSegment(part));
}

export async function generateStaticParams() {
  const params = await getApiStaticParams();

  // With `output: 'export'`, optional catch-all routes must explicitly include the
  // base route (i.e. `/api/`) in `generateStaticParams()`.
  const out: Array<{ slug?: string[] }> = [{ slug: [] }, ...params];

  // De-dupe while keeping stable order.
  const seen = new Set<string>();
  return out.filter((p) => {
    const key = (p.slug ?? []).join('/');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const rawSlug = params.slug ?? [];

  // Next may provide URL-encoded path segments (e.g. "%5B-android%5D-zernikalos").
  // Decode them for filesystem lookup, while keeping the original for metadata if needed.
  const slug = decodeSlug(rawSlug);
  
  let htmlData: { content: string, isIndex: boolean } | null = null;
  let processingSlug = slug;

  // Caso especial: /api/-zernikalos
  if (slug.length === 1 && slug[0] === '-zernikalos') {
    htmlData = await getApiFileContent([]);
    processingSlug = [];
  } else {
    htmlData = await getApiFileContent(slug);
  }
  
  if (!htmlData) {
    notFound();
  }

  // Ahora pasamos htmlData.isIndex para que la resolución de rutas sea correcta
  const processedHtml = processDokkaHtml(htmlData.content, processingSlug, htmlData.isIndex);

  return (
    <DocsPage full>
      <DocsBody className="dokka-container">
        <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
        <ApiToggles />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const rawSlug = params.slug ?? [];
  const slug = decodeSlug(rawSlug);
  const title = slug.length > 0 ? slug[slug.length - 1] : 'API Reference';

  // Canonicalize "index" variants and legacy Dokka entry points (e.g. /api/-zernikalos/)
  // so Google doesn't treat them as separate pages.
  const normalizedSlug = (() => {
    if (slug.length === 1 && slug[0] === '-zernikalos') return [];
    if (slug.length > 0 && slug[slug.length - 1] === 'index') return slug.slice(0, -1);
    return slug;
  })();

  const canonicalPath =
    normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH) +
    '/api' +
    (normalizedSlug.length
      ? '/' +
        normalizedSlug
          .map((segment) => encodeURIComponent(segment))
          .join('/')
      : '') +
    '/';

  return {
    title: `${title} - Zernikalos API`,
    description: `API Reference for Zernikalos - ${slug.join('.')}`,
    alternates: {
      canonical: canonicalPath,
    },
  };
}
