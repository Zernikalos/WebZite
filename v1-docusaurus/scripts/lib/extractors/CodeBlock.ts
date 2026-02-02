import * as cheerio from 'cheerio';
import _ from 'lodash';

export class CodeBlock {

    platform: string;
    code: string[];
    links: { text: string; href: string }[];
    source: string | null;

    constructor({ platform = '', code = [], links = [], source = null }: { platform?: string; code?: string[]; links?: { text: string; href: string }[], source?: string | null } = {}) {
        this.platform = platform;
        this.code = code;
        this.links = links;
        this.source = source;
    }

    private extractLinks($: cheerio.CheerioAPI, codeElement: cheerio.Cheerio<any>): { text: string; href: string }[] {
        const links: { text: string; href: string }[] = [];
        codeElement.find('a').each((i: number, el: any) => {
            const link = $(el);
            let href = link.attr('href') || '';
            
            // If it's a relative link
            if (href && !/^https?:\/\//.test(href) && !href.startsWith('#')) {
                // Remove .html extension
                href = href.replace(/\.html$/, '');
                
                // Handle index files
                if (href === 'index' || href.endsWith('/index')) {
                    href = href.replace(/\/index$/, '') || './';
                } else {
                    // It's a link to a member page. Since we skip many redundant member pages,
                    // we should only keep the link if we are sure it points to an existing page.
                    // For now, to avoid broken links during build, we clear links to files 
                    // in the same directory that are not 'index'.
                    if (!href.includes('/')) {
                        href = '';
                    }
                }
                
                // Ensure directory links have a trailing slash for Docusaurus consistency
                if (href && href !== './' && !href.includes('#') && !href.endsWith('/')) {
                    href += '/';
                }
            }

            if (href) {
                links.push({
                    text: link.text().trim(),
                    href
                });
            }
        });
        return links;
    }

    public parse($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): void {
        const platformAttr = element.attr('data-togglable') || '';
        this.platform = platformAttr.replace(':/', '').replace('Main', '');

        const codeElement = element.find('.symbol.monospace');

        // Find and extract the source link, but don't remove it yet.
        const sourceLinkElement = codeElement.find('span.floating-right a');
        const sourceContainer = sourceLinkElement.closest('span.clearfix');
        if (sourceLinkElement.length > 0) {
            this.source = sourceLinkElement.attr('href') || null;
        }

        this.code = [];
        const lines: string[] = [];
        let currentLine = '';

        codeElement.contents().each((i, node) => {
            const $node = $(node);

            // Skip the source container element without removing it from the DOM
            if (sourceContainer.length > 0 && $node[0] === sourceContainer[0]) {
                return; // Skips this iteration
            }

            // If it's a block element, it forces a new line.
            if (node.type === 'tag' && $node.is('div.block')) {
                // Push the accumulated line if it's not empty
                if (currentLine.trim()) {
                    lines.push(currentLine.trim());
                }
                currentLine = ''; // Reset for the next line
                // Add the block's content as a new line
                lines.push($node.text().trim());
            } else {
                // Append text from other nodes to the current line
                currentLine += $node.text();
            }
        });

        // Add the last accumulated line if it's not empty
        if (currentLine.trim()) {
            lines.push(currentLine.trim());
        }

        this.code = lines.map(line => line.replace(/\s+/g, ' ').trim()).filter(line => line);

        // TODO: Workaround added until we can properly handle links in the code blocks.
        //this.links = this.extractLinks($, codeElement);
        this.links = [];
    }

    public toString(): string {
        const output = [];
        output.push('\n--- BLOCK ---');
        output.push(`Platform(s): ${this.platform}`);
        if (this.source) {
            output.push(`Source: ${this.source}`);
        }
        output.push('Code:');
        this.code.forEach(line => output.push(`  ${line}`));
        output.push('Links:');
        this.links.forEach(l => output.push(`  - ${l.text} -> ${l.href}`));
        output.push('------------');
        return output.join('\n');
    }

}

// function debugReadInputFile(filePath: string): string {
//     return fs.readFileSync(filePath, 'utf-8');
// }

// function debugParseCodeBlocks(filePath: string): CodeBlock2[] {
//     const htmlContent = debugReadInputFile(filePath);
//     const $ = cheerio.load(htmlContent);

//     const elements = $('.sourceset-dependent-content');
//     const codeBlocks: CodeBlock2[] = [];

//     elements.each((index, element) => {
//         const codeBlock = new CodeBlock2();
//         codeBlock.parse($, $(element));
//         codeBlocks.push(codeBlock);
//     });

//     return codeBlocks;
// }

// // --- Debug execution ---
// if (require.main === module) {
//     const sampleFilePath = '/Users/aaron/Documents/ZernikalosProject/WebZite/scripts/samples/index.html';
//     console.log(`[DEBUG] Parsing file: ${sampleFilePath}`);
//     const parsedBlocks = debugParseCodeBlocks(sampleFilePath);
//     console.log(`[DEBUG] Found and processed ${parsedBlocks.length} code blocks.`);

//     parsedBlocks.forEach(block => {
//         console.log(block.toString());//     });
// }