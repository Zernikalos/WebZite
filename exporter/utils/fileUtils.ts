import fs from 'fs';
import path from 'path';

/**
 * Read an HTML file and return its content
 * @param filePath - Path to the HTML file
 * @returns The file content as a string
 * @throws Error if file cannot be read
 */
export function readHtmlFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Read a JSON file and parse it
 * @param filePath - Path to the JSON file
 * @returns Parsed JSON value
 */
export function readJsonFile<T = unknown>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

/**
 * Write content to a file, creating directories as needed
 * @param filePath - Path to the output file
 * @param content - Content to write
 */
export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Write content atomically using a temp file
 * @param filePath - Path to the output file
 * @param content - Content to write
 */
export function writeFileAtomic(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tempFile = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempFile, content, 'utf8');
    fs.renameSync(tempFile, filePath);
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch {
        // Ignore cleanup errors
      }
    }
    throw error;
  }
}

/**
 * Delete a file if it exists
 * @param filePath - Path to the file to delete
 * @returns true if file was deleted, false if it didn't exist
 */
export function deleteFile(filePath: string): boolean {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

/**
 * Check if a path exists
 * @param filePath - Path to check
 * @returns true if path exists
 */
export function pathExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Check if a path is a directory
 * @param filePath - Path to check
 * @returns true if path is a directory
 */
export function isDirectory(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Find all HTML files in a directory recursively
 * @param dir - Directory to search
 * @returns Array of absolute file paths
 */
export function findHtmlFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(currentDir: string): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Find all JSON files in a directory recursively
 * @param dir - Directory to search
 * @returns Array of absolute file paths
 */
export function findJsonFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(currentDir: string): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Ensure a directory exists, creating it if necessary
 * @param dir - Directory path
 */
export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
