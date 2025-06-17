import type { Plugin } from '@docusaurus/types';

export default function tailwindConfigPlugin(): Plugin<void> {
  return {
      name: "tailwind-plugin",
    configurePostCss(postcssOptions) {
        postcssOptions.plugins = [require("@tailwindcss/postcss")];
      return postcssOptions;
    },
  };
};