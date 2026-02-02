import * as cheerio from 'cheerio';
import {
  ExApiDefinition,
  ExApiDocItem,
  TokenType,
  GroupType,
  createEmptyDocItem
} from '../definitions';
import {
  extractDeclarationName,
  extractNameFromCover,
  extractDescription,
  extractSourceUrl,
  extractDocumentationUrl,
  extractTokenType,
  tokenTypeToGroupType,
  extractCodeBlocks,
  isRedundantMemberType
} from '../extractors';
import { IParser } from './IParser';

/**
 * Base parser with common functionality shared by all parsers
 */
export abstract class BaseParser<T extends ExApiDefinition> implements IParser<T> {
  abstract canParse($: cheerio.CheerioAPI): boolean;
  abstract parse($: cheerio.CheerioAPI, sourcePath: string): T | null;

  /**
   * Parse a single documentation item from an element
   *
   * @param $ - Cheerio API
   * @param element - Element containing the item
   * @param isTableContext - Whether this is in a table (affects URL handling)
   * @returns Parsed documentation item or null if invalid
   */
  protected parseDocumentationItem(
    $: cheerio.CheerioAPI,
    element: cheerio.Cheerio<any>,
    isTableContext: boolean = false
  ): ExApiDocItem | null {
    // Extract name
    const nameFromDeclaration = extractDeclarationName($, element);
    const nameFromCover = extractNameFromCover($, element);
    const name = nameFromDeclaration || nameFromCover;

    if (!name) {
      return null;
    }

    // Extract other fields
    const tokenType = extractTokenType($, element);
    const groupType = tokenTypeToGroupType(tokenType);
    const description = extractDescription($, element);
    const sourceUrl = extractSourceUrl($, element);
    const codeBlocks = extractCodeBlocks($, element);
    let url = extractDocumentationUrl($, element);

    // Handle URL filtering for table context
    if (isTableContext) {
      const isRedundant = isRedundantMemberType(tokenType);
      const isSimpleFunction = tokenType === TokenType.FUNCTION && !description.trim();

      if (isRedundant || isSimpleFunction) {
        url = '';
      }
    }

    return {
      name,
      tokenType,
      groupType,
      description,
      url,
      sourceUrl,
      codeBlocks
    };
  }

  /**
   * Find rows for a specific token type
   *
   * @param $ - Cheerio API
   * @param container - Container element
   * @param tokenType - Token type to find
   * @returns Rows for the token type or undefined
   */
  protected findTokenRows(
    $: cheerio.CheerioAPI,
    container: cheerio.Cheerio<any>,
    tokenType: string
  ): cheerio.Cheerio<any> | undefined {
    const section = container.find(`div[data-togglable="${tokenType}"]`);
    if (section.length === 0) {
      return undefined;
    }
    return section.find('.table-row');
  }
}
