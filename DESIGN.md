# HAUSS Design System

Source of truth for the visual language of the HAUSS landing page. This
document describes the system as implemented in `src/` (ported from the
spec in [`design-system/`](design-system/readme.md)) — read this when
building or editing any section of the site.

## Brand

HAUSS is a house-construction company based in Puerto Montt, Chile. The
site is a single marketing landing page, light-mode only.

- **Voice**: direct, confident, short sentences — construction-industry
  plainness, not sales fluff. Speaks as "we", addresses the reader as "tú".
- **Casing**: sentence case for headlines/body; uppercase only for
  eyebrows/tags/nav (small size, wide letter-spacing).
- **No emoji, no exclamation points, no decorative icons.** Arrows are the
  plain character `→`, not icon glyphs.

## Tokens

All tokens live in [`src/styles/tokens/`](src/styles/tokens/) and are
loaded once, globally, via [`src/styles/global.css`](src/styles/global.css)
→ imported from [`src/layouts/Layout.astro`](src/layouts/Layout.astro).
Every component consumes them as CSS custom properties (`var(--token)`) —
never hardcoded hex/px values — so a token edit propagates everywhere.

### Color (`tokens/colors.css`)

| Role | Token | Value |
|---|---|---|
| Primary ink (text, dark sections) | `--ink-950` | `#0c1821` |
| CTA accent | `--accent-cta` / `--yellow-500` | `#fde74c` |
| Alert / tag accent | `--accent-alert` / `--red-500` | `#cc3434` |
| Soft section background | `--accent-soft` / `--pink-300` | `#f4cbc6` |
| Page background | `--surface-page` | `#ffffff` |
| Off-white section background | `--surface-alt` | `#f7f4ee` |

Full ink scale (`--ink-50`…`--ink-950`) and semantic aliases
(`--text-primary`, `--text-secondary`, `--border-strong`, …) are in the
token file. Yellow is reserved for CTAs, red for tags/alerts, pink for soft
backgrounds — don't reassign an accent to a role it wasn't built for.

### Type (`tokens/typography.css`, `tokens/fonts.css`)

One family, **Plus Jakarta Sans** (substituted for the originally-briefed
General Sans — no font files were available to self-host; swap
`tokens/fonts.css` if the real files show up), two weights: ExtraBold 800
for display/headings, Regular/Medium for body.

| Token | Use |
|---|---|
| `--text-display-xl` / `-lg` / `-md` | Hero, section, and quote headlines (fluid `clamp()`) |
| `--text-heading` / `--text-subheading` | Card and sub-section titles |
| `--text-body-lg` / `--text-body` / `--text-body-sm` / `--text-caption` | Body copy, nav, labels |
| `--lh-tight` / `-snug` / `-normal` / `-relaxed` | Line-height, tightest on display, loosest on body |
| `--ls-tight` / `-wide` | Letter-spacing: tight on display, wide on uppercase eyebrows |

### Spacing & shape (`tokens/spacing.css`)

- Scale: `--space-1` (4px) through `--space-16` (128px).
- Radius: `--radius-sm` (2px) / `--radius-md` (4px) — sharp, near-square
  corners everywhere, **including buttons**. Deliberately not pill-shaped;
  this is what keeps the kit reading as structural/industrial rather than
  soft-SaaS. Never introduce a larger radius or a pill button.
- Borders over shadows: 1–2px hairline `--border-strong` (ink) do the work
  shadows would elsewhere. `--shadow-card` / `--shadow-pop` exist only for
  pop-over-style content, not general cards.
- Motion: `--duration-fast` (120ms) / `--duration-normal` (200ms),
  `--ease-standard`. Hover/focus transitions only — no bounce, no
  page-load animation.
- Container: `--container-max` (1200px) is the token value; the shipped
  sections use a wider `1500px` max-width to match the reference hero/footer
  layouts — both are valid, pick per-section based on how full-bleed it
  should feel.

