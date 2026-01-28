import { Command } from 'commander';
import path from 'path';
import { ExportPipeline } from './pipeline/ExportPipeline';
import { pathExists, isDirectory } from './utils/fileUtils';

/**
 * CLI entry point for the exporter
 */
export async function main(): Promise<void> {
  const program = new Command();

  program
    .name('exporter')
    .description('Export Dokka HTML documentation to MDX format')
    .argument('[input-path]', 'Path to input file or directory', './sourceDocs')
    .option('-o, --output <output-path>', 'Path to output file or directory', './docs/api')
    .option('-r, --replace', 'Delete input HTML files after conversion', false)
    .option('--dry-run', 'Preview changes without writing files', false)
    .option('-v, --verbose', 'Enable verbose output', false)
    .option('--base-path <path>', 'Base path for API docs in Docusaurus', '/api/')
    .option('--emit-json', 'Emit JSON envelopes for each page (debug/cache)', false)
    .option('--json-out <path>', 'Output directory for JSON envelopes', './.exporter-json')
    .option('--from-json <path>', 'Generate MDX from previously emitted JSON envelopes (dir or file)')
    .parse(process.argv);

  const options = program.opts();
  const inputPath = program.args[0] || './sourceDocs';

  // Validate input path
  if (!pathExists(inputPath)) {
    console.error(`Error: Input path does not exist: ${inputPath}`);
    process.exit(1);
  }

  if (!isDirectory(inputPath)) {
    console.error(`Error: Input path must be a directory: ${inputPath}`);
    process.exit(1);
  }

  // Resolve paths
  const inputDir = path.resolve(inputPath);
  const outputDir = path.resolve(options.output);

  // Run pipeline
  const pipeline = new ExportPipeline({
    inputDir,
    outputDir,
    replace: options.replace,
    dryRun: options.dryRun,
    verbose: options.verbose,
    basePath: options.basePath,
    emitJson: options.emitJson,
    jsonOutDir: path.resolve(options.jsonOut),
    fromJsonPath: options.fromJson ? path.resolve(options.fromJson) : null
  });

  try {
    const result = await pipeline.run();

    if (!result.success) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
