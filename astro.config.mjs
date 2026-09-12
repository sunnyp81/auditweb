// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cities from './src/data/cities.json' with { type: 'json' };

const cityPaths = new Set([...cities.uk, ...cities.us].map(city => `/website-audit-services/${city.slug}/`));

export default defineConfig({
  site: 'https://auditweb.site',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/\/(404(?:\.html)?|thank-you|subscribed)\/?$/.test(new URL(page).pathname) && !cityPaths.has(new URL(page).pathname) })],
  vite: {
    plugins: [tailwindcss()]
  }
});
