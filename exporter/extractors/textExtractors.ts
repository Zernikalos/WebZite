import * as cheerio from 'cheerio';

/**
 * Classes that should be ignored when extracting text
 */
const IGNORED_CLASSES = [
  'copy-popup-wrapper',
  'anchor-wrapper',
  'anchor-icon',
  'floating-right',
  'clearfix'
];

/**
 * Text patterns to ignore
 */
const IGNORED_TEXT = [
  'Link copied to clipboard',
  'Copy',
  'copy-popup-icon'
];

/**
 * Extract simple text from a Cheerio element
 * @param element - Cheerio element
 * @returns Trimmed text content
 */
export function extractText(element: cheerio.Cheerio<any>): string {
  if (!element || element.length === 0) return '';
  return element.text().trim();
}

/**
 * Extract clean text from an element, recursively processing children
 * Ignores UI elements like copy buttons and anchor icons
 *
 * @param $  - Cheerio API instance
 * @param node - Node to extract from
 * @returns Clean text with preserved line breaks for block elements
 */
export function extractCleanText($: cheerio.CheerioAPI, node: any): string {
  if (!node) return '';

  let result = '';
  const $node = $(node);

  // Check if node should be ignored
  for (const className of IGNORED_CLASSES) {
    if ($node.hasClass(className)) {
      return '';
    }
  }

  // Check for ignored text patterns
  const nodeText = $node.text().trim();
  if (IGNORED_TEXT.includes(nodeText)) {
    return '';
  }

  // Process children
  $node.contents().each((_, child) => {
    if (child.type === 'text') {
      result += $(child).text();
    } else if (child.type === 'tag') {
      const $child = $(child);

      // Preserve line breaks for block elements
      if ($child.hasClass('block')) {
        if (result.length > 0 && !result.endsWith('\n')) {
          result += '\n';
        }
        result += extractCleanText($, child);
        if (!result.endsWith('\n')) {
          result += '\n';
        }
      } else {
        result += extractCleanText($, child);
      }
    }
  });

  return result;
}

/**
 * Extract description from a documentation element
 * Looks for .brief p or .brief .paragraph
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Description text with quotes escaped
 */
export function extractDescription($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): string {
  const descElement = element.find('.brief p, .brief .paragraph');
  if (descElement.length > 0) {
    return descElement.text().trim().replace(/"/g, '&quot;');
  }
  return '';
}

/**
 * Extract the declaration name from an element
 * Tries .inline-flex div a first, then .inline-flex > div:first-child
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Declaration name
 */
export function extractDeclarationName($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): string {
  // Try link first
  const nameElement = element.find('.inline-flex div a');
  if (nameElement.length > 0) {
    return nameElement.text().trim();
  }

  // Try first div
  const divElement = element.find('.inline-flex > div:first-child');
  if (divElement.length > 0) {
    return divElement.text().trim();
  }

  return '';
}

/**
 * Extract name from a cover element (h1.cover)
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Name with whitespace collapsed
 */
export function extractNameFromCover($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): string {
  const coverElement = element.find('h1.cover');
  if (coverElement.length === 0) return '';
  return coverElement.text().replace(/\s+/g, '');
}

/**
 * Extract source URL from a floating-right link
 *
 * @param $ - Cheerio API
 * @param element - Container element
 * @returns Source URL or empty string
 */
export function extractSourceUrl($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): string {
  const sourceLink = element.find('.floating-right a');
  return sourceLink.attr('href') || '';
}
