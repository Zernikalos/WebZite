import { TokenType, GroupType } from './enums';
import { ExApiCodeBlock } from './ExApiCodeBlock';

/**
 * Represents a single documentation item (function, class, property, etc.)
 * This is the main unit of documentation content
 */
export interface ExApiDocItem {
  /** Name of the item (e.g., "ZKO", "loadScene", "isEnabled") */
  name: string;

  /** Token type from Kotlin (class, fun, val, etc.) */
  tokenType: TokenType;

  /** Group type for categorization (TYPE, FUNCTION, PROPERTY, etc.) */
  groupType: GroupType;

  /** Brief description of the item */
  description: string;

  /** URL to the item's dedicated page (empty if page should not be generated) */
  url: string;

  /** URL to the source code */
  sourceUrl: string;

  /** Code blocks showing the declaration across platforms */
  codeBlocks: ExApiCodeBlock[];
}

/**
 * Creates a default ExApiDocItem with empty/default values
 */
export function createEmptyDocItem(): ExApiDocItem {
  return {
    name: '',
    tokenType: TokenType.NONE,
    groupType: GroupType.NONE,
    description: '',
    url: '',
    sourceUrl: '',
    codeBlocks: []
  };
}
