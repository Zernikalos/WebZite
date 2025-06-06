/**
 * Entry point for MDX to React extractors
 * Combines the functionality of all extractors
 */

import * as cheerio from 'cheerio';
import { extractCleanText } from './base-extractors';

import { ClassPage, MemberPage, PackagePage, DocumentationPage } from './DocumentationPage';
import { DocumentationItem } from './DocumentationItem';
import { PageType } from './DocumentationPage';

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
    } else {
      console.log('No valid member property found, continuing with normal process...');
    }
  }

  if (DocumentationPage.isClassPage($)) {
    const classExtractor = new ClassPage($);
    classExtractor.parse($);
    return classExtractor;
  }
  
}

