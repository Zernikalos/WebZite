import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';

/**
 * Recursively finds all HTML files in the API directory and returns their slugs.
 */
export async function getApiStaticParams(): Promise<{ slug: string[] }[]> {
  const apiRoot = path.join(process.cwd(), 'api');
  
  async function scan(dir: string): Promise<string[][]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const slugs: string[][] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        slugs.push(...await scan(fullPath));
      } else if (entry.name.endsWith('.html')) {
        const relPath = path.relative(apiRoot, fullPath);
        const dirName = path.dirname(relPath);
        const name = path.basename(relPath, '.html');
        
        const slugParts = name === 'index' 
          ? (dirName === '.' ? [] : dirName.split(path.sep))
          : [...dirName.split(path.sep).filter(p => p !== '.'), name];
          
        slugs.push(slugParts);
      }
    }
    return slugs;
  }

  const allSlugs = await scan(apiRoot);
  return allSlugs.map(slug => ({ slug }));
}

/**
 * Attempts to read the HTML file for a given slug.
 * Returns the content and whether it was an index.html file.
 */
export async function getApiFileContent(slug: string[]): Promise<{ content: string, isIndex: boolean } | null> {
  const relPath = slug.join('/');
  
  // 1. Try directory/index.html
  try {
    const p1 = path.join(process.cwd(), 'api', relPath, 'index.html');
    const content = await fs.readFile(p1, 'utf-8');
    return { content, isIndex: true };
  } catch {
    // 2. Try file.html
    try {
      const p2 = path.join(process.cwd(), 'api', relPath + '.html');
      const content = await fs.readFile(p2, 'utf-8');
      return { content, isIndex: false };
    } catch {
      return null;
    }
  }
}

/**
 * Processes Dokka HTML:
 * 1. Removes external scripts/styles.
 * 2. Converts relative links to absolute links based on the current slug.
 * 
 * @param isIndex Whether the current file is an 'index.html'. 
 *                If false, relative links should be resolved from the parent directory.
 */
export function processDokkaHtml(html: string, currentSlug: string[], isIndex: boolean): string {
  const $ = cheerio.load(html, null, false);
  
  $('script, link[rel="stylesheet"]').remove();
  
  // Critical: If it's NOT an index file, the relative links in the HTML 
  // are relative to the PARENT directory of the slug.
  const slugPathParts = isIndex ? currentSlug : currentSlug.slice(0, -1);
  const currentBasePath = path.posix.join('/api', ...slugPathParts);
  
  $('a').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    
    if (!href || /^(http|\/\/|#|mailto:)/.test(href)) return;

    const [urlPath, hash] = href.split('#');
    
    // Resolve absolute path from the correct base
    let absolutePath = path.posix.join(currentBasePath, urlPath);
    
    // Normalize path for Next.js (trailingSlash: true)
    absolutePath = absolutePath
      .replace(/(\/index)?\.html$/, '') 
      .replace(/\/+$/, '')              
      + '/';                            
      
    absolutePath = absolutePath.replace(/\/+/g, '/');

    $el.attr('href', hash ? `${absolutePath}#${hash}` : absolutePath);
  });

  return $.html();
}
