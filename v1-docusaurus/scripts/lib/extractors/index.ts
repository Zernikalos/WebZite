/**
 * Entry point for MDX to React extractors
 * Combines the functionality of all extractors
 */

import * as cheerio from 'cheerio';
import { ClassPage, MemberPage, PackagePage, DocumentationPage, LibraryPage } from './DocumentationPage';

/**
 * Unified function to extract information from HTML content
 * @param $ - Cheerio instance
 * @param content - HTML content
 * @returns DocumentationPage instance with extracted data
 */
export function extractData($: cheerio.CheerioAPI, content: string): DocumentationPage | undefined {
  if (DocumentationPage.isPackagePage($)) {
    const pageExtractor = new PackagePage($);
    pageExtractor.parse($);
    return pageExtractor;
  }

  if (DocumentationPage.isMemberPage($)) {
    const memberExtractor = new MemberPage($);
    memberExtractor.parse($);
    
    // Only process if a valid member property was found
    if (memberExtractor.hasDocumentationItems) {
      return memberExtractor;
    }
  }

  if (DocumentationPage.isClassPage($)) {
    const classExtractor = new ClassPage($);
    classExtractor.parse($);
    return classExtractor;
  }

  if (DocumentationPage.isLibraryPage($)) {
    const libraryExtractor = new LibraryPage($);
    libraryExtractor.parse($);
    return libraryExtractor;
  }
}

