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
        url: '/api/',
      },
    ],
  };
}
