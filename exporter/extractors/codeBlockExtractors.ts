import * as cheerio from 'cheerio';
import { ExApiCodeBlock, ExApiCodeLink } from '../definitions';

/**
 * Extract code blocks from an element
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Array of code blocks
 */
export function extractCodeBlocks($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): ExApiCodeBlock[] {
  const codeBlocks: ExApiCodeBlock[] = [];

  element.find('.sourceset-dependent-content').each((_, el) => {
    const codeBlock = extractSingleCodeBlock($, $(el));
    codeBlocks.push(codeBlock);
  });

  return codeBlocks;
}

/**
 * Extract a single code block from a sourceset element
 *
 * @param $ - Cheerio API
 * @param element - Sourceset element
 * @returns Extracted code block
 */
export function extractSingleCodeBlock($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): ExApiCodeBlock {
  // Extract platform from data-togglable
  const platformAttr = element.attr('data-togglable') || '';
  const platform = platformAttr.replace(':/', '').replace('Main', '');

  // Find code element
  const codeElement = element.find('.symbol.monospace');

  // Extract source URL
  const sourceLinkElement = codeElement.find('span.floating-right a');
  const sourceContainer = sourceLinkElement.closest('span.clearfix');
  const sourceUrl = sourceLinkElement.attr('href') || null;

  // Extract code lines
  const lines: string[] = [];
  let currentLine = '';

  codeElement.contents().each((_, node) => {
    const $node = $(node);

    // Skip the source container
    if (sourceContainer.length > 0 && $node[0] === sourceContainer[0]) {
      return;
    }

    // Block elements force new lines
    if (node.type === 'tag' && $node.is('div.block')) {
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      lines.push($node.text().trim());
    } else {
      currentLine += $node.text();
    }
  });

  // Add last line
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // Clean up lines
  const code = lines
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line);

  // Extract links (currently disabled in original code)
  // const links = extractCodeLinks($, codeElement);
  const links: ExApiCodeLink[] = [];

  return {
    platform,
    code,
    links,
    sourceUrl
  };
}

/**
 * Extract links from within a code block
 * Note: Currently disabled in the original codebase
 *
 * @param $ - Cheerio API
 * @param codeElement - Code element
 * @returns Array of links
 */
export function extractCodeLinks($: cheerio.CheerioAPI, codeElement: cheerio.Cheerio<any>): ExApiCodeLink[] {
  const links: ExApiCodeLink[] = [];

  codeElement.find('a').each((_, el) => {
    const link = $(el);
    let href = link.attr('href') || '';
    const text = link.text().trim();

    if (!href) return;

    // Skip external links
    if (/^https?:\/\//.test(href) || href.startsWith('#')) {
      links.push({ text, href });
      return;
    }

    // Normalize internal links
    href = href.replace(/\.html$/, '');

    // Handle index files
    if (href === 'index' || href.endsWith('/index')) {
      href = href.replace(/\/index$/, '') || './';
    } else {
      // Skip same-directory member links to avoid broken links
      if (!href.includes('/')) {
        return;
      }
    }

    // Add trailing slash
    if (href && href !== './' && !href.includes('#') && !href.endsWith('/')) {
      href += '/';
    }

    if (href) {
      links.push({ text, href });
    }
  });

  return links;
}
