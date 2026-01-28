import prettier from 'prettier';

/**
 * Format MDX content with Prettier
 * @param content - MDX content to format
 * @returns Formatted content
 */
export async function formatMdx(content: string): Promise<string> {
  try {
    const options = await prettier.resolveConfig(process.cwd());
    return await prettier.format(content, {
      ...options,
      parser: 'mdx',
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true
    });
  } catch {
    // Return unformatted content if Prettier fails
    return content;
  }
}

/**
 * Format MDX content synchronously (best effort)
 * Note: In Prettier 3.x, format is async. This returns content unformatted.
 * Use formatMdx for proper formatting.
 * @param content - MDX content to format
 * @returns Content (unformatted in Prettier 3.x)
 */
export function formatMdxSync(content: string): string {
  // Prettier 3.x only has async format, return content as-is
  return content;
}

/**
 * Escape special characters for MDX
 * @param text - Text to escape
 * @returns Escaped text
 */
export function escapeMdx(text: string): string {
  return text
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Escape quotes for use in JSX attributes
 * @param text - Text to escape
 * @returns Escaped text
 */
export function escapeQuotes(text: string): string {
  return text.replace(/"/g, '&quot;');
}
