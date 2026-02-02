import { ExApiDefinition, PageType, TokenType, SkipReason } from '../definitions';
import { MemberParser } from '../parsers/MemberParser';

/**
 * Result of the generation decision
 */
export interface GenerationDecision {
  /** Whether the page should be generated */
  generate: boolean;

  /** Reason for skipping (if not generating) */
  reason: SkipReason | null;
}

/**
 * Decide whether a page should be generated
 *
 * @param definition - The parsed definition
 * @returns Decision with generate flag and reason
 */
export function shouldGeneratePage(definition: ExApiDefinition): GenerationDecision {
  // Member pages without description are redundant
  if (definition.pageType === PageType.MEMBER) {
    const hasDescription = definition.documentationItems.some(
      item => item.description && item.description.trim().length > 0
    );

    if (!hasDescription) {
      return {
        generate: false,
        reason: SkipReason.NO_DESCRIPTION
      };
    }

    // Check if it's a simple property or enum entry
    const hasOnlySimpleMembers = definition.documentationItems.every(item => {
      return [
        TokenType.VAL,
        TokenType.VAR,
        TokenType.ENUM_ENTRY,
        TokenType.CONSTRUCTOR
      ].includes(item.tokenType);
    });

    if (hasOnlySimpleMembers && definition.documentationItems.length === 1) {
      return {
        generate: false,
        reason: SkipReason.SIMPLE_PROPERTY
      };
    }
  }

  // Default: generate the page
  return {
    generate: true,
    reason: null
  };
}

/**
 * Check if a documentation item should have a link to its own page
 *
 * @param tokenType - Token type of the item
 * @param hasDescription - Whether the item has a description
 * @returns true if the item should link to a page
 */
export function shouldLinkToPage(tokenType: TokenType, hasDescription: boolean): boolean {
  // Simple members shouldn't have links
  const redundantTypes = [
    TokenType.VAL,
    TokenType.VAR,
    TokenType.CONSTRUCTOR,
    TokenType.ENUM_ENTRY
  ];

  if (redundantTypes.includes(tokenType)) {
    return false;
  }

  // Functions without description shouldn't have links
  if (tokenType === TokenType.FUNCTION && !hasDescription) {
    return false;
  }

  return true;
}
