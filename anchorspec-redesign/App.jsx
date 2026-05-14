// App shell — nav + page switching + tweaks
const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 220,
  "density": "comfortable",
  "showWorkflow": true,
  "page": "home"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useS(tweaks.page || "home");
  const [astroOpen, setAstroOpen] = useS(false);

  useE(() => { setPage(tweaks.page); }, [tweaks.page]);

  // Apply accent hue live
  useE(() => {
    const root = document.documentElement;
    const hue = tweaks.accentHue ?? 220;
    // Re-derive accent + accent-2 from hue (saturation/lightness fixed for harmony)
    root.style.setProperty('--accent', `oklch(0.70 0.13 ${hue})`);
    root.style.setProperty('--accent-2', `oklch(0.78 0.12 ${hue})`);
    root.style.setProperty('--accent-soft', `oklch(0.70 0.13 ${hue} / 0.16)`);
    root.style.setProperty('--anchor', `oklch(0.82 0.05 ${hue})`);
  }, [tweaks.accentHue]);

  const goto = (p) => { setPage(p); setTweak('page', p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" onClick={(e)=>{e.preventDefault(); goto('home');}} className="brand">
            <span className="mark" style={{ fontSize: 18, lineHeight: 1 }} role="img" aria-label="anchor">⚓</span>
            <span>AnchorSpec</span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginLeft: 28 }}>
            <a href="#" onClick={(e)=>{e.preventDefault(); goto('home');}}
               className={page==='home' ? 'active' : ''}
               style={{ color: page==='home' ? 'var(--text)' : 'var(--text-2)', fontSize: 14, padding: '8px 4px' }}>
              Home
            </a>
            <a href="#" onClick={(e)=>{e.preventDefault(); goto('docs');}}
               className={page==='docs' ? 'active' : ''}
               style={{ color: page==='docs' ? 'var(--text)' : 'var(--text-2)', fontSize: 14, padding: '8px 4px' }}>
              Docs
            </a>
            <a href="#" style={{ color: 'var(--text-2)', fontSize: 14, padding: '8px 4px' }}>Changelog</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-2)', fontSize: 14, padding: '8px 4px' }}>GitHub</a>
          </div>

          <div className="links" style={{ marginLeft: 'auto', gap: 10 }}>
            {page === 'docs' && (
              <div className="search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                <span>Search docs…</span>
                <kbd>⌘K</kbd>
              </div>
            )}
            <div className="version-picker">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              latest (v1.3.1)
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{marginLeft:2}}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </nav>

      {page === 'home' ? <HomePage density={tweaks.density} showWorkflow={tweaks.showWorkflow}/> : <DocsPage/>}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-2)" }}>
              <span style={{ fontSize: 14, lineHeight: 1 }} role="img" aria-label="anchor">⚓</span>
              <span>AnchorSpec is an independent fork, not affiliated with the OpenSpec project.</span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              <a href="#">GitHub</a>
              <a href="#">NPM</a>
              <a href="#">License (MIT)</a>
              <a href="#" onClick={(e)=>{e.preventDefault();setAstroOpen(true);}}>Built with Astro</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Astro recs trigger */}
      <button className="astro-recs-trigger" onClick={() => setAstroOpen(true)} title="Astro features worth enabling">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 1.5c2.5 3.6 5.4 9.4 5.4 13.6 0 3.6-2.4 6.4-5.4 6.4s-5.4-2.8-5.4-6.4C6.6 10.9 9.5 5.1 12 1.5z" fill="#ff5d01"/></svg>
        <span>Astro recommendations</span>
        <span style={{ marginLeft: 4, padding: '1px 7px', background: 'rgba(91,163,232,0.12)', color: 'var(--accent-2)', borderRadius: 4, fontSize: 11, border: '1px solid rgba(91,163,232,0.22)' }}>{ASTRO_RECS.length}</span>
      </button>

      <AstroRecsPanel open={astroOpen} onClose={()=>setAstroOpen(false)}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand & color"/>
        <TweakSlider label="Accent hue" value={tweaks.accentHue} min={190} max={260} step={1}
                     onChange={(v)=>setTweak('accentHue', v)}/>

        <TweakSection label="Layout"/>
        <TweakRadio label="Density" value={tweaks.density} options={[
          { value: 'comfortable', label: 'Roomy' },
          { value: 'compact', label: 'Tight' },
        ]} onChange={(v)=>setTweak('density', v)}/>
        <TweakToggle label="Workflow strip" value={tweaks.showWorkflow}
                     onChange={(v)=>setTweak('showWorkflow', v)}/>

        <TweakSection label="Preview"/>
        <TweakRadio label="Page" value={tweaks.page} options={[
          { value: 'home', label: 'Home' },
          { value: 'docs', label: 'Docs' },
        ]} onChange={(v)=>setTweak('page', v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
