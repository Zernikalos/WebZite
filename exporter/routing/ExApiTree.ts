import path from 'path';
import { ExApiTreeNode, createTreeNode } from './ExApiTreeNode';
import { sourcePathToRouteId } from './urlNormalizer';
import { findHtmlFiles } from '../utils/fileUtils';
import { normalizePath, getRelativePath } from '../utils/pathUtils';

/**
 * API Tree - represents the hierarchy of all Dokka HTML pages
 * Used for navigation, parent-child relationships, and URL resolution
 */
export class ExApiTree {
  /** Map of node ID to node */
  private nodes: Map<string, ExApiTreeNode> = new Map();

  /** Root node IDs (nodes without parents) */
  private rootIds: string[] = [];

  /** Input directory (for relative path calculation) */
  private inputDir: string;

  constructor(inputDir: string) {
    this.inputDir = normalizePath(inputDir);
  }

  /**
   * Build the tree by scanning a directory for HTML files
   */
  static fromDirectory(inputDir: string): ExApiTree {
    const tree = new ExApiTree(inputDir);
    const htmlFiles = findHtmlFiles(inputDir);

    for (const filePath of htmlFiles) {
      tree.addFile(filePath);
    }

    // Build parent-child relationships
    tree.buildRelationships();

    return tree;
  }

  /**
   * Add a file to the tree
   */
  addFile(filePath: string): ExApiTreeNode {
    const relativePath = getRelativePath(this.inputDir, filePath);
    const normalizedPath = normalizePath(relativePath);
    const id = sourcePathToRouteId(normalizedPath);

    // Extract name from filename
    const fileName = path.basename(filePath, '.html');
    const name = fileName === 'index' ? path.basename(path.dirname(filePath)) : fileName;

    const node = createTreeNode({
      id,
      sourcePath: normalizedPath,
      name: name || 'root'
    });

    this.nodes.set(id, node);
    return node;
  }

  /**
   * Build parent-child relationships based on path hierarchy
   */
  private buildRelationships(): void {
    for (const [id, node] of this.nodes) {
      // Find parent by removing the last path segment
      const parts = id.split('/');

      if (parts.length > 1) {
        // Try to find parent with /index pattern first
        const parentPath = parts.slice(0, -1).join('/');
        const parentNode = this.nodes.get(parentPath);

        if (parentNode) {
          node.parentId = parentPath;
          parentNode.childrenIds.push(id);
        } else {
          // No parent found, this is a root node
          this.rootIds.push(id);
        }
      } else {
        // Top-level node
        this.rootIds.push(id);
      }
    }

    // Build namespace for each node
    for (const node of this.nodes.values()) {
      node.namespace = this.buildNamespace(node);
    }
  }

  /**
   * Build the namespace string for a node
   */
  private buildNamespace(node: ExApiTreeNode): string {
    const parts: string[] = [];
    let current: ExApiTreeNode | undefined = node;

    while (current?.parentId) {
      const parent = this.nodes.get(current.parentId);
      if (parent) {
        parts.unshift(parent.name);
        current = parent;
      } else {
        break;
      }
    }

    return parts.join('.');
  }

  /**
   * Get a node by ID
   */
  getNode(id: string): ExApiTreeNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Get a node by source path
   */
  getNodeBySourcePath(sourcePath: string): ExApiTreeNode | undefined {
    const normalizedPath = normalizePath(sourcePath);
    const id = sourcePathToRouteId(normalizedPath);
    return this.nodes.get(id);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): ExApiTreeNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get root nodes
   */
  getRootNodes(): ExApiTreeNode[] {
    return this.rootIds
      .map(id => this.nodes.get(id))
      .filter((n): n is ExApiTreeNode => n !== undefined);
  }

  /**
   * Get children of a node
   */
  getChildren(nodeId: string): ExApiTreeNode[] {
    const node = this.nodes.get(nodeId);
    if (!node) return [];

    return node.childrenIds
      .map(id => this.nodes.get(id))
      .filter((n): n is ExApiTreeNode => n !== undefined);
  }

  /**
   * Get parent of a node
   */
  getParent(nodeId: string): ExApiTreeNode | undefined {
    const node = this.nodes.get(nodeId);
    if (!node?.parentId) return undefined;
    return this.nodes.get(node.parentId);
  }

  /**
   * Get the total count of nodes
   */
  get size(): number {
    return this.nodes.size;
  }

  /**
   * Get statistics about the tree
   */
  getStats(): {
    total: number;
    toGenerate: number;
    toSkip: number;
    byPageType: Record<string, number>;
    bySkipReason: Record<string, number>;
  } {
    let toGenerate = 0;
    let toSkip = 0;
    const byPageType: Record<string, number> = {};
    const bySkipReason: Record<string, number> = {};

    for (const node of this.nodes.values()) {
      if (node.shouldGenerate) {
        toGenerate++;
        if (node.pageType) {
          byPageType[node.pageType] = (byPageType[node.pageType] ?? 0) + 1;
        }
      } else {
        toSkip++;
        if (node.skipReason) {
          bySkipReason[node.skipReason] = (bySkipReason[node.skipReason] ?? 0) + 1;
        }
      }
    }

    return {
      total: this.nodes.size,
      toGenerate,
      toSkip,
      byPageType,
      bySkipReason
    };
  }

  /**
   * Iterate over all nodes
   */
  *[Symbol.iterator](): Iterator<ExApiTreeNode> {
    yield* this.nodes.values();
  }
}
