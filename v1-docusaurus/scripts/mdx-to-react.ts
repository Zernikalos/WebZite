#!/usr/bin/env node

/**
 * MDX to React Components Converter
 * 
 * This script converts MDX files with raw HTML to MDX files using React components.
 * It's specifically designed for the Zernikalos documentation format.
 * 
 * Usage:
 *   node mdx-to-react.js <input-path> [options]
 * 
 * Parameters:
 *   <input-path>                  - Path to the input MDX/HTML file or directory
 * 
 * Options:
 *   -o, --output <output-path>    - Path to the output file or directory
 *   -r, --replace                 - Delete the input HTML file after successful conversion
 * 
 * Smart Path Detection:
 *   - If input is a file and output is a directory, the file will be converted and placed in that directory
 *   - If input is a directory and output is specified, all files will be converted to the output directory
 *   - If output is not specified, converted files will be placed in the same location as input files
 */

// Import modules
import { parseArgs } from './lib/cli';
import { convertDirectoryToMdx, convertHtmlToMdx } from './lib/fileUtils';

// Parse command line arguments
const args = parseArgs();

// Check if we're processing a directory or a single file
if (args.processingMode === 'directory') {
  // Process all HTML files in the directory recursively
  const result = convertDirectoryToMdx(args.inputDir!, args.outputDir!, args.replace);
  
  if (result.result) {
    console.log(`✅ Directory processing completed successfully.`);
  } else {
    console.error(`❌ ${result.error}`);
    process.exit(1);
  }
} else {
  // Process a single file
  const { inputFile, outputFile, replace } = args;
  
  console.log(`Processing ${inputFile} -> ${outputFile}`);
  
  // Use the convertHtmlToMdx function to process the file
  const result = convertHtmlToMdx(inputFile!, outputFile!, replace);
  
  if (result.result) {
    console.log(`✅ Successfully converted ${inputFile} to ${outputFile}`);
  } else {
    console.error(`❌ Failed to convert HTML to MDX: ${result.error}`);
    process.exit(1);
  }
}
