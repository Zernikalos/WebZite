import { PageType, SkipReason } from '../definitions';

/**
 * Represents a node in the API tree hierarchy
 * Each node corresponds to an HTML file from Dokka
 */
export interface ExApiTreeNode {
  /** Unique identifier for this node (normalized path without extension) */
  id: string;

  /** Path to the source HTML file */
  sourcePath: string;

  /** Output path for the MDX file (if generated) */
  outputPath: string | null;

  /** Docusaurus slug for this page */
  slug: string;

  /** Detected page type */
  pageType: PageType | null;

  /** Whether this page should be generated */
  shouldGenerate: boolean;

  /** Reason for skipping (if not generating) */
  skipReason: SkipReason | null;

  /** Parent node ID */
  parentId: string | null;

  /** Child node IDs */
  childrenIds: string[];

  /** Display name for this node */
  name: string;

  /** Full namespace path */
  namespace: string;
}

/**
 * Create a new tree node
 */
export function createTreeNode(params: {
  id: string;
  sourcePath: string;
  name?: string;
  parentId?: string | null;
}): ExApiTreeNode {
  return {
    id: params.id,
    sourcePath: params.sourcePath,
    outputPath: null,
    slug: '',
    pageType: null,
    shouldGenerate: true,
    skipReason: null,
    parentId: params.parentId ?? null,
    childrenIds: [],
    name: params.name ?? extractNameFromId(params.id),
    namespace: ''
  };
}

/**
 * Extract a display name from a node ID
 */
function extractNameFromId(id: string): string {
  const parts = id.split('/');
  return parts[parts.length - 1] || id;
}

/**
 * Mark a node as skipped
 */
export function markNodeSkipped(node: ExApiTreeNode, reason: SkipReason): void {
  node.shouldGenerate = false;
  node.skipReason = reason;
  node.outputPath = null;
}

/**
 * Set the output info for a node
 */
export function setNodeOutput(
  node: ExApiTreeNode,
  outputPath: string,
  slug: string,
  pageType: PageType
): void {
  node.outputPath = outputPath;
  node.slug = slug;
  node.pageType = pageType;
  node.shouldGenerate = true;
  node.skipReason = null;
}
