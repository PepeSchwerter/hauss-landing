# Learnings: Astro adapters, Cloudflare Workers, and dev-vs-build environments

Notes from debugging a `astro dev` crash where `/keystatic` threw and the
contact form disappeared from the homepage. Kept here because the underlying
concepts (adapters, prerendering, edge vs. serverless) come up again any time
this project's deploy setup changes.

## The incident

**Symptom:** In local `astro dev`, opening `/keystatic` crashed with a stack
trace through `NonRunnablePipeline.getComponentByRoute` and
`workers/runner-worker`. The contact form also stopped rendering on the
homepage, seemingly unrelated.

**Root cause:** `@astrojs/cloudflare` v14 changed `astro dev` behavior: when
the adapter is registered at all, it routes every *on-demand* (non-prerendered)
request during local dev through a real `workerd` sandbox (via
`@cloudflare/vite-plugin`), not just build-time prerendering. `/keystatic` is
an on-demand route (Keystatic writes files, so it can't be static) that calls
real `node:fs` for its `local` storage mode. `workerd` has no filesystem, so
route matching threw — and because Astro's dev server matches every incoming
route through the same pipeline, the crash took the whole dev server down
with it, which is why the homepage's contact form appeared to vanish too. It
wasn't a `Contact.tsx` bug at all — it was collateral damage.

`prerenderEnvironment: 'node'` (already set in `astro.config.mjs` for the
*build's* prerender pass) didn't help here because it only affects
prerendered routes, not on-demand ones like `/keystatic`.

**Fix (see `astro.config.mjs` and `src/pages/api/contacto.ts`):**
1. Only register the Cloudflare adapter for `astro build`, not `astro dev`
   (`adapter: isDev ? undefined : cloudflare(...)`) — mirrors the existing
   pattern that already made Keystatic itself dev-only. This keeps
   `astro dev` on Astro's plain Node dev server, with a real filesystem
   everywhere, matching pre-v14 behavior.
2. Changed the static `import { env } from "cloudflare:workers"` in
   `contacto.ts` to a dynamic, `.catch()`-guarded `import("cloudflare:workers")`.
   That module only exists inside an actual/emulated Workers runtime; a
   *static* import that can't resolve crashes the whole module at load time,
   while a *dynamic* import just rejects a promise, which can be caught and
   falls back to `import.meta.env` (the local `.env` file) — exactly the
   fallback the code already intended for local dev.

---

## Concept: what an "adapter" is (in Astro, and in general)

Astro's job is to render components to HTML. It doesn't know or care *where*
that HTML — or any on-demand code — will actually run. The **adapter** is the
translation layer that packages Astro's output into whatever shape a specific
hosting platform expects (entry-point conventions, runtime globals, bundling
format).

- A **fully static site** needs no adapter — `astro build` just emits
  `.html`/`.css`/`.js` files, served directly by any CDN.
- The moment any route opts into on-demand rendering
  (`export const prerender = false`, as `contacto.ts` does — it needs to read
  a secret and call an API *at request time*), Astro needs to know which
  platform's conventions to target. That's what `@astrojs/cloudflare`
  provides: it bundles on-demand routes into the Cloudflare Pages Functions
  format, while leaving everything else as plain static files.

This mixed shape — static site + a couple of on-demand exceptions — is
Astro's **hybrid rendering** model. Swapping hosts means swapping the
adapter package (`@astrojs/vercel`, `@astrojs/netlify`, etc.); the component
code doesn't change.

### `prerenderEnvironment: 'node'` — a narrow, deliberate exception

The Cloudflare adapter's default behavior even runs the *build's*
prerendering step inside a simulated Workers sandbox (`workerd`), to catch
platform incompatibilities early. But `index.astro` calls Keystatic's
`createReader`, which needs real `node:fs` to read
`src/content/projects/*.yaml` off disk — and `workerd` has no real
filesystem. `prerenderEnvironment: 'node'` tells the adapter "run the
prerender pass on plain Node instead" — scoped only to that build step, not
to on-demand routes (which is exactly the gap that caused this incident).

### Next.js, for comparison

Next.js doesn't expose an explicit `adapter:` config field for the common
cases, because it was built alongside Vercel:
- `next start` runs a persistent Node server — works anywhere that can run
  an arbitrary Node process (VPS, Docker, etc.). This is *not* serverless.
- Deploying to Vercel: Vercel reads Next's internal Build Output API
  directly and auto-splits the app into functions — no separate adapter
  package needed, because the platform and framework are built to
  understand each other.
- Deploying anywhere else (Cloudflare, AWS Lambda, Netlify) *does* need an
  adapter-equivalent tool — `@cloudflare/next-on-pages` / OpenNext, OpenNext
  for AWS, Netlify's Next.js Runtime — which reads `.next` build output and
  reshapes it into that platform's function format. Conceptually identical
  to what `@astrojs/cloudflare` does; just not baked into the framework as a
  first-party pluggable field.
- Next's closest equivalent to `prerenderEnvironment` is the per-route
  `export const runtime = 'nodejs' | 'edge'` flag — declaring whether a
  route's server code needs full Node APIs or can run in the restricted
  Edge runtime.

---

## Concept: edge functions never have a filesystem — and why

An **edge function** (Cloudflare Workers, Vercel Edge Functions, Deno
Deploy) is not a lightweight server or micro-VM — it's a **V8 isolate**,
the same sandboxing mechanism Chrome uses to separate browser tabs.
Thousands of isolates share one physical process; each is just a slice of
memory with a JS engine context, not a separate OS process and not backed
by its own kernel. That's what makes them start in under a millisecond and
deploy simultaneously to hundreds of physical PoPs (including the Chile
edge nodes in `CLAUDE.md`'s hosting rationale).

A real filesystem needs a real OS underneath handling disk I/O. An isolate
has no OS underneath to ask — `node:fs` isn't disabled in Workers, it's
categorically absent, because there's no disk concept for the isolate to
even reach for. This is the root mechanism behind the whole incident above.

## Concept: "serverless" is not one thing

| Category | Examples | Filesystem? | Cold start | What it actually is |
|---|---|---|---|---|
| Static hosting | Cloudflare Pages assets, plain CDN | n/a, no code runs | none | Files served from a CDN, no function invoked |
| Edge functions | Cloudflare Workers, Vercel Edge Functions, Deno Deploy | **Never** | ~0ms | V8 isolate, shared process, restricted API surface (`fetch`, `crypto`, streams — not full Node) |
| Serverless functions | AWS Lambda, Vercel Serverless (Node) Functions, Netlify Functions | **Ephemeral only** (`/tmp`, wiped between cold starts) | ~100–500ms | A real lightweight container/microVM (e.g. AWS Firecracker) running a full Node process |
| Persistent server | `next start` on a VPS/EC2/Docker host | **Full, real, persistent** | none (already running) | Not serverless — you own uptime and scaling |

Edge functions and Lambda-style "serverless functions" are both often
called "serverless," but they're genuinely different runtimes underneath.
Lambda-style functions get a scratch disk because they're real Node
processes in real (if disposable) VMs; edge isolates never do, because
they aren't processes at all.

**Applied to this project:** Cloudflare Pages Functions run on the Workers
runtime — the edge-isolate model — so "no filesystem, ever" is permanent
for anything deployed there, including `/api/contacto` in production. The
build step and `astro dev`, by contrast, run as ordinary processes on a
real machine (your laptop or a CI runner) with a real disk — a completely
different environment from the deployed function. Keeping
filesystem-dependent code (Keystatic) confined to those real-disk
environments, and keeping the "no filesystem" edge runtime scoped to only
the one route that doesn't need a disk, is the general principle behind
the fix at the top of this document.
