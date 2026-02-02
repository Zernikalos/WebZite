import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    searchToggle: {
      enabled: false,
    },
    nav: {
      title: 'Zernikalos',
    },
    githubUrl: 'https://github.com/Zernikalos/',
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'API Reference',
        // Static files in `public/` don't always resolve directory indexes in Next dev.
        // Point to the concrete file so it works both locally and on GitHub Pages.
        url: '/api/index.html',
      },
    ],
  };
}
