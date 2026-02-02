/**
 * Main conversion functions for MDX to React
 */

import * as cheerio from 'cheerio';
import _ from 'lodash';
import { docTemplate } from './templates';
import { extractData } from './extractors';
import { DocumentationPage, PageType } from './extractors/DocumentationPage';

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
    { label: 'API', url: '/api/-zernikalos/' }
  ];

  if (extractedData.namespace) {
    const parts = extractedData.namespace.split('.');
    let url = '/api/';
    if (parts[0] === 'Zernikalos') {
      url += '-zernikalos/';
      if (parts.length > 1) {
        // Remove 'Zernikalos.' from the start and join the rest
        url += parts.slice(1).join('.') + '/';
      }
    } else {
      url += extractedData.namespace.toLowerCase() + '/';
    }

    breadcrumbs.push({ 
      label: extractedData.namespace, 
      url: url
    });
  }
  
  const typeInfo = [
    {
      type: 'actual',
      keyword: extractedData.pageType === PageType.LIBRARY ? 'library' : 'package',
      name: extractedData.mainName || extractedData.title,
      url: '#'
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
  
  // If this is the library root, we might want to adjust the slug or title
  const finalTitle = extractedData.pageType === PageType.LIBRARY ? 'Zernikalos API' : extractedData.title;
  
  // Use slug "./" for index files so they are served at the directory level 
  // and relative links work correctly without an extra "/index/" in the URL.
  const finalSlug = slug === 'index' ? './' : slug;

  // Create a new frontmatter with the requested format
  const newFrontmatter = `---\nslug: "${finalSlug}"\ntitle: "${finalTitle}"\nhide_title: true\n---`;
  
  // Combine the parts
  const mdxContent = `${newFrontmatter}\n${imports}\n${reactContent}`;
  
  return { 
    mdxContent, 
    baseName: extractedData.mainName, 
    title: finalTitle 
  };
}


const converter = {
  convertHtmlToMdx
}

export {
  converter
};