Every component — UI primitive or section — lives in its own folder named
after it (`ui/Button/`, `sections/Navbar/`), holding `Component.tsx`,
`Component.module.css`, and an `index.ts` barrel (`export { Component } from
"./Component"`). Import the folder, not the file:
`import { Button } from "../../ui/Button"`.

## Static-first component architecture

**Every component in `src/components/` renders to plain HTML/CSS with no
client-side JavaScript.** They're plain functions returning JSX — no
`useState`, no event handlers — and are used in `.astro` files *without*
a `client:*` directive, so Astro renders them once at build time and ships
zero React runtime to the browser. Verify this holds after any change by
building and confirming `dist/index.html` has no `<script>` tag.

Interactivity that would normally need JS is done with CSS-only techniques:

- **Button hover/press** — CSS Modules `:hover`/`:disabled`, not
  `onMouseEnter`/`onMouseLeave` handlers.
- **Input focus ring** — CSS `:focus-visible`, not `onFocus`/`onBlur`.
- **Mobile nav toggle** — a hidden `<input type="checkbox">` + `<label>`
  ("checkbox hack"), toggled purely by the `:checked ~` sibling selector in
  [`Navbar.module.css`](src/components/sections/Navbar/Navbar.module.css). Known
  tradeoff: the panel doesn't auto-close after a link is clicked, since that
  would require script. Acceptable for a marketing page; if it becomes
  annoying, hydrate just `Navbar` with `client:idle` rather than adding JS
  to every component.

If a future component truly needs interactivity JS can't fake (e.g. a
live-validating form, a filterable gallery), hydrate *that one component*
with the narrowest `client:*` directive available — don't make it the
default.

### UI primitives — `src/components/ui/`

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant`: primary / dark / ghost / inverse · `size`: sm / md / lg · `href?` | Polymorphic: renders `<a>` when `href` is passed, `<button>` otherwise — never nest a `<button>` inside an `<a>` (the original static export did this; it's invalid HTML and was fixed here). |
| `Tag` | `tone`: ink / yellow / red / pink / outline | Uppercase, small, wide tracking — category/status labels only. |
| `Input` | `label?` + native `<input>` props | Labeled field, yellow focus ring, 2px ink border. |
| `Textarea` | `label?` + native `<textarea>` props | Shares `Input.module.css` styling for visual consistency. |

### Section components — `src/components/sections/`

One component per landing-page section, each self-contained with its own
`*.module.css`: `Navbar`, `Hero`, `About`, `Quote`, `Values`, `Projects`,
`Contact`, `Footer`. Composed in [`src/pages/index.astro`](src/pages/index.astro).

Content-driven sections (`Navbar`, `Values`, `Projects`, `Contact`,
`Footer`) take their copy as props from
[`src/data/content.ts`](src/data/content.ts) — edit that file to add a
project, change a nav link, or update a contact detail; don't hardcode new
copy inside a section component.

## Responsive behavior

Single breakpoint at **820px**, matching the original `isMobile` logic
(`window.innerWidth < 820`), now expressed as `@media (max-width: 819px)`
in each section's CSS Module — no JS media-query watcher needed.

## Known gaps

- **Contact form has no backend yet.** The form in
  [`Contact.tsx`](src/components/sections/Contact/Contact.tsx) renders but doesn't
  submit anywhere. Per `CLAUDE.md`, wire it to
  `src/pages/api/contacto.ts` (Cloudflare Adapter edge function) using the
  Resend SDK.
- **No icon set.** By design — see the brand section above. If real icons
  are ever wanted, a stroke-based set (Lucide-style) matches the kit's
  character best.
- **Project photography** is linked directly from `https://hauss.cl/img/...`
  rather than self-hosted; move it into `public/` if the site needs to be
  independent of that origin.

## Reference

The original design-system export (component prompts, guideline
specimens, brand rationale, uploaded moodboard references) lives in
[`design-system/`](design-system/readme.md) and is kept as documentation —
the implementation in `src/` is the version actually used by the app.
