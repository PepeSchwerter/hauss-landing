# HAUSS Design System

HAUSS is a house-construction company. This system supports one product surface: a **simple marketing landing site** — sharp, modern, light-mode only.

## Sources
No codebase or Figma file was attached. The brand was built from a written brief plus three reference screenshots of construction-company websites the user liked (uploaded to `uploads/` — Wiyasa Corp, Snazzybud, and a "CONS" agency template). Those references guided layout patterns (bold slab headlines, block-color hero sections, stat rows, project-grid galleries, dark footers) but no copy, logo, or code was reused from them. **No logo file was supplied** — see Iconography below.

## Content fundamentals
- Voice: direct, confident, short sentences. Construction-industry plainness, not sales fluff.
- Person: speaks as "we", addresses the reader as "you" ("We build your home").
- Casing: sentence case for headlines and body; uppercase only for eyebrows/tags/nav (small size, wide tracking).
- Numbers do the talking: proof points as bare stats ("18 years", "240+ projects") rather than adjectives.
- No emoji anywhere. No exclamation points. No decorative unicode icons.

## Visual foundations
- **Color**: primary ink `#0c1821` (near-black navy) carries all text and dark sections. Accents are used sparingly and with a job each — yellow `#fde74c` for CTAs only, red `#cc3434` for tags/alerts, pink `#f4cbc6` for soft section backgrounds. Light mode only; no dark theme.
- **Type**: one family, Plus Jakarta Sans, at two weights — ExtraBold (800) for display/headings, Regular/Medium for body. Tight letter-spacing on display sizes, generous line-height on body.
- **Backgrounds**: mostly flat white or warm off-white (`--surface-alt`); full-bleed photography in hero and project-gallery sections; no gradients, no patterns, no illustrations.
- **Shape**: sharp, near-square corners (2–4px radius) everywhere, including buttons — deliberately NOT pill-shaped, to read as structural/industrial rather than soft-SaaS.
- **Borders & shadows**: flat design — 1–2px hairline ink borders do the work shadows would elsewhere; only a very light shadow (`--shadow-card`) for tooltip-like pop content. No inner shadows, no blur, no glassmorphism.
- **Motion**: minimal. Fast (120–200ms) ease-standard transitions for hover/focus only — no bounce, no page-load animation.
- **Hover states**: buttons swap fill (primary → darker yellow, ghost → filled ink); links turn red.
- **Press states**: not distinct from hover in this kit (no scale/shrink effects — keeps the sharp, static character).
- **Photography**: warm, on-site construction photography (workers, cranes, framing) — no stock-generic office photography, no black-and-white treatment.
- **Layout**: centered container, max 1200px; generous whitespace between sections; stat rows and project grids are the two signature repeating patterns from the references.

## Iconography
No icon set, icon font, or SVG sprite was supplied. The kit avoids icons almost entirely — arrows are drawn with plain type characters (`→`) rather than icon glyphs. Where the reference sites used arrow-in-circle "see more" buttons, this kit uses plain bordered buttons with a text arrow instead. If real icons are wanted later, a stroke-based set (Lucide-style) would match the sharp, unfussy character best — currently not linked to keep the kit dependency-free.

## Fonts — substitution flag
The chosen display/body font is **General Sans** (Fontshare), picked to match the bold grotesk headlines in the reference sites — but no font binaries were available to self-host. **Substituted with Plus Jakarta Sans from Google Fonts** (loaded via `tokens/fonts.css`), a close geometric-grotesk match. If you have the actual General Sans (or another preferred) font files, upload them and this can be swapped to a self-hosted `@font-face`.

## Components
- `components/buttons/Button.jsx` — primary CTA button (primary/dark/ghost/inverse × sm/md/lg)
- `components/data-display/Tag.jsx` — small uppercase label (category/status/alert)
- `components/data-display/Card.jsx` — project/service card (image, tag, title, description)
- `components/data-display/StatBlock.jsx` — big number + label for proof-point rows
- `components/forms/Input.jsx` — labeled text input, yellow focus ring
- `components/navigation/Navbar.jsx` — site header (wordmark, links, CTA slot)
- `components/navigation/Accordion.jsx` — single-open expandable list (services/FAQ)

### Intentional additions
No source defined a component inventory (brand-guidelines-only run), so this is a from-scratch standard set sized to a single-page landing site — not a full app component library. Kept deliberately small: no Select/Checkbox/Dialog/Toast/Tabs, since the target site doesn't need them.

## UI kit
- `ui_kits/landing/` — HAUSS marketing landing page: header, hero, services (accordion), stats, project gallery, testimonial, CTA, footer.

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/` — colors, typography, spacing, fonts, base resets
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, wordmark)
- `components/` — reusable primitives (see above)
- `ui_kits/landing/` — full landing-page recreation
- `thumbnail.html` — project tile
- `SKILL.md` — portable skill file for Claude Code
