/**
 * CLI utilities for MDX to React conversion
 */

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Command } from 'commander';

/**
 * Interface for parsed arguments
 */
export interface ParsedArgs {
  inputFile?: string;
  outputFile?: string;
  inputDir?: string;
  outputDir?: string;
  replace: boolean;
  processingMode: 'file' | 'directory';
}

/**
 * Determines if a path is a directory
 * @param pathToCheck - Path to check
 * @returns True if the path is a directory, false otherwise
 */
function isDirectory(pathToCheck: string): boolean {
  try {
    return fs.statSync(pathToCheck).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Determines if a path exists
 * @param pathToCheck - Path to check
 * @returns True if the path exists, false otherwise
 */
function pathExists(pathToCheck: string): boolean {
  return fs.existsSync(pathToCheck);
}

/**
 * Gets the output file path based on input and output paths
 * @param inputPath - Input file path
 * @param outputPath - Output path (can be file or directory)
 * @returns The resolved output file path
 */
function resolveOutputFile(inputPath: string, outputPath: string | null): string {
  // Extract file components
  const inputDirName = path.dirname(inputPath);
  const inputExtension = path.extname(inputPath);
  const inputBaseName = path.basename(inputPath, inputExtension);
  const isInputHtml = inputExtension.toLowerCase() === '.html';
  
  // If no output specified, use default conversion
  if (!outputPath) {
    return isInputHtml 
      ? path.join(inputDirName, `${inputBaseName}.mdx`)
      : inputPath;
  }
  
  // If output is a directory, place file inside with .mdx extension
  if (pathExists(outputPath) && isDirectory(outputPath)) {
    return path.join(outputPath, `${inputBaseName}.mdx`);
  }
  
  // Output is a specific file path
  return outputPath;
}

/**
 * Parse command line arguments using Commander
 * @returns Object containing parsed arguments
 */
export function parseArgs(): ParsedArgs {
  const program = new Command();
  
  program
    .name('mdx-to-react')
    .description('Converts MDX files with raw HTML to MDX files using React components')
    .version('1.0.0')
    .argument('[input-path]', 'Path to the input file or directory')
    .option('-o, --output <output-path>', 'Path to the output file or directory')
    .option('-r, --replace', 'Delete the input HTML file after successful conversion')
    .parse(process.argv);
  
  const options = program.opts();
  const inputPath = program.args[0] || null;
  
  // If no input path provided, show help and exit
  if (!inputPath) {
    program.help();
    process.exit(1);
  }
  
  // Get output path from --output option
  const outputPath = options.output || null;
  const replace = options.replace || false;
  
  try {
    // Check if input path exists
    if (!pathExists(inputPath)) {
      console.error(`Error: Input path ${inputPath} does not exist`);
      process.exit(1);
    }
    
    const isInputDir = isDirectory(inputPath);
    
    // Handle directory input
    if (isInputDir) {
      // If output exists and is not a directory, that's an error
      if (outputPath && pathExists(outputPath) && !isDirectory(outputPath)) {
        console.error(`Error: Output path ${outputPath} exists but is not a directory`);
        process.exit(1);
      }
      
      return {
        inputDir: inputPath,
        outputDir: outputPath || inputPath,
        replace,
        processingMode: 'directory'
      };
    }
    
    // Handle file input
    const outputFile = resolveOutputFile(inputPath, outputPath);
    
    return {
      inputFile: inputPath,
      outputFile,
      replace,
      processingMode: 'file'
    };
  } catch (error) {
    console.error(`Error accessing path ${inputPath}: ${(error as Error).message}`);
    process.exit(1);
  }
}
