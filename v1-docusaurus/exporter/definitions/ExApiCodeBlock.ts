/**
 * Represents a code block from Dokka documentation
 * Contains platform-specific code with optional links and source reference
 */
export interface ExApiCodeBlock {
  /** Platform/sourceset name (e.g., "Kotlin", "Java") */
  platform: string;

  /** Lines of code */
  code: string[];

  /** Links found within the code block */
  links: ExApiCodeLink[];

  /** URL to the source code (if available) */
  sourceUrl: string | null;
}

/**
 * Represents a link within a code block
 */
export interface ExApiCodeLink {
  /** Display text of the link */
  text: string;

  /** Original href from Dokka */
  href: string;
}
