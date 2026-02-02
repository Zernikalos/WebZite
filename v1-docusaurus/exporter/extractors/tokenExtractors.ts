import * as cheerio from 'cheerio';
import { TokenType, GroupType } from '../definitions';

/**
 * Extract the token type from an element by checking for keywords
 *
 * @param $ - Cheerio API
 * @param element - Element to check
 * @returns TokenType enum value
 */
export function extractTokenType($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>): TokenType {
  // Check for package
  if (element.find('.token.keyword:contains("package")').length > 0) {
    return TokenType.PACKAGE;
  }

  // Check for data class (must check before class)
  if (
    element.find('.token.keyword:contains("data")').length > 0 &&
    element.find('.token.keyword:contains("class")').length > 0
  ) {
    return TokenType.DATA_CLASS;
  }

  // Check for class
  if (element.find('.token.keyword:contains("class")').length > 0) {
    return TokenType.CLASS;
  }

  // Check for constructor
  if (element.find('.token.keyword:contains("constructor")').length > 0) {
    return TokenType.CONSTRUCTOR;
  }

  // Check for interface
  if (element.find('.token.keyword:contains("interface")').length > 0) {
    return TokenType.INTERFACE;
  }

  // Check for object
  if (element.find('.token.keyword:contains("object")').length > 0) {
    return TokenType.OBJECT;
  }

  // Check for val
  if (element.find('.token.keyword:contains("val")').length > 0) {
    return TokenType.VAL;
  }

  // Check for var
  if (element.find('.token.keyword:contains("var")').length > 0) {
    return TokenType.VAR;
  }

  // Check for enum
  if (element.find('.token.keyword:contains("enum")').length > 0) {
    return TokenType.ENUM;
  }

  // Check for function
  if (element.find('.token.function').length > 0) {
    return TokenType.FUNCTION;
  }

  // Check for enum entry via data-togglable attribute
  if (element.attr('data-togglable') === 'ENTRY') {
    return TokenType.ENUM_ENTRY;
  }

  return TokenType.NONE;
}

/**
 * Map a TokenType to its corresponding GroupType
 *
 * @param tokenType - Token type to map
 * @returns GroupType enum value
 */
export function tokenTypeToGroupType(tokenType: TokenType): GroupType {
  switch (tokenType) {
    case TokenType.PACKAGE:
      return GroupType.PACKAGE;

    case TokenType.CLASS:
    case TokenType.DATA_CLASS:
    case TokenType.INTERFACE:
    case TokenType.ENUM:
      return GroupType.TYPE;

    case TokenType.OBJECT:
      return GroupType.OBJECT;

    case TokenType.CONSTRUCTOR:
      return GroupType.CONSTRUCTOR;

    case TokenType.VAL:
    case TokenType.VAR:
      return GroupType.PROPERTY;

    case TokenType.FUNCTION:
      return GroupType.FUNCTION;

    case TokenType.ENUM_ENTRY:
      return GroupType.ENUM_ENTRY;

    case TokenType.NONE:
    default:
      return GroupType.NONE;
  }
}

/**
 * Check if a token type represents a "redundant" member
 * that typically shouldn't have its own page
 *
 * @param tokenType - Token type to check
 * @returns true if the member type is typically redundant
 */
export function isRedundantMemberType(tokenType: TokenType): boolean {
  return [
    TokenType.VAL,
    TokenType.VAR,
    TokenType.CONSTRUCTOR,
    TokenType.ENUM_ENTRY
  ].includes(tokenType);
}
