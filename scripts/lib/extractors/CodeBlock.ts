import * as cheerio from 'cheerio';
import { extractCleanText } from './base-extractors';
import _ from 'lodash';

enum CodeBlockMetadataType {
    CLASS = 'class',
    INTERFACE = 'interface',
    FUN = 'fun',
    DATA_CLASS = 'data class',
    VAL = 'property',
    VAR = 'property'
}


export class CodeBlockLink {
    text: string;
    href: string;

    constructor(text: string, href: string) {
        this.text = text;
        this.href = href;
    }
}

/**
 * Interface for metadata in code blocks
 */
export class CodeBlockMetadata {
    type: string;
    links: CodeBlockLink[];

    constructor() {
        this.type = '';
        this.links = [];
    }
}

/**
 * Cleans a code block by normalizing spaces and format
 * @param codeSource - Code block to clean
 * @returns Clean code block
 */
function cleanCodeSource(codeSource: string): string {
    return _
      .chain(codeSource)
      // Normalize horizontal spaces
      .replace(/[\t ]+/g, ' ')
      // Remove spaces around parentheses
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      // Normalize spaces around colons
      .replace(/\s*:\s*/g, ': ')
      // Normalize spaces after commas
      .replace(/\s*,\s*/g, ', ')
      // Remove spaces at the beginning of lines
      .replace(/\n\s+/g, '\n')
      // Remove duplicate blank lines
      .replace(/\n+/g, '\n')
    // Escape double quotes to avoid breaking JSX props
    .replace(/"/g, "'")
    // Replace line breaks with spaces for MDX compatibility
    .replace(/\n/g, " ")
      // Remove spaces at the beginning and end
      .trim()
      // Replace newlines with spaces for MDX compatibility
      .replace(/\n/g, ' ')
      .value();
}

export class CodeBlock {

    code: string;
    metadata: CodeBlockMetadata;

    constructor() {
        this.code = '';
        this.metadata = new CodeBlockMetadata();
    }

    private extractInternalLinks($: cheerio.CheerioAPI, element: any | cheerio.Cheerio<any>): void {  
        $(element).find('a').each((i, linkElement) => {
          const $link = $(linkElement);
          const href = $link.attr('href');
          const text = $link.text().trim();
          
          if (href && text) {
            this.metadata.links.push(new CodeBlockLink(text, href));
          }
        });
    }

    private detectDeclarationAndMetaType(sourceCode: string): { startIndex: number; detectedType: string } {
        let startIndex = -1;
        let detectedType = '';
        
        for (const [keyword, type] of Object.entries(CodeBlockMetadataType)) {
          const index = sourceCode.indexOf(keyword);
          if (index !== -1 && (startIndex === -1 || index < startIndex)) {
            startIndex = index;
            detectedType = type;
          }
        }
        
        return { startIndex, detectedType };
    }

    /**
     * Finds the element containing the source code
     * @param element - Container element
     * @param $ - Cheerio instance
     * @returns Element containing the source code
     */
    private findRawCodeBlock(element: cheerio.Cheerio<any>): cheerio.Cheerio<any> {
      if (element.hasClass('symbol') && element.hasClass('monospace')) {
        return element;
      }
      return element.find('.symbol.monospace');
    }
    
    public parse($: cheerio.CheerioAPI, element: any | cheerio.Cheerio<any>): void {
        try {
            const rawCodeBlock = this.findRawCodeBlock(element);
            if (rawCodeBlock.length === 0) {
                return;
            }

            // Extract the complete text of the declaration
            this.code = '';

            // Extract text only from the raw code block element, not the entire element
            this.code = extractCleanText(rawCodeBlock, $);

            // Clean the declaration preserving line breaks
            this.code = cleanCodeSource(this.code);

            // Extract links from the element
            this.extractInternalLinks($, element);

            // Find the beginning of the declaration and detect its type
            const { startIndex, detectedType } = this.detectDeclarationAndMetaType(this.code);

            // Assign the detected type to the metadata
            this.metadata.type = detectedType;

            // If we found a keyword, extract from there
            if (startIndex !== -1) {
                this.code = this.code.substring(startIndex);
            }

        } catch (error) {
            console.error('Error extracting code block:', error);
        }

    }
}

export function extractCodeBlock($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): CodeBlock {
    const codeBlock = new CodeBlock();
    codeBlock.parse($, element);
    return codeBlock;
}