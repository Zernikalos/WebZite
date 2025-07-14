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

        this.links = [];
        codeElement.find('a').each((i: number, el: any) => {
            const link = $(el);
            this.links.push({
                text: link.text().trim(),
                href: link.attr('href') || ''
            });
        });
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