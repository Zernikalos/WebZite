import * as cheerio from 'cheerio';
import { ExApiBreadcrumb } from '../definitions';
import { normalizeUrl } from '../routing/urlNormalizer';

/**
 * Extract breadcrumbs from a page
 *
 * @param $ - Cheerio API
 * @returns Array of breadcrumb items
 */
export function extractBreadcrumbs($: cheerio.CheerioAPI): ExApiBreadcrumb[] {
  const breadcrumbs: ExApiBreadcrumb[] = [];
  const breadcrumbContainer = $('.breadcrumbs');

  if (breadcrumbContainer.length === 0) {
    return breadcrumbs;
  }

  breadcrumbContainer.find('a').each((_, el) => {
    const link = $(el);
    const label = link.text().trim();
    const rawHref = link.attr('href') || '#';
    const normalized = normalizeUrl(rawHref);

    breadcrumbs.push({
      label,
      url: normalized.url
    });
  });

  return breadcrumbs;
}

/**
 * Extract namespace from breadcrumbs
 * Joins all breadcrumb labels with dots
 *
 * @param $ - Cheerio API
 * @returns Namespace string (e.g., "zernikalos.loader")
 */
export function extractNamespace($: cheerio.CheerioAPI): string {
  const breadcrumbs = extractBreadcrumbs($);
  return breadcrumbs.map(b => b.label).join('.');
}

/**
 * Extract the main name (current page) from breadcrumbs
 *
 * @param $ - Cheerio API
 * @returns Main name from .breadcrumbs .current
 */
export function extractMainName($: cheerio.CheerioAPI): string {
  const currentElement = $('.breadcrumbs .current');
  return currentElement.text().trim();
}

/**
 * Extract the title for a page
 * Uses main name without the zernikalos prefix
 *
 * @param $ - Cheerio API
 * @returns Page title
 */
export function extractTitle($: cheerio.CheerioAPI): string {
  const mainName = extractMainName($);
  return mainName.replace('zernikalos.', '');
}

/**
 * Extract available tokens (sourcesets) from the page
 *
 * @param $ - Cheerio API
 * @returns Array of token names
 */
export function extractAvailableTokens($: cheerio.CheerioAPI): string[] {
  const tokens: string[] = [];

  $('.tabs-section').each((_, element) => {
    $(element).find('[data-togglable]').each((_, togglable) => {
      const value = $(togglable).attr('data-togglable');

      if (value) {
        const tokenValues = value.split(',');
        for (const token of tokenValues) {
          if (!tokens.includes(token)) {
            tokens.push(token);
          }
        }
      }
    });
  });

  return tokens;
}
