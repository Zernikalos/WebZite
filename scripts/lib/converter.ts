/**
 * Main conversion functions for MDX to React
 */

import * as cheerio from 'cheerio';
import _ from 'lodash';
import { docTemplate } from './templates';
import { extractData } from './extractors';
import { DocumentationPage } from './extractors/DocumentationPage';

/**
 * Interface for conversion result
 */
export interface ConversionResult {
  mdxContent: string;
  baseName: string;
  title: string;
  skipped?: boolean;
}

/**
 * Convert HTML content to React components
 * @param slug - The slug of the document
 * @param content - HTML content to convert
 * @returns Object containing imports and reactContent
 */
function convertHtmlToMdx(slug: string, content: string): ConversionResult | null {  
  // Create a DOM from the HTML content using Cheerio
  const $ = cheerio.load(content);
  
  // Extract data using the unified extractor
  const extractedData = extractData($, content);
  
  if (!extractedData) {
    return { mdxContent: '', baseName: '', title: '', skipped: true };
  }
  
  return _generateMdx(slug, extractedData);
}

/**
 * Converts the modern code format to React components
 * @param extractedData - Data extracted from the modern format
 * @returns Object with imports and reactContent
 */
function _generateMdx(slug: string, extractedData: DocumentationPage): ConversionResult {
  // Generate the header using DocHeader
  const breadcrumbs = [
    { label: 'API', url: '/docs/api' },
    { label: extractedData.namespace, url: `/docs/api/-${extractedData.namespace.toLowerCase()}` }
  ];
  
  const typeInfo = [
    {
      type: 'actual',
      keyword: 'package',
      name: extractedData.mainName,
      url: `#${extractedData.mainName.toLowerCase()}`
    }
  ];
  
  // Prepare data for the template - mapeamos las propiedades de DocumentationPage a TemplateData
  const templateData = {
    title: extractedData.title,
    namespace: extractedData.namespace,
    pageType: extractedData.pageType,
    breadcrumbs,
    typeInfo,
    documentationItems: extractedData.documentationItems
  };
  
  // Generate React content using the docTemplate
  const result = docTemplate(templateData);
  
  // Extract imports and React content
  const imports = result.split('\n\n')[0];
  const reactContent = result.substring(imports.length);
  
  // Create a new frontmatter with the requested format
  const newFrontmatter = `---\nslug: "${slug}"\ntitle: "${extractedData.title}"\nhide_title: true\n---`;
  
  // Combine the parts
  const mdxContent = `${newFrontmatter}\n${imports}\n${reactContent}`;
  
  return { 
    mdxContent, 
    baseName: extractedData.mainName, 
    title: extractedData.title 
  };
}


const converter = {
  convertHtmlToMdx
}

export {
  converter
};
