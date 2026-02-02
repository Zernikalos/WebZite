import * as cheerio from 'cheerio';
import { ExApiDefinition, PageType } from '../definitions';
import { IParser } from './IParser';
import { LibraryParser } from './LibraryParser';
import { PackageParser } from './PackageParser';
import { ClassParser } from './ClassParser';
import { MemberParser } from './MemberParser';

export { IParser } from './IParser';
export { BaseParser } from './BaseParser';
export { LibraryParser } from './LibraryParser';
export { PackageParser } from './PackageParser';
export { ClassParser } from './ClassParser';
export { MemberParser } from './MemberParser';

/**
 * All available parsers in detection order
 */
const parsers: IParser[] = [
  new MemberParser(),
  new PackageParser(),
  new ClassParser(),
  new LibraryParser()
];

/**
 * Detect the page type from HTML
 *
 * @param $ - Cheerio API loaded with HTML
 * @returns Detected page type or null
 */
export function detectPageType($: cheerio.CheerioAPI): PageType | null {
  if ($('div[data-page-type="member"]').length > 0) {
    return PageType.MEMBER;
  }
  if ($('div[data-page-type="package"]').length > 0) {
    return PageType.PACKAGE;
  }
  if ($('div[data-page-type="classlike"]').length > 0) {
    return PageType.CLASS;
  }
  // Library page detection
  const hasPageType = $('div[data-page-type]').length > 0;
  const hasPackagesHeader = $('h2:contains("Packages")').length > 0;
  if (!hasPageType && hasPackagesHeader) {
    return PageType.LIBRARY;
  }
  return null;
}

/**
 * Get the appropriate parser for an HTML page
 *
 * @param $ - Cheerio API loaded with HTML
 * @returns Parser that can handle the page or null
 */
export function getParser($: cheerio.CheerioAPI): IParser | null {
  for (const parser of parsers) {
    if (parser.canParse($)) {
      return parser;
    }
  }
  return null;
}

/**
 * Parse HTML into a definition using the appropriate parser
 *
 * @param $ - Cheerio API loaded with HTML
 * @param sourcePath - Path to the source file
 * @returns Parsed definition or null
 */
export function parseHtml($: cheerio.CheerioAPI, sourcePath: string): ExApiDefinition | null {
  const parser = getParser($);
  if (!parser) {
    return null;
  }
  return parser.parse($, sourcePath);
}

/**
 * Get a parser for a specific page type
 *
 * @param pageType - The page type
 * @returns Parser for the type
 */
export function getParserForType(pageType: PageType): IParser {
  switch (pageType) {
    case PageType.LIBRARY:
      return new LibraryParser();
    case PageType.PACKAGE:
      return new PackageParser();
    case PageType.CLASS:
      return new ClassParser();
    case PageType.MEMBER:
      return new MemberParser();
  }
}
