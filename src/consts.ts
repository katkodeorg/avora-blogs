// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Avora Matcha Journal';
export const SITE_DESCRIPTION =
	'The Avora Matcha Journal. Everything about ceremonial-grade matcha: how to whisk it, where it comes from, its health benefits, and the story behind Avora. Sourced from Kyoto & Kagoshima, Japan.';

// Used for Organization structured data (JSON-LD) and Open Graph.
export const BRAND_NAME = 'Avora Matcha';
export const SITE_URL = 'https://www.avoramatcha.com';
export const STORE_URL = 'https://www.avoramatcha.com/product/ceremonial-matcha';
export const CONTACT_EMAIL = 'care@avoramatcha.com';
export const SOCIAL_LINKS: string[] = [
	// Add your real social profile URLs here (Instagram, TikTok, etc.).
	// They strengthen Organization structured data via `sameAs`.
];

// Prefix an internal path with the site's base path (e.g. /avora-blogs) so
// links work both on the GitHub Pages project site and at the root domain.
export function withBase(path = '/'): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${base}${p}` || '/';
}
