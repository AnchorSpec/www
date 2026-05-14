# AnchorSpec — design refresh

Dark-blue redesign of anchorspec.com. Self-contained interactive prototype; nothing here is wired to your Astro build yet — copy the tokens, structure, and recommendations into your existing layout.

## Files

| File | Role |
|---|---|
| `index.html` | Entry. Loads React + Babel + the JSX modules. |
| `styles.css` | All design tokens + component styles. Drop into `src/styles/global.css` (or split per Astro component). |
| `App.jsx` | Shell: nav, page switcher, footer, Tweaks panel wiring. |
| `HomePage.jsx` | Hero, workflow strip, feature grid, quickstart card. |
| `DocsPage.jsx` | Sidebar + content layout for /docs. |
| `AstroRecs.jsx` | Slide-in panel with 16 Astro feature recommendations. |
| `tweaks-panel.jsx` | Prototype-only — drives the in-page tweak controls. Remove before porting. |

## Design tokens (top of `styles.css`)

```css
--bg: #07111f;          /* deep navy base */
--bg-1: #0b1828;        /* surface */
--bg-2: #0e1d31;        /* elevated surface */
--line: rgba(168, 197, 220, 0.10);
--text: #e6eef8;
--text-2: #a6b8cc;
--text-3: #6e8499;
--anchor: #a8c5dc;      /* soft steel-blue, chrome/iconography */
--accent: #5ba3e8;      /* bright CTA blue */
--accent-2: #8ac4ff;
```

Two-tone discipline: anchor-blue for chrome and soft accents; bright accent strictly for primary actions and live indicators.

## Type

- Sans: **Geist** (display + body) — pinned weights 400/500/600/700
- Mono: **JetBrains Mono** 400/500

Loaded via Google Fonts in `index.html`.

## Astro recommendations (in priority order)

Open the "Astro recommendations" pill in the bottom-left of the prototype for the full list. Day-one wins:

1. **Prefetch** — `prefetch: true` in `astro.config.mjs`. Free perf.
2. **View Transitions** — `<ClientRouter />` in your layout. Brand stays put, content cross-fades.
3. **Pagefind** — static search, ~50 KB client, build-time index. Add a ⌘K trigger in docs nav.
4. **Content Collections** — refactor `/docs/v1.3.1/` into a versioned collection with `defineCollection()`.
5. **Expressive Code** — replaces any client-side highlighter; gets copy-button + line markers + tabs for free.

Polish layer:
- `@astrojs/sitemap`, canonical tags, RSS for changelog.
- Astro `<Image />` for the logo, build-time OG card via `satori`.
- Lighthouse CI in your Pages workflow to lock the perf budget.
- `prefers-reduced-motion` guard around the workflow pulse + view transitions.
- Custom 404 + redirects entry for legacy paths.

## Notes

- The ⚓ in the header is the unicode emoji — your call whether to replace with a custom mark later. The previous SVG attempts were removed.
- The "Tweaks" floating panel is prototype scaffolding; strip it when porting.
- The animated workflow strip uses a `setInterval` cycler — wrap in `prefers-reduced-motion: no-preference` for production.
