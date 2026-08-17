import fs from "node:fs";
import path from "node:path";

export function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

export function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

export function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

export function listFilesRecursive(dirAbs) {
  const out = [];
  const stack = [dirAbs];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) out.push(p);
    }
  }
  return out;
}

export function shouldCopy(src, dst) {
  if (!isFile(dst)) return true;
  const s = fs.statSync(src);
  const d = fs.statSync(dst);
  return s.mtimeMs > d.mtimeMs || s.size !== d.size;
}

export function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

/**
 * Mirror files from srcDir into dstDir.
 * When clean=true, remove destination files that no longer exist in source.
 */
export function syncDir(srcDir, dstDir, { clean = false } = {}) {
  ensureDir(dstDir);
  const srcFiles = listFilesRecursive(srcDir);
  const srcRelSet = new Set();
  let copied = 0;
  for (const srcAbs of srcFiles) {
    const rel = path.relative(srcDir, srcAbs);
    srcRelSet.add(rel);
    const dstAbs = path.join(dstDir, rel);
    if (shouldCopy(srcAbs, dstAbs)) {
      copyFile(srcAbs, dstAbs);
      copied += 1;
    }
  }

  let removed = 0;
  if (clean) {
    const dstFiles = listFilesRecursive(dstDir);
    for (const dstAbs of dstFiles) {
      const rel = path.relative(dstDir, dstAbs);
      if (!srcRelSet.has(rel)) {
        fs.rmSync(dstAbs);
        removed += 1;
      }
    }
  }
  return { copied, removed };
}

/** Resolve a path that may be absolute or relative to `base`. */
export function resolveFrom(base, maybeRelative) {
  if (path.isAbsolute(maybeRelative)) return maybeRelative;
  return path.resolve(base, maybeRelative);
}
