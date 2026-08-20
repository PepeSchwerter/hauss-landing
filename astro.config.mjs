// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Keystatic injects on-demand (/keystatic) admin routes, which need a server
// adapter to build. Only load it in `astro dev` so `astro build` stays fully
// static, matching the Cloudflare Pages static deploy target.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  // Output stays static by default; only routes that opt out via
  // `export const prerender = false` (e.g. src/pages/api/contacto.ts) are
  // rendered on-demand as a Cloudflare Pages Function. The rest of the site
  // is still prerendered to static HTML at build time.
  //
  // `prerenderEnvironment: 'node'` keeps static prerendering (index.astro's
  // Keystatic `createReader` call, which needs real `node:fs`) on Astro's
  // normal Node build instead of the adapter's default workerd emulation —
  // Workers has no real filesystem, even with nodejs_compat.
  //
  // The adapter is only registered for `astro build`. As of
  // @astrojs/cloudflare v14, its presence also makes `astro dev` route every
  // on-demand request (not just prerendered ones) through a real workerd
  // sandbox via @cloudflare/vite-plugin — `prerenderEnvironment: 'node'`
  // doesn't cover that path. Keystatic's `/keystatic` admin routes are
  // on-demand and need real `node:fs` for local storage, so under workerd
  // route matching throws and takes the whole dev server down with it
  // (including unrelated pages like the homepage, which is why the contact
  // form appeared to vanish). Excluding the adapter from `dev` keeps the
  // whole dev server on plain Node, matching how it behaved before v14.
  adapter: isDev ? undefined : cloudflare({ prerenderEnvironment: 'node' }),
  integrations: [react(), ...(isDev ? [keystatic()] : [])]
});