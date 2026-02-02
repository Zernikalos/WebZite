export function normalizeBasePath(value?: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';
  const noSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return noSlashes ? `/${noSlashes}` : '';
}

