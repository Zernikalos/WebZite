/**
 * Page type enum - identifies the type of Dokka HTML page
 */
export enum PageType {
  LIBRARY = 'library',
  PACKAGE = 'package',
  CLASS = 'classlike',
  MEMBER = 'member'
}

/**
 * Token type enum - identifies the Kotlin declaration type
 */
export enum TokenType {
  PACKAGE = 'package',
  CLASS = 'class',
  DATA_CLASS = 'data class',
  CONSTRUCTOR = 'constructor',
  INTERFACE = 'interface',
  OBJECT = 'object',
  FUNCTION = 'fun',
  VAL = 'val',
  VAR = 'var',
  ENUM = 'enum',
  ENUM_ENTRY = 'enum entry',
  NONE = ''
}

/**
 * Group type enum - categorizes documentation items for display
 */
export enum GroupType {
  NONE = 'NONE',
  PACKAGE = 'PACKAGE',
  CONSTRUCTOR = 'CONSTRUCTOR',
  PROPERTY = 'PROPERTY',
  ENUM_ENTRY = 'ENUM_ENTRY',
  FUNCTION = 'FUNCTION',
  TYPE = 'TYPE',
  OBJECT = 'OBJECT'
}

/**
 * Link kind enum - identifies the type of link
 */
export enum LinkKind {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  ANCHOR = 'anchor'
}

/**
 * Skip reason enum - documents why a page was skipped
 */
export enum SkipReason {
  REDUNDANT_MEMBER = 'redundant-member',
  NO_DESCRIPTION = 'no-description',
  CONFIG_DISABLED = 'config-disabled',
  SIMPLE_PROPERTY = 'simple-property',
  ENUM_ENTRY = 'enum-entry'
}
