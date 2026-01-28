export type SitemapItem = {
  url: string;
  lastmod?: string;
  changefreq?: string | null;
  priority?: number | null;
};

type CreateSitemapItemsParams = {
  siteConfig: {
    url: string;
    baseUrl: string;
  };
  defaultCreateSitemapItems: (params: unknown) => Promise<SitemapItem[]>;
} & Record<string, unknown>;

type SitemapRule = {
  match: (pathname: string) => boolean;
  priority: number | null;
  changefreq?: string | null;
};

const API_INDEX_PATH_RE = /^\/api\/index\/?$/;

const rules: SitemapRule[] = [
  {
    match: (p) => p === '/',
    priority: 1.0,
    changefreq: 'monthly',
  },
  {
    match: (p) => p.startsWith('/quickstart/category/'),
    priority: 0.4,
  },
  {
    match: (p) => API_INDEX_PATH_RE.test(p),
    priority: 0.4,
  },
];

export async function createZernikalosSitemapItems(
  params: CreateSitemapItemsParams
): Promise<SitemapItem[]> {
  const {siteConfig, defaultCreateSitemapItems, ...rest} = params;
  const items = await defaultCreateSitemapItems(params);

  const defaults = {priority: 0.8 as number | null, changefreq: null as string | null};

  const filtered = items.map((item) => {
    const urlPath = new URL(item.url).pathname;

    const rule = rules.find((r) => r.match(urlPath));
    const priority = rule?.priority ?? defaults.priority;
    const changefreq = rule?.changefreq ?? defaults.changefreq;

    return {
      ...item,
      priority,
      changefreq,
    };
  });

  // Ensure /api/index/ is present even if we ignore /api/** routes.
  const apiIndexPath = `${siteConfig.baseUrl}api/index/`;
  const apiIndexUrl = new URL(apiIndexPath, siteConfig.url).toString();
  const alreadyHasApiIndex = filtered.some((i) => i.url === apiIndexUrl);

  return alreadyHasApiIndex
    ? filtered
    : [
        ...filtered,
        {
          url: apiIndexUrl,
          priority: 0.4,
          changefreq: null,
        },
      ];
}

