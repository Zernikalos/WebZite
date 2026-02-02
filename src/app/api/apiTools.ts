import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { type PageTree } from 'fumadocs-core/server';

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

  // Next.js (with output: 'export') requires every visited param to exist in generateStaticParams.
  // Since our rendered HTML contains URL-encoded segments (e.g. "%5B-android%5D-zernikalos"),
  // we must include BOTH decoded and encoded variants here.
  const out: { slug: string[] }[] = [];
  const seen = new Set<string>();

  for (const slug of allSlugs) {
    const decodedKey = slug.join('/');
    if (!seen.has(decodedKey)) {
      out.push({ slug });
      seen.add(decodedKey);
    }

    const encodedSlug = slug.map((s) => encodeURIComponent(s));
    const encodedKey = encodedSlug.join('/');
    if (encodedKey !== decodedKey && !seen.has(encodedKey)) {
      out.push({ slug: encodedSlug });
      seen.add(encodedKey);
    }
  }

  return out;
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
 * Parses api/navigation.html and builds a Fumadocs PageTree.
 */
export async function getApiNavigationTree(): Promise<PageTree.Root> {
  try {
    const navigationPath = path.join(process.cwd(), 'api', 'navigation.html');
    const html = await fs.readFile(navigationPath, 'utf-8');
    const $ = cheerio.load(html, null, false);
    
    // Recursive function to build the tree from DOM elements
    function buildTree($element: cheerio.Cheerio<cheerio.Element>): PageTree.Item[] {
      const items: PageTree.Item[] = [];
      
      // Each .toc--part represents a node in the tree
      // The structure is flat in the DOM for direct children of a container,
      // but nested parts are inside the parent .toc--part div.
      
      // We iterate over direct .toc--part children of the current element
      $element.children('.toc--part').each((_, el) => {
        const $part = $(el);
        const $row = $part.children('.toc--row');
        const $link = $row.find('a.toc--link');
        
        if ($link.length === 0) return;
        
        const rawHref = $link.attr('href') || '';
        let name = $link.text().trim();
        
        // Simplify names by removing common prefixes to make the sidebar less verbose
        name = name.replace(/^zernikalos\./i, '');
        
        // Clean up the href to match our routing
        // Example: "-zernikalos/zernikalos/index.html" -> "/api/-zernikalos/zernikalos/"
        let urlPath = rawHref
          .replace(/index\.html$/, '')
          .replace(/\.html$/, '');
          
        // Split into parts, removing empty ones, and prefix with 'api'
        const parts = urlPath.split('/').filter(p => p !== '' && p !== '.');
        const fullPathSegments = ['api', ...parts];
        
        // Build the final encoded URL with trailing slash
        const encodedUrl = '/' + fullPathSegments
          .map(p => encodeURIComponent(decodeURIComponent(p)))
          .join('/') + '/';
        
        // Check if it has children
        const children = buildTree($part);
        
        if (children.length > 0) {
          items.push({
            type: 'folder',
            name: name,
            url: encodedUrl, 
            children: children,
            defaultOpen: true 
          });
        } else {
          items.push({
            type: 'page',
            name: name,
            url: encodedUrl
          });
        }
      });
      
      return items;
    }

    // Start parsing from the root
    const rootItems = buildTree($.root());
    
    // If the tree starts with a single "Zernikalos" root node (common in Dokka),
    // flatten it so the packages/classes are visible at the top level of the sidebar.
    let finalItems = rootItems;
    if (rootItems.length === 1 && rootItems[0].type === 'folder') {
      finalItems = rootItems[0].children;
    }

    return {
      name: 'API Reference',
      children: finalItems
    };

  } catch (error) {
    console.warn('Failed to generate API navigation tree:', error);
    // Fallback to empty tree if file missing or parse error
    return {
      name: 'API Reference',
      children: []
    };
  }
}

/**
 * Processes Dokka HTML:
 * 1. Removes external scripts/styles.
 * 2. Converts relative links to absolute links based on the current slug.
 * 3. Adds extra classes for better CSS targeting.
 */
export function processDokkaHtml(html: string, currentSlug: string[], isIndex: boolean): string {
  const $ = cheerio.load(html, null, false);
  
  $('script, link[rel="stylesheet"]').remove();

  // Add a class to help with card layout if it's a table
  $('.table').addClass('api-cards-grid');
  
  // Base absolute path for current page
  const slugPathParts = isIndex ? currentSlug : currentSlug.slice(0, -1);
  const currentBasePath = path.posix.join('/api', ...slugPathParts);
  
  $('a').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    
    if (!href || /^(http|\/\/|#|mailto:)/.test(href)) return;

    const [urlPath, hash] = href.split('#');
    
    let absolutePath = path.posix.join(currentBasePath, urlPath);
    
    absolutePath = absolutePath
      .replace(/(\/index)?\.html$/, '') 
      .replace(/\/+$/, '')              
      + '/';                            
      
    absolutePath = absolutePath.replace(/\/+/g, '/');
    
    // Consistent encoding: encode each segment to match the sidebar tree
    absolutePath = absolutePath.split('/').map(p => {
      if (p === '') return '';
      return encodeURIComponent(decodeURIComponent(p));
    }).join('/');

    $el.attr('href', hash ? `${absolutePath}#${hash}` : absolutePath);
  });

  return $.html();
}
