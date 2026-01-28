import * as cheerio from 'cheerio';
import { CodeBlock } from "./CodeBlock";
import _ from 'lodash';

/**
 * Element types enum
 */
export enum GroupType {
  NONE = 'NONE',
  PACKAGE = 'PACKAGE',
  CONSTRUCTOR = 'CONSTRUCTOR',
  PROPERTY = 'PROPERTY',
  ENUM_ENTRY = 'ENUM_ENTRY',
  FUNCTION = 'FUNCTION',
  TYPE = 'TYPE',
  OBJECT = 'OBJECT'
}

export enum TokenType {
  PACKAGE = 'package',
  CLASS = 'class',
  DATA_CLASS = 'data class',
  CONSTRUCTOR = 'constructor',
  INTERFACE = 'interface',
  OBJECT = 'object',
  FUNCTION = 'fun',
  VAL = 'val',
  VAR = 'var',
  ENUM = 'enum',
  ENUM_ENTRY = 'enum entry',
  NONE = ''
}

/**
 * Interface for code element extraction result
 */
export class DocumentationItem {
  name: string;
  groupType: GroupType;
  tokenType: TokenType;
  codeBlocks: CodeBlock[];
  description?: string;
  url?: string;
  sourceUrl?: string;

  constructor({ name = '', type = GroupType.NONE, tokenType = TokenType.NONE, codeBlocks = [], description = '', url = '', sourceUrl = '' }: { name?: string; type?: GroupType; tokenType?: TokenType; codeBlocks?: CodeBlock[]; description?: string; url?: string; sourceUrl?: string; } = {}) {
    this.name = name;
    this.codeBlocks = codeBlocks;
    this.description = description;
    this.url = url;
    this.sourceUrl = sourceUrl;
    this.groupType = type;
    this.tokenType = tokenType;
  }

  /**
   * Extracts the name of a declaration
   * @param element - Container element
   * @param $ - Cheerio instance
   * @returns Name of the declaration
   */
  private static extractDeclarationName(element: cheerio.Cheerio<any>): string {
    const nameElement = element.find('.inline-flex div a');
    if (nameElement.length > 0) {
      return nameElement.text().trim();
    }

    // If no link is found, try with a more specific div selector to avoid grabbing the 'copy-popup' text.
    const divElement = element.find('.inline-flex > div:first-child');
    if (divElement.length > 0) {
      return divElement.text().trim();
    }

    return '';
  }

  private static extractNameFromCover(element: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): string {
    // Find the h1.cover element
    const coverElement = element.find('h1.cover');
    if (coverElement.length === 0) return '';

    // Simply get all text and remove whitespace and any special characters
    let name = coverElement.text().replace(/\s+/g, '');

    return name;
  }

  private static extractSourceUrl(element: cheerio.Cheerio<any>): string {
    // Find the source link directly using a more specific selector
    const sourceLink = element.find('.floating-right a');
    return sourceLink.attr('href') || '';
  }

  private extractDescription(element: cheerio.Cheerio<any>): string {
    const descriptionElement = element.find('.brief p, .brief .paragraph');
    if (descriptionElement.length > 0) {
      return descriptionElement.text().trim().replace(/"/g, '&quot;');
    }
    return '';
  }

  private extractDocumentationUrl(element: cheerio.Cheerio<any>): string {
    // Try to find the link using different selectors
    let linkElement = element.find('div.inline-flex div a').first();
    
    if (linkElement.length === 0) {
      // Try with a more generic selector
      linkElement = element.find('a').first();
    }
    
    if (linkElement.length > 0) {
      const href = linkElement.attr('href') || '#';
      // Remove .html extension from the URL
      return href.replace(/\.html$/, '');
    }
    
    return '#';
  }

    private extractTokenType(element: cheerio.Cheerio<any>): TokenType {    
    if (element.find('.token.keyword:contains("package")').length > 0) {
      return TokenType.PACKAGE;
    }
    if (element.find('.token.keyword:contains("data")').length > 0 && element.find('.token.keyword:contains("class")').length > 0) {
      return TokenType.DATA_CLASS;
    }
    
    if (element.find('.token.keyword:contains("class")').length > 0) {
      return TokenType.CLASS;
    }
    
    if (element.find('.token.keyword:contains("constructor")').length > 0) {
      return TokenType.CONSTRUCTOR;
    }
    if (element.find('.token.keyword:contains("interface")').length > 0) {
      return TokenType.INTERFACE;
    }
    if (element.find('.token.keyword:contains("object")').length > 0) {
      return TokenType.OBJECT;
    }
    if (element.find('.token.keyword:contains("val")').length > 0) {
      return TokenType.VAL;
    }
    if (element.find('.token.keyword:contains("var")').length > 0) {
      return TokenType.VAR;
    }
    if (element.find('.token.keyword:contains("enum")').length > 0) {
      return TokenType.ENUM;
    }
    if (element.find('.token.function').length > 0) {
      return TokenType.FUNCTION;
    }
    if (element.attr('data-togglable') === 'ENTRY') {
      return TokenType.ENUM_ENTRY;
    }
    return TokenType.NONE;
  }

  private extractGroupType(tokenType: TokenType): GroupType {
    switch (tokenType) {
      case TokenType.PACKAGE:
        return GroupType.PACKAGE;

      case TokenType.CLASS:
      case TokenType.DATA_CLASS:
      case TokenType.INTERFACE:
      case TokenType.ENUM:
        return GroupType.TYPE;

      case TokenType.OBJECT:
        return GroupType.OBJECT;
      
      case TokenType.CONSTRUCTOR:
        return GroupType.CONSTRUCTOR;
      
      case TokenType.VAL:
      case TokenType.VAR:
        return GroupType.PROPERTY;
      
      case TokenType.FUNCTION:
        return GroupType.FUNCTION;
      
      case TokenType.ENUM_ENTRY:
        return GroupType.ENUM_ENTRY;
      
      case TokenType.NONE:
      default:
        return GroupType.NONE;
    }
  }

  public parse($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): void {
    let nameFromDeclaration = DocumentationItem.extractDeclarationName(element) 
    let nameFromCover = DocumentationItem.extractNameFromCover(element, $);
    const name = nameFromDeclaration || nameFromCover;

    if (!name) {
      throw new Error('No name found');
    }

    this.codeBlocks = [];
    const codeBlockElements = element.find('.sourceset-dependent-content');

    codeBlockElements.each((i, el) => {
        const codeBlock = new CodeBlock();
        codeBlock.parse($, $(el));
        this.codeBlocks.push(codeBlock);
    });

    this.tokenType = this.extractTokenType(element);
    this.description = this.extractDescription(element);
    this.groupType = this.extractGroupType(this.tokenType);
    this.name = name;
    this.sourceUrl = DocumentationItem.extractSourceUrl(element);;
    this.url = this.extractDocumentationUrl(element);

    // If there is no description, we clear the URL so that the index page 
    // doesn't link to a non-existent member page.
    if (!this.description || this.description.trim().length === 0) {
      this.url = '';
    }
  }

  public toString(): string {
    return `DocumentationItem { name: ${this.name}, codeBlocks: [${this.codeBlocks.map(cb => cb.toString()).join(', ')}] }`;
  }
}