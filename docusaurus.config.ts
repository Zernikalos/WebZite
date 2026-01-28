import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import platformsToIcons from './src/remark/platformsToIcons';
import {createZernikalosSitemapItems} from './docusaurusconf/sitemap.config';

const config: Config = {

  title: 'Zernikalos Engine',
  tagline: 'The Kotlin 3D Engine',
  favicon: 'img/zklogo.svg',

  // Set the production url of your site here
  url: 'https://zernikalos.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Zernikalos', // Usually your GitHub org/user name.
  projectName: 'zernikalos.github.io', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
      type: 'text/css',
    },
  ],

  markdown: {
    format: "detect",
    mermaid: true,
    anchors: {
      maintainCase: true
    }
  },

  scripts: [
    {
      src: '/data-toggle.js',
      async: true,
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs/quick-start',
          routeBasePath: 'quickstart',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: [
            './src/css/zk-docs-styles.css',
          ],
        
        },
        // sitemap: {
        //   changefreq: 'weekly',
        //   priority: 0.5,
        //   filename: 'sitemap.xml',
        // },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Plugin to ignore watching files in certain directories
    () => ({
      name: 'docusaurus-ignore-watch-plugin',
      configureWebpack() {
        return {
          watchOptions: {
            ignored: [
              '**/sourceDocs/**',
              '**/scripts/**',
            ],
          },
        };
      },
    }),
    [
      "./src/plugins/tailwind-config.ts", 
      {}
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api',
        sidebarPath: './sidebars.ts',
        //docItemComponent: '@site/src/components/api/ApiDocItem',
        exclude: ['**/scripts/**', '**/sourceDocs/**'],
        sidebarItemsGenerator: function({
          isCategoryIndex: defaultCategoryIndexMatcher,
          defaultSidebarItemsGenerator,
          ...args
        }) {
          return defaultSidebarItemsGenerator({
            ...args,
            isCategoryIndex(doc) {
              if (doc.directories.includes('-zernikalos')) {
                return doc.fileName.toLowerCase() === 'index'
              }
              return defaultCategoryIndexMatcher(doc);
            },
          });
        },
      }
    ],
    [
      '@docusaurus/plugin-ideal-image', 
      {}
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        id: 'sitemap',
        lastmod: 'date',
        // We'll assign changefreq/priority per-URL in createSitemapItems.
        changefreq: null,
        priority: null,
        // Exclude the whole API subtree; we will re-add /api/index/ manually.
        ignorePatterns: ['/api/**'],
        filename: 'sitemap.xml',
        createSitemapItems: createZernikalosSitemapItems,
      }
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'zernikalos, engine, game development, kotlin, 3d, graphics'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Zernikalos',
      logo: {
        srcDark: 'img/zklogo.svg',
        alt: 'Zernikalos Logo',
        src: 'img/zklogo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'quickstartSidebar',
          position: 'left',
          label: 'Quick Start',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          docsPluginId: 'api',
          position: 'left',
          label: 'API',
        },
        //{to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Zernikalos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/quickstart',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/zernikalos',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'API',
              to: '/api',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Zernikalos',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Zernikalos. Built with 💙 in 🇮🇨`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['kotlin'],
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
