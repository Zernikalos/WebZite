import * as cheerio from 'cheerio';
import { normalizeUrl } from '../routing/urlNormalizer';

/**
 * Extracted link information
 */
export interface ExtractedLink {
  text: string;
  href: string;
  isExternal: boolean;
}

/**
 * Extract the documentation URL from an element
 * Looks for links in .inline-flex div a first, then any a
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Normalized URL or '#' if not found
 */
export function extractDocumentationUrl($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): string {
  // Try specific selector first
  let linkElement = element.find('div.inline-flex div a').first();

  if (linkElement.length === 0) {
    // Try generic selector
    linkElement = element.find('a').first();
  }

  if (linkElement.length > 0) {
    const href = linkElement.attr('href') || '#';
    const normalized = normalizeUrl(href);
    return normalized.url;
  }

  return '#';
}

/**
 * Extract all links from a code element
 *
 * @param $ - Cheerio API
 * @param element - Code element
 * @returns Array of extracted links
 */
export function extractLinks($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): ExtractedLink[] {
  const links: ExtractedLink[] = [];

  element.find('a').each((_, el) => {
    const link = $(el);
    const rawHref = link.attr('href') || '';
    const text = link.text().trim();

    if (!rawHref) return;

    const normalized = normalizeUrl(rawHref);

    // Skip same-directory member links (likely broken)
    if (!normalized.isExternal && !normalized.url.includes('/') && normalized.url !== './') {
      return;
    }

    if (normalized.url) {
      links.push({
        text,
        href: normalized.url,
        isExternal: normalized.isExternal
      });
    }
  });

  return links;
}

/**
 * Check if a URL should be kept or removed
 * Used for deciding whether to link to member pages
 *
 * @param href - URL to check
 * @param hasDescription - Whether the target has description content
 * @param isRedundantType - Whether the token type is typically redundant
 * @returns true if the URL should be kept
 */
export function shouldKeepUrl(
  href: string,
  hasDescription: boolean,
  isRedundantType: boolean
): boolean {
  // Always keep external links
  if (/^https?:\/\//.test(href)) return true;

  // Always keep anchor links
  if (href.startsWith('#')) return true;

  // Always keep index/directory links
  if (href === './' || href.endsWith('/index') || href.includes('/')) return true;

  // Skip redundant member types without description
  if (isRedundantType || !hasDescription) return false;

  return true;
}
