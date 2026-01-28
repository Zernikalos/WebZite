/**
 * Utility functions for MDX to React conversion
 */

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import prettier from 'prettier';
import { converter, ConversionResult } from './converter';


/**
 * Interface for operation result
 */
export interface OperationResult {
  result: boolean;
  error: string | null;
}

/**
 * Interface for MDX file content
 */
export interface MdxFileContent {
  frontmatter: string;
  contentWithoutFrontmatter: string;
}

/**
 * Read an HTML file
 * @param inputFile - Path to the HTML file
 * @returns The HTML content as a string
 */
function readHtmlFile(inputFile: string): string {
  try {
    // Read file content
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading HTML file: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Write output to file with optional prettier formatting
 * @param outputFile - Path to the output file
 * @param inputFile - Path to the input file
 * @param result - Result object from conversion
 * @param shouldReplace - Whether to replace the original file
 * @returns Operation result with status and error message if any
 */
function writeOutput(
  outputFile: string, 
  inputFile: string, 
  result: ConversionResult, 
  shouldReplace = false
): OperationResult {  
  // Combine the parts
  const newMdxContent = result.mdxContent;
  
  // Check if we're overwriting the input file
  const isOverwriting = path.resolve(inputFile) === path.resolve(outputFile);
  
  // If overwriting, create a temporary file first
  const tempFile = isOverwriting ? `${outputFile}.temp` : outputFile;
  
  try {
    // Check if output file exists
    const outputExists = fs.existsSync(outputFile);
    
    // Write to output file (or temp file if overwriting)
    fs.writeFileSync(tempFile, newMdxContent);
    
    // Try to format with prettier
    prettier.resolveConfig(process.cwd())
      .then(options => {
        return prettier.format(newMdxContent, {
          ...options,
          parser: 'mdx',
          printWidth: 100,
          tabWidth: 2,
          singleQuote: true
        });
      })
      .then(formattedContent => {
        // Write the formatted content
        fs.writeFileSync(tempFile, formattedContent);
        
        // If overwriting, replace the original file with the temp file
        if (isOverwriting) {
          fs.renameSync(tempFile, outputFile);
        }
        
        // Delete the original HTML file if --replace option was used and the input is an HTML file
        if (shouldReplace && inputFile.toLowerCase().endsWith('.html')) {
          try {
            fs.unlinkSync(inputFile);
          } catch (deleteError) {
            return { result: false, error: `Could not delete original HTML file: ${(deleteError as Error).message}` };
          }
        }
        
        return { result: true, error: null };
      })
      .catch(error => {
        // If prettier fails, still ensure the file is written correctly
        if (isOverwriting && fs.existsSync(tempFile)) {
          fs.renameSync(tempFile, outputFile);
        }
        
        // Delete the original HTML file if --replace option was used and the input is an HTML file
        if (shouldReplace && inputFile.toLowerCase().endsWith('.html')) {
          try {
            fs.unlinkSync(inputFile);
          } catch (deleteError) {
            return { result: false, error: `Could not delete original HTML file: ${(deleteError as Error).message}` };
          }
        }
        
        return { result: true, error: `Could not format with prettier: ${(error as Error).message}` };
      });
    
    return { result: true, error: null };
  } catch (error) {
    // Clean up temp file if it exists
    if (fs.existsSync(tempFile)) {
      try { fs.unlinkSync(tempFile); } catch (e) { /* ignore */ }
    }
    
    return { result: false, error: `Error writing file: ${(error as Error).message}` };
  }
}

/**
 * Find all HTML files in a directory recursively
 * @param dir - Directory to search in
 * @returns Array of file paths
 */
function findHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        results = results.concat(findHtmlFiles(filePath));
      } else if (file.toLowerCase().endsWith('.html')) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${(error as Error).message}`);
  }
  
  return results;
}

/**
 * Given a path this function will extract the name of the file with no path or extensions
 * @param filePath File name to be converted
 * @returns Name of the file as string
 */
function extractNameFromFilePath(filePath: string): string {
  // Get the base name (filename with extension)
  const baseName = path.basename(filePath);
  
  // Remove the extension
  const nameWithoutExtension = path.parse(baseName).name;
  
  return nameWithoutExtension;
}

/**
 * Convert an HTML file to MDX format
 * @param htmlFilePath - Path to the HTML file
 * @param outputFilePath - Path to the output MDX file
 * @param replace - Whether to replace the original file
 * @returns Operation result with status and error message if any
 */
function convertHtmlToMdx(
  htmlFilePath: string,
  outputFilePath: string,
  replace: boolean
): OperationResult {
  try {
    const cleanName = extractNameFromFilePath(htmlFilePath);
    
    // Ensure the output directory exists
    const outputFileDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputFileDir)) {
      fs.mkdirSync(outputFileDir, { recursive: true });
    }
    
    // Read the input file
    const htmlContent = readHtmlFile(htmlFilePath);
    
    // Convert HTML to MDX
    const result = converter.convertHtmlToMdx(cleanName, htmlContent);
    
    if (!result) {
      return { result: false, error: `Failed to convert ${htmlFilePath} to MDX` };
    }

    if (result.skipped) {
      return { result: true, error: null };
    }
    
    // Write output to file
    const writeResult = writeOutput(outputFilePath, htmlFilePath, result, replace);
    
    // Return the result from writeOutput or success if no error
    return writeResult;
    
  } catch (error) {
    return { result: false, error: `Error processing file ${htmlFilePath}: ${(error as Error).message}` };
  }
}

/**
 * Process all HTML files in a directory recursively
 * @param inputDir - Input directory
 * @param outputDir - Output directory
 * @param replace - Whether to replace original files
 * @returns Operation result with status and error message if any
 */
function convertDirectoryToMdx(
  inputDir: string, 
  outputDir: string, 
  replace: boolean
): OperationResult {
  // Find all HTML files in the input directory
  const htmlFiles = findHtmlFiles(inputDir);
  
  // If no files found, return early with a message
  if (htmlFiles.length === 0) {
    return {
      result: false,
      error: `No HTML files found in directory: ${inputDir}`
    };
  }
  
  let successful = 0;
  let failed = 0;
  const errors: string[] = [];
  
  // Process each HTML file
  for (const htmlFile of htmlFiles) {
    // Determine the relative path from input directory
    const relativePath = path.relative(inputDir, htmlFile);
    
    // Create the output file path with the same relative path but in output directory
    const outputRelativePath = relativePath.replace(/\.html$/i, '.mdx');
    const outputFile = path.join(outputDir, outputRelativePath);
    
    // Convert the HTML file to MDX using the new dedicated function
    const conversionResult = convertHtmlToMdx(htmlFile, outputFile, replace);
    
    // Update counts and collect errors
    if (conversionResult.result) {
      successful++;
    } else {
      failed++;
      errors.push(`- ${htmlFile} -> ${conversionResult.error}`);
    }    
  }
  
  // Prepare the result
  if (failed > 0) {
    return {
      result: false,
      error: `Error processing some files, ${successful}/${htmlFiles.length} files converted successfully\n${errors.join('\n')}`
    };
  } else {
    return {
      result: true,
      error: null
    };
  }
}


export {
  readHtmlFile,
  writeOutput,
  findHtmlFiles,
  convertDirectoryToMdx,
  convertHtmlToMdx
};
