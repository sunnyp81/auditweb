// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://auditweb.site',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/\/(404|thank-you|subscribed)\/?$/.test(page) })],
  vite: {
    plugins: [tailwindcss()]
  }
});
