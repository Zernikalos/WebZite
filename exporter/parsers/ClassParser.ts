import * as cheerio from 'cheerio';
import { ExApiClassDef, ExApiDocItem, createClassDef } from '../definitions';
import { extractTitle, extractMainName, extractNamespace, extractBreadcrumbs, extractAvailableTokens } from '../extractors';
import { BaseParser } from './BaseParser';

/**
 * Parser for Class pages (class, interface, object, enum)
 */
export class ClassParser extends BaseParser<ExApiClassDef> {
  /**
   * Check if the page is a class-like page
   */
  canParse($: cheerio.CheerioAPI): boolean {
    return $('div[data-page-type="classlike"]').length > 0;
  }

  /**
   * Parse the class page
   */
  parse($: cheerio.CheerioAPI, sourcePath: string): ExApiClassDef | null {
    const title = extractTitle($);
    const mainName = extractMainName($);
    const namespace = extractNamespace($);
    const breadcrumbs = extractBreadcrumbs($);
    const availableTokens = extractAvailableTokens($);

    const tabSectionBody = $('.tabs-section-body');
    const documentationItems: ExApiDocItem[] = [];

    // Parse items for each available token type
    for (const token of availableTokens) {
      const rows = this.findTokenRows($, tabSectionBody, token);
      if (!rows) continue;

      rows.each((_, element) => {
        try {
          const item = this.parseDocumentationItem($, $(element), true);
          if (item) {
            documentationItems.push(item);
          }
        } catch (error) {
          // Skip items that fail to parse
        }
      });
    }

    return createClassDef({
      sourcePath,
      title,
      mainName,
      namespace,
      breadcrumbs,
      documentationItems,
      availableTokens
    });
  }
}
