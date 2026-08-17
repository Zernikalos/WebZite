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

function isGithubUnicorn(status, body) {
  if (status !== 503 && status !== 500) return false;
  return /unicorn/i.test(body) || /we weren't able to load that/i.test(body);
}

function describeFailure(status, body, err) {
  if (err) return `network error: ${err}`;
  if (isGithubUnicorn(status, body)) {
    return `${status} GitHub unicorn (pink unicorn outage page — GitHub is down, retry later)`;
  }
  if (status === 404) return '404 not found';
  if (status === 403) return '403 forbidden (rate limit or blocked)';
  if (status === 429) return '429 too many requests (rate limited)';
  if (status === 503) return '503 service unavailable';
  if (status >= 500) return `${status} GitHub server error`;
  if (status >= 400) return `${status} bad status`;
  return `unexpected status ${status}`;
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

async function checkUrl(url) {
  // HEAD sometimes gets blocked/redirect weirdly; use GET but keep it cheap.
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent': 'webzite-links-check',
      'Accept': 'text/html,application/xhtml+xml'
    }
  });
  const body = await res.text();
  const ok = res.status >= 200 && res.status < 400;
  return { url, ok, status: res.status, body };
}

async function worker(queue, failures) {
  while (true) {
    const url = queue.pop();
    if (!url) return;
    try {
      const result = await checkUrl(url);
      if (!result.ok) {
        failures.push({
          url,
          reason: describeFailure(result.status, result.body),
          unicorn: isGithubUnicorn(result.status, result.body),
        });
      }
    } catch (err) {
      failures.push({ url, reason: describeFailure(0, '', String(err)) });
    }
  }
}

const queue = [...sample].reverse();
const failures = [];
const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker(queue, failures));
await Promise.all(workers);

if (failures.length > 0) {
  const unicornCount = failures.filter((f) => f.unicorn).length;
  // eslint-disable-next-line no-console
  console.error(`[github-links] FAIL: ${failures.length} broken GitHub links (sample).`);
  if (unicornCount > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `[github-links] ${unicornCount} hit GitHub's pink unicorn page — this is a GitHub outage, not a missing file.`,
    );
  }
  for (const f of failures.slice(0, 20)) {
    // eslint-disable-next-line no-console
    console.error(`- ${f.url} (${f.reason})`);
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log('[github-links] OK');
