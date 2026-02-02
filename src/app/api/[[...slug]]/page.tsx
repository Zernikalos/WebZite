import { notFound } from 'next/navigation';
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { type Metadata } from 'next';
import { getApiStaticParams, getApiFileContent, processDokkaHtml } from '../apiTools';

export async function generateStaticParams() {
  return getApiStaticParams();
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const slug = params.slug ?? [];
  
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
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];
  const title = slug.length > 0 ? slug[slug.length - 1] : 'API Reference';
  
  return {
    title: `${title} - Zernikalos API`,
    description: `API Reference for Zernikalos - ${slug.join('.')}`,
  };
}
