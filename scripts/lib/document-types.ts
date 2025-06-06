/**
 * Document type detection functions
 */

import _ from 'lodash';

/**
 * Interface for type information
 */
export interface TypeInfo {
  keyword: string;
  type?: string;
  name?: string;
  url?: string;
}

/**
 * Detect document type based on content
 * @param typeInfo - Array of type information objects
 * @returns Document type (default, class, or function)
 */
function detectDocumentType(typeInfo: TypeInfo[]): string {
  // If no type info provided, return default
  if (_.isEmpty(typeInfo)) {
    return 'default';
  }
  
  // Define keyword sets for different document types
  const classKeywords = ['class', 'interface', 'object'];
  const functionKeywords = ['fun', 'function'];
  
  // Check if any type info has a keyword matching class indicators
  if (_.some(typeInfo, (info: TypeInfo) => _.includes(classKeywords, info.keyword))) {
    return 'class';
  }
  
  // Check if any type info has a keyword matching function indicators
  if (_.some(typeInfo, (info: TypeInfo) => _.includes(functionKeywords, info.keyword))) {
    return 'function';
  }
  
  // Default to data type
  return 'default';
}

export {
  detectDocumentType
};
