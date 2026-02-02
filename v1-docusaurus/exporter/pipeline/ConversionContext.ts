import { ExApiTree } from '../routing/ExApiTree';
import { ExApiRouteRegistry } from '../routing/ExApiRouteRegistry';
import { Reporter } from './Reporter';

/**
 * Options for the export pipeline
 */
export interface ExportOptions {
  /** Input directory containing HTML files */
  inputDir: string;

  /** Output directory for MDX files */
  outputDir: string;

  /** Delete input HTML files after conversion */
  replace: boolean;

  /** Preview changes without writing files */
  dryRun: boolean;

  /** Enable verbose output */
  verbose: boolean;

  /** Base path for API docs in Docusaurus */
  basePath: string;

  /**
   * Emit JSON definitions during export (debug/cache)
   * When enabled, each processed HTML page will write a JSON envelope alongside the export.
   */
  emitJson: boolean;

  /**
   * Emit JSON only (do not write MDX files)
   * Useful for a two-step workflow: HTML -> JSON, then JSON -> MDX.
   */
  emitJsonOnly: boolean;

  /**
   * Directory where JSON envelopes will be written (only used when emitJson=true)
   */
  jsonOutDir: string;

  /**
   * Read definitions from JSON envelopes instead of parsing HTML
   * Can be a directory (recursive) or a single .json file.
   */
  fromJsonPath: string | null;
}

/**
 * Default export options
 */
export const defaultOptions: ExportOptions = {
  inputDir: './sourceDocs',
  outputDir: './docs/api',
  replace: false,
  dryRun: false,
  verbose: false,
  basePath: '/api/',
  emitJson: false,
  emitJsonOnly: false,
  jsonOutDir: './.exporter-json',
  fromJsonPath: null
};

/**
 * Context passed through the conversion pipeline
 */
export class ConversionContext {
  /** Export options */
  readonly options: ExportOptions;

  /** API tree structure */
  readonly tree: ExApiTree;

  /** Route registry for URL resolution */
  readonly routeRegistry: ExApiRouteRegistry;

  /** Reporter for logging */
  readonly reporter: Reporter;

  constructor(options: Partial<ExportOptions> = {}) {
    this.options = { ...defaultOptions, ...options };
    this.tree = new ExApiTree(this.options.inputDir);
    this.routeRegistry = new ExApiRouteRegistry(this.options.basePath);
    this.reporter = new Reporter({
      verbose: this.options.verbose,
      quiet: false
    });
  }
}
