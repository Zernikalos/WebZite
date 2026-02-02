import * as cheerio from 'cheerio';
import path from 'path';
import { ConversionContext, ExportOptions, defaultOptions } from './ConversionContext';
import { ExApiTree } from '../routing/ExApiTree';
import { setNodeOutput, markNodeSkipped } from '../routing/ExApiTreeNode';
import { sourcePathToRouteId, routeIdToSlug } from '../routing/urlNormalizer';
import { parseHtml, detectPageType } from '../parsers';
import { writeMdx } from '../writers';
import { shouldGeneratePage } from '../rules';
import { readHtmlFile, readJsonFile, findJsonFiles, writeFileAtomic, deleteFile, pathExists, isDirectory, ensureDir } from '../utils/fileUtils';
import { calculateOutputPath, normalizePath, getRelativePath, joinPath } from '../utils/pathUtils';
import { formatMdx } from '../utils/formatUtils';
import { ExportSummary } from './Reporter';
import { PageType, SkipReason } from '../definitions';
import { ExApiJsonEnvelope, makeJsonEnvelope } from './jsonEnvelope';

/**
 * Result of the export pipeline
 */
export interface PipelineResult extends ExportSummary {
  success: boolean;
}

/**
 * Export Pipeline - orchestrates the entire conversion process
 */
export class ExportPipeline {
  private context: ConversionContext;

  constructor(options: Partial<ExportOptions> = {}) {
    this.context = new ConversionContext(options);
  }

  /**
   * Run the export pipeline
   */
  async run(): Promise<PipelineResult> {
    const { options, reporter } = this.context;

    reporter.start();
    reporter.info(`Input:  ${options.inputDir}`);
    reporter.info(`Output: ${options.outputDir}`);

    if (options.dryRun) {
      reporter.info('[DRY RUN] No files will be written');
    }

    // If fromJsonPath is provided, generate MDX from JSON envelopes instead of parsing HTML
    if (options.fromJsonPath) {
      reporter.progress('\nLoading JSON envelopes...');

      const jsonPath = options.fromJsonPath;
      const jsonFiles = isDirectory(jsonPath) ? findJsonFiles(jsonPath) : [jsonPath];
      reporter.info(`Found ${jsonFiles.length} JSON files`);

      reporter.progress('\nGenerating MDX from JSON...');
      for (const jsonFile of jsonFiles) {
        await this.processJsonEnvelope(jsonFile);
      }
    } else {
      // Phase 1: Build tree from directory
      reporter.progress('\nScanning input directory...');
      const tree = ExApiTree.fromDirectory(options.inputDir);
      reporter.info(`Found ${tree.size} HTML files`);

      // Phase 2: Process each file
      reporter.progress('\nProcessing files...');

      for (const node of tree) {
        await this.processFile(tree, node.sourcePath);
      }
    }

    // Phase 3: Print summary
    reporter.printSummary();

    const summary = reporter.getSummary();
    return {
      ...summary,
      success: summary.failed === 0
    };
  }

  /**
   * Process a single HTML file
   */
  private async processFile(tree: ExApiTree, relativePath: string): Promise<void> {
    const { options, reporter, routeRegistry } = this.context;

    const inputFile = joinPath(options.inputDir, relativePath);
    const node = tree.getNodeBySourcePath(relativePath);

    if (!node) {
      reporter.error(relativePath, 'Node not found in tree');
      return;
    }

    try {
      // Read HTML
      const html = readHtmlFile(inputFile);
      const $ = cheerio.load(html);

      // Detect page type
      const pageType = detectPageType($);
      if (!pageType) {
        reporter.skip(relativePath, SkipReason.CONFIG_DISABLED);
        markNodeSkipped(node, SkipReason.CONFIG_DISABLED);
        return;
      }

      // Parse HTML
      const definition = parseHtml($, relativePath);
      if (!definition) {
        reporter.error(relativePath, 'Failed to parse HTML');
        return;
      }

      // Check if page should be generated
      const decision = shouldGeneratePage(definition);
      if (!decision.generate) {
        reporter.skip(relativePath, decision.reason!);
        markNodeSkipped(node, decision.reason!);
        return;
      }

      // Calculate output path
      let outputRelativePath = relativePath;

      // Special case: root library index goes inside -zernikalos folder
      if (outputRelativePath === 'index.html') {
        outputRelativePath = '-zernikalos/index.html';
      }

      const outputPath = calculateOutputPath(
        options.inputDir,
        options.outputDir,
        joinPath(options.inputDir, outputRelativePath),
        '.mdx'
      );

      // Calculate slug
      const routeId = sourcePathToRouteId(normalizePath(outputRelativePath).replace(/\.html$/, '.mdx'));
      const slug = routeIdToSlug(routeId.replace(/-zernikalos\/?/, ''));

      // Update node
      setNodeOutput(node, outputPath, slug, pageType);

      // Register route
      routeRegistry.register({
        routeId,
        sourcePath: relativePath,
        outputPath,
        slug,
        shouldGenerate: true,
        skipReason: null
      });

      // Generate MDX
      const mdxContent = writeMdx(definition, slug === '' ? './' : slug);
      if (!mdxContent) {
        reporter.error(relativePath, 'Failed to generate MDX');
        return;
      }

      // Format with Prettier (only if we'll write MDX)
      const formattedContent = options.emitJsonOnly ? null : await formatMdx(mdxContent);

      // Write file (unless dry run)
      if (!options.dryRun) {
        if (!options.emitJsonOnly && formattedContent !== null) {
          writeFileAtomic(outputPath, formattedContent);
        }

        // Optionally emit JSON envelope for this page
        if (options.emitJson) {
          ensureDir(options.jsonOutDir);
          const envelope = makeJsonEnvelope({
            routeId,
            slug: slug === '' ? './' : slug,
            outputPath,
            outputDir: options.outputDir,
            definition
          });
          const jsonOutPath = joinPath(
            options.jsonOutDir,
            envelope.outputRelativePath.replace(/\.mdx$/i, '.json')
          );
          writeFileAtomic(jsonOutPath, JSON.stringify(envelope, null, 2));
        }

        // Delete original if replace option is set
        if (options.replace && !options.emitJsonOnly) {
          deleteFile(inputFile);
        }
      }

      reporter.success(relativePath);

    } catch (error) {
      reporter.error(relativePath, error instanceof Error ? error : String(error));
    }
  }

  /**
   * Process a single JSON envelope and generate MDX output
   */
  private async processJsonEnvelope(jsonFilePath: string): Promise<void> {
    const { options, reporter } = this.context;
    try {
      const envelope = readJsonFile<ExApiJsonEnvelope>(jsonFilePath);

      if (!envelope || envelope.version !== 1) {
        reporter.error(jsonFilePath, 'Invalid JSON envelope (missing/unsupported version)');
        return;
      }

      const mdxContent = writeMdx(envelope.definition, envelope.slug === '' ? './' : envelope.slug);
      if (!mdxContent) {
        reporter.error(jsonFilePath, 'Failed to generate MDX from JSON');
        return;
      }

      const formattedContent = await formatMdx(mdxContent);
      const outputPath = joinPath(options.outputDir, envelope.outputRelativePath);

      if (!options.dryRun) {
        writeFileAtomic(outputPath, formattedContent);
      }

      reporter.success(`json:${path.relative(options.fromJsonPath ?? '', jsonFilePath)}`);
    } catch (error) {
      reporter.error(jsonFilePath, error instanceof Error ? error : String(error));
    }
  }
}
