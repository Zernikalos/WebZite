import * as cheerio from 'cheerio';
import { ExApiMemberDef, createMemberDef } from '../definitions';
import { extractTitle, extractMainName, extractNamespace, extractBreadcrumbs, extractAvailableTokens, extractDescription } from '../extractors';
import { BaseParser } from './BaseParser';

/**
 * Parser for Member pages (individual function, property, etc.)
 */
export class MemberParser extends BaseParser<ExApiMemberDef> {
  /**
   * Check if the page is a member page
   */
  canParse($: cheerio.CheerioAPI): boolean {
    return $('div[data-page-type="member"]').length > 0;
  }

  /**
   * Parse the member page
   */
  parse($: cheerio.CheerioAPI, sourcePath: string): ExApiMemberDef | null {
    const title = extractTitle($);
    const mainName = extractMainName($);
    const namespace = extractNamespace($);
    const breadcrumbs = extractBreadcrumbs($);
    const availableTokens = extractAvailableTokens($);

    const mainElement = $('.main-content');
    const documentationItems = [];

    try {
      const item = this.parseDocumentationItem($, mainElement, false);

      if (item) {
        // Only include if the item has meaningful content
        // Member pages without description are considered redundant
        const hasDescription = item.description && item.description.trim().length > 0;

        if (hasDescription) {
          documentationItems.push(item);
        }
      }
    } catch (error) {
      console.error('Error parsing member page:', error);
      return null;
    }

    // If no items with content, this page might be skipped
    // But we still return the definition for tracking purposes
    return createMemberDef({
      sourcePath,
      title,
      mainName,
      namespace,
      breadcrumbs,
      documentationItems,
      availableTokens
    });
  }

  /**
   * Check if a member page should be skipped
   * A member page is skipped if it has no documentation items
   *
   * @param definition - The parsed definition
   * @returns true if the page should be skipped
   */
  shouldSkip(definition: ExApiMemberDef): boolean {
    return definition.documentationItems.length === 0;
  }
}
