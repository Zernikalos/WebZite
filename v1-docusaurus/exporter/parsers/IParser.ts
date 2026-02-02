import * as cheerio from 'cheerio';
import { ExApiDefinition } from '../definitions';

/**
 * Parser interface for HTML to Definition conversion
 * Each parser handles a specific page type
 */
export interface IParser<T extends ExApiDefinition = ExApiDefinition> {
  /**
   * Check if this parser can handle the given HTML
   * @param $ - Cheerio API loaded with HTML
   * @returns true if this parser should handle the page
   */
  canParse($: cheerio.CheerioAPI): boolean;

  /**
   * Parse the HTML into a definition object
   * @param $ - Cheerio API loaded with HTML
   * @param sourcePath - Path to the source HTML file
   * @returns Parsed definition or null if parsing fails
   */
  parse($: cheerio.CheerioAPI, sourcePath: string): T | null;
}
