import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { type Metadata } from 'next';

const API_DIR = path.join(process.cwd(), 'api');

async function getHtmlFiles(dir: string, baseDir: string = API_DIR): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const paths: string[][] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (entry.isDirectory()) {
      paths.push(...await getHtmlFiles(fullPath, baseDir));
    } else if (entry.name === 'index.html') {
      // Para index.html, el slug es la carpeta
      const slug = relativePath === 'index.html' ? [] : path.dirname(relativePath).split(path.sep);
      paths.push(slug);
    } else if (entry.name.endsWith('.html')) {
      // Para otros .html, el slug es el nombre sin extensión
      const slug = path.join(path.dirname(relativePath), path.basename(entry.name, '.html')).split(path.sep);
      paths.push(slug);
    }
  }
  return paths;
}

function processHtml(html: string) {
  // 1. Limpiar enlaces de Dokka: "../../something/index.html" -> "../../something/"
  // Pero solo para enlaces locales
  return html.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    if (p1.startsWith('http')) return match;
    
    // Si termina en /index, lo quitamos
    let newPath = p1;
    if (newPath.endsWith('/index')) {
      newPath = newPath.slice(0, -5);
    }
    
    return `href="${newPath}/"`;
  });
}

export async function generateStaticParams() {
  const slugs = await getHtmlFiles(API_DIR);
  return slugs.map(slug => ({ slug }));
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const slug = params.slug ?? [];
  
  let filePath = path.join(API_DIR, ...slug);
  
  // Intentar encontrar el archivo: directo, index.html o carpeta/index.html
  let finalPath = '';
  const possiblePaths = [
    filePath + '.html',
    path.join(filePath, 'index.html'),
    filePath // por si acaso ya tiene .html
  ];

  for (const p of possiblePaths) {
    try {
      await fs.access(p);
      finalPath = p;
      break;
    } catch { continue; }
  }

  if (!finalPath) notFound();

  const htmlContent = await fs.readFile(finalPath, 'utf-8');
  const processedHtml = processHtml(htmlContent);

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
