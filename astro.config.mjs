// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// Deployment settings.
// GitHub Pages project site is served at katkodeorg.github.io/avora-blogs,
// so the site builds under the /avora-blogs base path.
// To move to the custom domain at the root later: set BASE to '' , set
// `base` to '/', change SITE to 'https://blog.avoramatcha.com', and re-add
// public/CNAME.
const BASE = '/avora-blogs';
const SITE = 'https://katkodeorg.github.io';

// Prefix root-relative links/images inside Markdown with the base path, so
// in-article links like /blog/... resolve correctly under the base.
function rehypeBasePaths() {
	const walk = (node) => {
		if (node.type === 'element' && node.properties) {
			for (const attr of ['href', 'src']) {
				const v = node.properties[attr];
				if (
					typeof v === 'string' &&
					v.startsWith('/') &&
					!v.startsWith('//') &&
					!v.startsWith('/_astro') &&
					!(v === BASE || v.startsWith(BASE + '/'))
				) {
					node.properties[attr] = BASE + v;
				}
			}
		}
		if (node.children) for (const c of node.children) walk(c);
	};
	return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	// Build into docs/ so GitHub Pages can serve from the /docs folder.
	outDir: './docs',

	integrations: [mdx(), sitemap(), react()],

	markdown: {
		rehypePlugins: [rehypeBasePaths],
	},

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
