// AstroRecs — slide-in panel listing Astro features worth adopting

const ASTRO_RECS = [
  { tag: "performance", title: "Enable prefetch on all internal links", impact: "high",
    body: <>Add <code>prefetch: true</code> in <code>astro.config.mjs</code> so docs pages load instantly on hover/touch. Free perf win on a static site.</> },
  { tag: "ux", title: "View Transitions for cross-page persistence", impact: "high",
    body: <>Drop <code>&lt;ClientRouter /&gt;</code> in your layout. The brand mark + nav stay put while content cross-fades — feels native, costs almost nothing.</> },
  { tag: "search", title: "Pagefind static search", impact: "high",
    body: <>Pure static, no server. Build-time index, ~50 KB client. Add a <code>⌘K</code> trigger in the docs nav.</> },
  { tag: "content", title: "Content Collections for versioned docs", impact: "high",
    body: <>You already version docs under <code>/docs/v1.3.1/</code>. Schemas + type safety + automatic routing via <code>defineCollection()</code>.</> },
  { tag: "code", title: "Shiki with the right theme", impact: "med",
    body: <>Astro ships Shiki — switch from any client-side highlighter. Pair <code>github-dark-dimmed</code> with your palette for harmony, or use Expressive Code for copy-button + line-highlight built in.</> },
  { tag: "code", title: "Expressive Code for code blocks", impact: "med",
    body: <>Adds tabs, line markers, terminal frame, and a built-in copy button. Zero JS by default; matches the docs aesthetic in this mock.</> },
  { tag: "seo", title: "@astrojs/sitemap + canonical tags", impact: "med",
    body: <>Generate <code>sitemap-index.xml</code> at build time and emit canonical URLs from layout. Helps the right docs version surface in search.</> },
  { tag: "perf", title: "Astro Image + optimized OG card", impact: "med",
    body: <>Use the built-in <code>&lt;Image /&gt;</code> for the logo (auto AVIF/WebP, dimensions baked in). Generate a static OG image with <code>satori</code> at build time.</> },
  { tag: "a11y", title: "Reduced-motion guard", impact: "med",
    body: <>Wrap workflow pulse + view transitions in <code>@media (prefers-reduced-motion: no-preference)</code> — keeps the site calm for users who opt out.</> },
  { tag: "ci", title: "Lighthouse CI in GitHub Actions", impact: "med",
    body: <>Run <code>treosh/lighthouse-ci-action</code> on PRs. Lock the perf budget so a fast site stays fast.</> },
  { tag: "ux", title: "<kbd>⌘K</kbd> command palette (Astro Island)", impact: "low",
    body: <>Single React/Preact island. Jump-to-section + run sample commands. Hydrate on idle with <code>client:idle</code>.</> },
  { tag: "ux", title: "Inline version selector", impact: "low",
    body: <>You have <code>/v1.3.1/</code> — surface it in the nav so users don't get lost on older releases.</> },
  { tag: "rss", title: "@astrojs/rss for the changelog", impact: "low",
    body: <>If you publish release notes, free RSS so users can subscribe without GitHub.</> },
  { tag: "build", title: "Compress assets with astro-compress", impact: "low",
    body: <>Minify HTML/CSS/JS/SVG output. On a small site the wins are modest, but the SVG logo benefits.</> },
  { tag: "deploy", title: "404 page + redirect handling", impact: "low",
    body: <>Custom <code>404.astro</code>, plus <code>redirects:</code> entry in config for old paths. Pages won't follow GitHub's default 404 behavior unless asked.</> },
  { tag: "brand", title: "Theme color + favicon set", impact: "low",
    body: <>Add <code>&lt;meta name="theme-color" content="#07111f"&gt;</code>, full favicon set (SVG + ICO + apple-touch), and a manifest. Tiny, high-polish.</> },
];

function AstroRecsPanel({ open, onClose }) {
  React.useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 65, backdropFilter: "blur(2px)" }}/>}
      <div className={"astro-recs-panel" + (open ? " open" : "")}>
        <header>
          {/* Astro flame */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 1.5c2.5 3.6 5.4 9.4 5.4 13.6 0 3.6-2.4 6.4-5.4 6.4s-5.4-2.8-5.4-6.4C6.6 10.9 9.5 5.1 12 1.5z" fill="#ff5d01"/>
            <path d="M12 17c-1.5 0-2.4-.7-2.4-1.9 0-1.6 1.5-2.4 2.4-3.1.9.7 2.4 1.5 2.4 3.1 0 1.2-.9 1.9-2.4 1.9z" fill="#fff"/>
          </svg>
          <h3>Astro features worth enabling</h3>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: "1px solid var(--line)", color: "var(--text-2)", padding: "5px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Close (Esc)</button>
        </header>
        <div className="scroll">
          <p style={{ color: "var(--text-2)", fontSize: 13.5, marginTop: 0 }}>
            Ranked by impact for a small, fast, GitHub-Pages-hosted docs site. Everything here is build-time or progressive — no perf regression.
          </p>
          {ASTRO_RECS.map((r, i) => (
            <div key={i} className="rec">
              <div className="rec-head">
                <span className="rec-tag">{r.tag}</span>
                <h4>{r.title}</h4>
              </div>
              <p>{r.body}</p>
              <span className={"impact " + r.impact}>{r.impact === "high" ? "● high impact" : r.impact === "med" ? "◐ medium impact" : "○ polish"}</span>
            </div>
          ))}

          <div style={{ marginTop: 26, padding: 16, border: "1px dashed var(--line-strong)", borderRadius: 10, background: "var(--bg-2)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Suggested install order</div>
            <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-2)", fontSize: 13, lineHeight: 1.7 }}>
              <li>Prefetch + View Transitions + sitemap (day one)</li>
              <li>Content Collections refactor (versions = collections)</li>
              <li>Expressive Code (replaces any custom highlighter)</li>
              <li>Pagefind + ⌘K island</li>
              <li>Lighthouse CI in your Pages workflow</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

window.AstroRecsPanel = AstroRecsPanel;
window.ASTRO_RECS = ASTRO_RECS;
