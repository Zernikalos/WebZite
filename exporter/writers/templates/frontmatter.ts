/**
 * Generate YAML frontmatter for MDX files
 */

export interface FrontmatterOptions {
  slug: string;
  title: string;
  hideTitle?: boolean;
}

/**
 * Generate frontmatter YAML block
 *
 * @param options - Frontmatter options
 * @returns YAML frontmatter string
 */
export function generateFrontmatter(options: FrontmatterOptions): string {
  const lines = [
    '---',
    `slug: "${options.slug}"`,
    `title: "${options.title}"`
  ];

  if (options.hideTitle !== false) {
    lines.push('hide_title: true');
  }

  lines.push('---');

  return lines.join('\n');
}
