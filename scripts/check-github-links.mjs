#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');
const API_DIR = path.join(OUT_DIR, 'api');

const MAX_LINKS = Number.parseInt(process.env.GITHUB_LINKS_MAX || '50', 10);
const CONCURRENCY = Number.parseInt(process.env.GITHUB_LINKS_CONCURRENCY || '8', 10);

function die(message) {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) die('[github-links] Expected ./out to exist. Run pnpm build first.');
if (!fs.existsSync(API_DIR)) die('[github-links] Expected ./out/api to exist. Run pnpm build first.');

function walkHtmlFiles(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
}

const htmlFiles = [];
walkHtmlFiles(API_DIR, htmlFiles);

const linkRe = /https:\/\/github\.com\/Zernikalos\/Zernikalos\/(?:blob|tree)\/[^"' )\]]+/g;
const links = new Set();

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf-8');
  const matches = text.match(linkRe);
  if (!matches) continue;
  for (const m of matches) {
    // Drop fragment for request purposes.
    links.add(m.split('#')[0]);
  }
}

const allLinks = [...links];
const sample = allLinks.slice(0, Math.max(0, MAX_LINKS));

// eslint-disable-next-line no-console
console.log(`[github-links] Found ${allLinks.length} unique GitHub links under out/api; checking ${sample.length}.`);

async function fetchOk(url) {
  // HEAD sometimes gets blocked/redirect weirdly; use GET but keep it cheap.
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent': 'webzite-links-check',
      'Accept': 'text/html,application/xhtml+xml'
    }
  });
  return res.status >= 200 && res.status < 400;
}

async function worker(queue, failures) {
  while (true) {
    const url = queue.pop();
    if (!url) return;
    try {
      const ok = await fetchOk(url);
      if (!ok) failures.push({ url, status: 'bad-status' });
    } catch (err) {
      failures.push({ url, status: 'error', err: String(err) });
    }
  }
}

const queue = [...sample].reverse();
const failures = [];
const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker(queue, failures));
await Promise.all(workers);

if (failures.length > 0) {
  // eslint-disable-next-line no-console
  console.error(`[github-links] FAIL: ${failures.length} broken GitHub links (sample).`);
  for (const f of failures.slice(0, 20)) {
    // eslint-disable-next-line no-console
    console.error(`- ${f.url} (${f.status}${f.err ? `: ${f.err}` : ''})`);
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log('[github-links] OK');

