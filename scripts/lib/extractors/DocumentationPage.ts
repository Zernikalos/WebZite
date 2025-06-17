import * as cheerio from 'cheerio';
import { extractText } from './base-extractors';
import { DocumentationItem } from './DocumentationItem';
import _ from 'lodash';

export enum PageType {
  MEMBER = 'member',
  PACKAGE = 'package',
  CLASS = 'classlike'
}

export abstract class DocumentationPage {

  public documentationItems: DocumentationItem[] = [];
  public abstract pageType: PageType;

  constructor(protected $: cheerio.CheerioAPI) {
  }

  public static isMemberPage($: cheerio.CheerioAPI): boolean {
    return $('div[data-page-type="member"]').length > 0;
  }

  public static isPackagePage($: cheerio.CheerioAPI): boolean {
    return $('div[data-page-type="package"]').length > 0;
  }

  public static isClassPage($: cheerio.CheerioAPI): boolean {
    return $('div[data-page-type="classlike"]').length > 0;
  }

  public get hasDocumentationItems(): boolean {
    return !_.isEmpty(this.documentationItems);
  }

  public get title(): string {
    const mainName = this.mainName;
    return mainName.replace('zernikalos.', '');
  }

  public get namespace(): string {
    let namespace = '';
    const breadcrumbs = this.$('.breadcrumbs');
    if (breadcrumbs.length > 0) {
      // Extract all breadcrumb elements except the last one (which is the current title)
      const breadcrumbItems = breadcrumbs.find('a');
      const parts: string[] = [];
      breadcrumbItems.each((_, item) => {
        parts.push(this.$(item).text().trim());
      });
      
      if (parts.length > 0) {
        namespace = parts.join('.');
      }
    }
    return namespace;
  }

  /**
   * Checks if the page is a member page
   * @returns True if it's a member page, false otherwise
   */
  get isMemberPage(): boolean {
    return this.$('.main-content[data-page-type="member"]').length > 0;
  }

  /**
   * Checks if the page is a package page
   * @returns True if it's a package page, false otherwise
   */
  get isPackagePage(): boolean {
    return this.$('.main-content[data-page-type="package"]').length > 0;
  }

  /**
   * Checks if the page is a class page
   * @returns True if it's a class page, false otherwise
   */
  get isClassPage(): boolean {
    return this.$('.main-content[data-page-type="classlike"]').length > 0;
  }

  get mainName(): string {
    const currentElement = this.$('.breadcrumbs .current');
    return extractText(currentElement);
  }

  get availableTokens(): string[] {
    const tokens: string[] = [];

    // Find all elements with class tabs-section
    this.$('.tabs-section').each((i, element) => {
      // Find elements that have the data-togglable attribute
      this.$(element).find('[data-togglable]').each((j, togglableElement) => {
        const togglableValue = this.$(togglableElement).attr('data-togglable');

        // If the value exists and contains commas, split it into individual tokens
        if (togglableValue) {
          const tokenValues = togglableValue.split(',');

          // Add each token to the array if it doesn't already exist
          tokenValues.forEach(token => {
            if (!tokens.includes(token)) {
              tokens.push(token);
            }
          });
        }
      });
    });

    return tokens;
  }

  public abstract parse($: cheerio.CheerioAPI): void;

  /**
   * Filters elements by their data-togglable type
   * @param $ - Cheerio instance
   * @param type - Type of element to filter
   * @returns Filtered elements
   */
  protected static filterElementsByDataToggleType(element: cheerio.Cheerio<any>, type: string): cheerio.Cheerio<any> {
    return element.find('div[data-togglable="' + type + '"]');
  }

  /**
   * Finds the rows of elements for a specific type
   * @param $ - Cheerio instance
   * @param type - Type of element to look for
   * @returns Array of found rows
   */
  protected static findTokenRows(element: cheerio.Cheerio<any>, type: string): cheerio.Cheerio<any> | undefined {
    const section = DocumentationPage.filterElementsByDataToggleType(element, type);
    if (section.length === 0) {
      return undefined;
    }

    return section.find('.table-row');
  }

}

export class MemberPage extends DocumentationPage {

  public pageType: PageType = PageType.MEMBER;

  constructor($: cheerio.CheerioAPI) {
    super($);
  }

  public parse($: cheerio.CheerioAPI): void {
    // Use the main element to extract the code block
    const mainElement = $('.main-content');
    const documentationItem = new DocumentationItem();
    
    try {
      documentationItem.parse($, mainElement);
      this.documentationItems.push(documentationItem);
    } catch (error) {
      console.error('Error parsing documentation item:', error);
      // No añadimos el item si hubo un error en el parseo
      return;
    }
  }
}

export class ClassPage extends DocumentationPage {

  public pageType: PageType = PageType.CLASS;

  constructor($: cheerio.CheerioAPI) {
    super($);
  }

  public parse($: cheerio.CheerioAPI): void {
    const tabSectionBody = $('.tabs-section-body')

    for (const availableToken of this.availableTokens) {
      const tokens = DocumentationPage.findTokenRows(tabSectionBody, availableToken);
      if (!tokens) {
        continue;
      }

      // Use the Cheerio each method to iterate over the tokens
      tokens.each((i, tokenElement) => {
        try {
          const documentationItem = new DocumentationItem();
          documentationItem.parse($, $(tokenElement));
          this.documentationItems.push(documentationItem);
        } catch (error) {
          throw error;
        }
      });
    }
  }
}


export class PackagePage extends DocumentationPage {

  public pageType: PageType = PageType.PACKAGE;

  constructor($: cheerio.CheerioAPI) {
    super($);
  }

  public parse($: cheerio.CheerioAPI): void {
    const tabSectionBody = $('.tabs-section-body')

    for (const availableToken of this.availableTokens) {
      const tokens = DocumentationPage.findTokenRows(tabSectionBody, availableToken);
      if (!tokens) {
        continue;
      }

      // Use the Cheerio each method to iterate over the tokens
      tokens.each((i, tokenElement) => {
        try {
          const documentationItem = new DocumentationItem();
          documentationItem.parse($, $(tokenElement));
          this.documentationItems.push(documentationItem);
        } catch (error) {
          throw error;
        }
      });
    }
  }
}
