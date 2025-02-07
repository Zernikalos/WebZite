import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import platformsToIcons from './src/remark/platformsToIcons';

const baseConfig = {
  projectName: 'Zernikalos',
  projectUrl: 'https://zernikalos.dev',
  githubUrl: 'https://github.com/zernikalos'
}

const config: Config = {
  title: 'Zernikalos Engine',
  tagline: 'The Kotlin 3D Engine',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://zernikalos.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Zernikalos', // Usually your GitHub org/user name.
  projectName: 'Zernikalos Engine', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

          //remarkPlugins: [platformsToIcons],

        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/main.css',
            './src/css/style.css',
            './src/css/prism.css',
            //'./src/css/ui-kit.min.css',
            './src/css/zk-docs-styles.css'
          ],
        
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        //{to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://gitlab.com/zernikalos',
          label: 'Gitlab',
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
              to: '/docs/intro',
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
              label: 'Gitlab',
              href: 'https://gitlab.com/zernikalos',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zernikalos. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
