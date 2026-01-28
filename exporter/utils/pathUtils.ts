import path from 'path';

/**
 * Extract the file name without path or extension
 * @param filePath - Full file path
 * @returns File name without extension
 */
export function extractFileName(filePath: string): string {
  return path.parse(filePath).name;
}

/**
 * Convert an HTML path to an MDX path
 * @param htmlPath - Path ending in .html
 * @returns Path ending in .mdx
 */
export function htmlPathToMdx(htmlPath: string): string {
  return htmlPath.replace(/\.html$/i, '.mdx');
}

/**
 * Get the relative path from a base directory
 * @param basePath - Base directory
 * @param fullPath - Full file path
 * @returns Relative path
 */
export function getRelativePath(basePath: string, fullPath: string): string {
  return path.relative(basePath, fullPath);
}

/**
 * Join path segments
 * @param segments - Path segments to join
 * @returns Joined path
 */
export function joinPath(...segments: string[]): string {
  return path.join(...segments);
}

/**
 * Get the directory name from a path
 * @param filePath - File path
 * @returns Directory name
 */
export function getDirName(filePath: string): string {
  return path.dirname(filePath);
}

/**
 * Resolve a path to absolute
 * @param filePath - Path to resolve
 * @returns Absolute path
 */
export function resolvePath(filePath: string): string {
  return path.resolve(filePath);
}

/**
 * Calculate the output path for a file
 * @param inputDir - Input directory root
 * @param outputDir - Output directory root
 * @param inputFile - Input file path
 * @param outputExtension - Output file extension (default: '.mdx')
 * @returns Output file path
 */
export function calculateOutputPath(
  inputDir: string,
  outputDir: string,
  inputFile: string,
  outputExtension: string = '.mdx'
): string {
  const relativePath = path.relative(inputDir, inputFile);
  const parsed = path.parse(relativePath);
  const outputRelative = path.join(parsed.dir, parsed.name + outputExtension);
  return path.join(outputDir, outputRelative);
}

/**
 * Normalize a path for consistent comparison
 * @param filePath - Path to normalize
 * @returns Normalized path
 */
export function normalizePath(filePath: string): string {
  return path.normalize(filePath).replace(/\\/g, '/');
}
