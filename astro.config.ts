import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { remarkAdmonition } from './src/lib/remark-admonition';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images';

export default defineConfig({
  site: 'https://fanquanpp.github.io',
  base: '/FANDEX/',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemap(), vue()],
  markdown: {
    remarkPlugins: [remarkAdmonition],
    rehypePlugins: [rehypeLazyImages],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
