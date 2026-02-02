/**
 * Basic extractors for MDX to React conversion
 */

import * as cheerio from 'cheerio';
import _ from 'lodash';


/**
 * Extracts clean text from an HTML element
 * @param element - Cheerio element
 * @returns Clean text
 */
function extractText(element: cheerio.Cheerio<any>): string {
  if (!element || element.length === 0) return '';
  return element.text().trim();
}

/**
 * Recursive function to extract text from all nodes
 * @param node - Node to extract text from
 * @param $ - Cheerio instance
 * @param textAccumulator - Accumulated text so far
 * @returns Extracted text
 */
function extractCleanText(node: any | cheerio.Cheerio<any>, $: cheerio.CheerioAPI, textAccumulator = ''): string {
  // If the node is a string or invalid, return the accumulator
  if (!node || typeof node === 'string') {
    return textAccumulator;
  }
  
  let codeBlock = textAccumulator;
  
  // Make sure we're working with a Cheerio object
  const $node = $(node);
  
  // List of classes to completely ignore (including descendants)
  const classesToIgnore = [
    'copy-popup-wrapper',
    'anchor-wrapper',
    'anchor-icon',
    'floating-right',
    'clearfix'
  ];
  
  // Check if the current node has any of the classes to ignore
  for (const className of classesToIgnore) {
    if ($node.hasClass(className)) {
      // If the node has a class to ignore, we don't process this node or its descendants
      return codeBlock;
    }
  }
  
  // Check if the node contains text about copying to clipboard
  const nodeText = $node.text().trim();
  if (nodeText === 'Link copied to clipboard' || nodeText === 'Copy' || nodeText === 'copy-popup-icon') {
    return codeBlock;
  }
  
  // Process the node's children
  $node.contents().each((i, child) => {
    if (child.type === 'text') {
      codeBlock += $(child).text();
    } else if (child.type === 'tag') {
      // Preserve line breaks in blocks
      const $child = $(child);
      if ($child.hasClass('block')) {
        // Add line break before the block if we're not at the beginning
        if (codeBlock.length > 0 && !codeBlock.endsWith('\n')) {
          codeBlock += '\n';
        }
        codeBlock = extractCleanText(child, $, codeBlock);
        // Add line break after the block
        if (!codeBlock.endsWith('\n')) {
          codeBlock += '\n';
        }
      } else {
        codeBlock = extractCleanText(child, $, codeBlock);
      }
    }
  });
  
  return codeBlock;
}


export {
  extractText,
  extractCleanText
};
