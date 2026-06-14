import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { remarkAdmonition } from './src/lib/remark-admonition';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://fanquanpp.github.io',
  base: '/FANDEX/',
  build: {
    inlineStylesheets: 'auto',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemap(), vue()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkEmoji, remarkMath, remarkAdmonition],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,
      rehypeLazyImages,
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
      langAlias: {
        gitignore: 'bash',
        sshconfig: 'plaintext',
        gitattributes: 'plaintext',
        text: 'plaintext',
      },
    },
  },
  trailingSlash: 'always',
  server: {
    port: 3000,
  },
});
