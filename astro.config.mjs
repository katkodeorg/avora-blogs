// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.avoramatcha.com',
  // Build into docs/ so GitHub Pages can serve from the /docs folder.
  outDir: './docs',

  integrations: [mdx(), sitemap(), react()],

  fonts: [
      {
          // Display serif for headlines.
          provider: fontProviders.google(),
          name: 'Cormorant Garamond',
          cssVariable: '--font-cormorant',
          fallbacks: ['Georgia', 'serif'],
          weights: [400, 500, 600, 700],
          styles: ['normal', 'italic'],
      },
      {
          // Body sans.
          provider: fontProviders.google(),
          name: 'DM Sans',
          cssVariable: '--font-dmsans',
          fallbacks: ['system-ui', 'sans-serif'],
          weights: [400, 500, 600, 700],
      },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});