import * as cheerio from 'cheerio';
import { ExApiLibraryDef, TokenType, createLibraryDef } from '../definitions';
import { BaseParser } from './BaseParser';

/**
 * Parser for Library pages (API root index)
 */
export class LibraryParser extends BaseParser<ExApiLibraryDef> {
  /**
   * Check if the page is a library page
   * Library pages have no data-page-type but have a "Packages" heading
   */
  canParse($: cheerio.CheerioAPI): boolean {
    const hasPageType = $('div[data-page-type]').length > 0;
    const hasPackagesHeader = $('h2:contains("Packages")').length > 0;
    return !hasPageType && hasPackagesHeader;
  }

  /**
   * Parse the library page
   */
  parse($: cheerio.CheerioAPI, sourcePath: string): ExApiLibraryDef | null {
    const mainContent = $('.main-content');
    const tableRows = mainContent.find('.table-row');
    const documentationItems = [];

    for (let i = 0; i < tableRows.length; i++) {
      const element = $(tableRows[i]);

      try {
        const item = this.parseDocumentationItem($, element, true);
        if (item) {
          // Force package type for library items
          item.tokenType = TokenType.PACKAGE;

          // Adjust URL for library index location
          // Since this page is moved inside -zernikalos folder,
          // remove the prefix from links to make them relative
          if (item.url && item.url.startsWith('-zernikalos/')) {
            item.url = item.url.replace(/^-zernikalos\//, '');
          }

          documentationItems.push(item);
        }
      } catch (error) {
        console.error(`Error parsing library item at index ${i}:`, error);
      }
    }

    return createLibraryDef({
      sourcePath,
      documentationItems
    });
  }
}
