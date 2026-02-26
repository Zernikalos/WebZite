import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

function normalizeBasePath(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === '/') return '';
  const noSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return noSlashes ? `/${noSlashes}` : '';
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static export is for production deploys. In `next dev`, keeping this disabled
  // avoids App Router complaining about unknown dynamic params when you visit
  // non-generated URLs (e.g. `/api/noexiste/`).
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  // For GitHub Pages "Project Pages" deployments set:
  // NEXT_PUBLIC_BASE_PATH="/<repo>"
  // This keeps local dev and root-domain deploys unchanged.
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  assetPrefix: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH) || undefined,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
};

export default withMDX(config);
