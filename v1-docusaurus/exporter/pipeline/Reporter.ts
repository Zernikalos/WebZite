import { SkipReason } from '../definitions';

/**
 * Represents an error that occurred during processing
 */
export interface ProcessingError {
  file: string;
  error: string;
  stack?: string;
}

/**
 * Represents a skipped file with reason
 */
export interface SkippedFile {
  file: string;
  reason: SkipReason;
}

/**
 * Summary statistics for the export process
 */
export interface ExportSummary {
  converted: number;
  skipped: number;
  failed: number;
  totalFiles: number;
  errors: ProcessingError[];
  skippedFiles: SkippedFile[];
  duration: number;
}

/**
 * Reporter options
 */
export interface ReporterOptions {
  verbose: boolean;
  quiet: boolean;
}

/**
 * Reporter class for logging progress and collecting statistics
 */
export class Reporter {
  private converted: string[] = [];
  private skipped: SkippedFile[] = [];
  private errors: ProcessingError[] = [];
  private startTime: number = 0;
  private options: ReporterOptions;

  constructor(options: Partial<ReporterOptions> = {}) {
    this.options = {
      verbose: options.verbose ?? false,
      quiet: options.quiet ?? false
    };
  }

  /**
   * Starts the timer for duration tracking
   */
  start(): void {
    this.startTime = Date.now();
    if (!this.options.quiet) {
      console.log('Starting export...\n');
    }
  }

  /**
   * Logs a successful conversion
   */
  success(file: string): void {
    this.converted.push(file);
    if (this.options.verbose) {
      console.log(`  \u2713 ${file}`);
    }
  }

  /**
   * Logs a skipped file
   */
  skip(file: string, reason: SkipReason): void {
    this.skipped.push({ file, reason });
    if (this.options.verbose) {
      console.log(`  - ${file} (${reason})`);
    }
  }

  /**
   * Logs an error
   */
  error(file: string, error: Error | string): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;
    this.errors.push({ file, error: errorMessage, stack });
    if (!this.options.quiet) {
      console.error(`  \u2717 ${file}: ${errorMessage}`);
    }
  }

  /**
   * Logs a progress message
   */
  progress(message: string): void {
    if (!this.options.quiet && this.options.verbose) {
      console.log(message);
    }
  }

  /**
   * Logs an info message
   */
  info(message: string): void {
    if (!this.options.quiet) {
      console.log(message);
    }
  }

  /**
   * Logs a warning message
   */
  warn(message: string): void {
    if (!this.options.quiet) {
      console.warn(`Warning: ${message}`);
    }
  }

  /**
   * Gets the final summary
   */
  getSummary(): ExportSummary {
    const duration = Date.now() - this.startTime;
    return {
      converted: this.converted.length,
      skipped: this.skipped.length,
      failed: this.errors.length,
      totalFiles: this.converted.length + this.skipped.length + this.errors.length,
      errors: this.errors,
      skippedFiles: this.skipped,
      duration
    };
  }

  /**
   * Prints the final summary
   */
  printSummary(): void {
    const summary = this.getSummary();

    if (this.options.quiet) {
      return;
    }

    console.log('\n' + '='.repeat(50));
    console.log('Export Summary');
    console.log('='.repeat(50));
    console.log(`  Converted: ${summary.converted}`);
    console.log(`  Skipped:   ${summary.skipped}`);
    console.log(`  Failed:    ${summary.failed}`);
    console.log(`  Total:     ${summary.totalFiles}`);
    console.log(`  Duration:  ${(summary.duration / 1000).toFixed(2)}s`);

    if (summary.errors.length > 0) {
      console.log('\nErrors:');
      for (const err of summary.errors.slice(0, 10)) {
        console.log(`  - ${err.file}: ${err.error}`);
      }
      if (summary.errors.length > 10) {
        console.log(`  ... and ${summary.errors.length - 10} more errors`);
      }
    }

    if (this.options.verbose && summary.skippedFiles.length > 0) {
      console.log('\nSkipped files by reason:');
      const byReason = new Map<SkipReason, number>();
      for (const skip of summary.skippedFiles) {
        byReason.set(skip.reason, (byReason.get(skip.reason) ?? 0) + 1);
      }
      for (const [reason, count] of byReason) {
        console.log(`  - ${reason}: ${count}`);
      }
    }

    console.log('='.repeat(50) + '\n');
  }

  /**
   * Resets the reporter state
   */
  reset(): void {
    this.converted = [];
    this.skipped = [];
    this.errors = [];
    this.startTime = 0;
  }
}
