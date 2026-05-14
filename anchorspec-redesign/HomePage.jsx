// Homepage — redesigned hero, workflow, features, install, footer
const { useState, useEffect, useRef } = React;

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={"copy-btn" + (copied ? " copied" : "")}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? "Copied" : label}
    </button>
  );
}

function HomePage({ accent, density, showWorkflow = true }) {
  const installCmd = "npm install -g anchorspec";
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { ix: "01", cmd: "/ansx:propose", desc: "Draft a change proposal — your AI assistant writes a spec delta, design notes, and a task list before touching code." },
    { ix: "02", cmd: "/ansx:apply",   desc: "Execute the plan against your codebase. Specs stay the source of truth; deltas guide the implementation." },
    { ix: "03", cmd: "/ansx:archive", desc: "Archive the change and roll the canonical specs forward. History is preserved, the workspace stays clean." },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", padding: density === "compact" ? "56px 0 32px" : "84px 0 56px" }}>
        <div className="hero-bg"></div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 96, lineHeight: 1, filter: "drop-shadow(0 8px 32px rgba(91,163,232,0.22))" }} role="img" aria-label="anchor">⚓</span>
          </div>

          <span className="pill" style={{ marginBottom: 26 }}>
            <span className="dot"></span>
            v1.3.1 — tracks upstream OpenSpec releases
          </span>

          <h1 style={{ maxWidth: 820, margin: "20px auto 0" }}>
            Specs your AI assistant{" "}
            <span style={{
              background: "linear-gradient(180deg, #cfe1f3 0%, #5ba3e8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}>
              actually follows.
            </span>
          </h1>

          <p style={{ maxWidth: 620, margin: "22px auto 0", color: "var(--text-2)", fontSize: 17, lineHeight: 1.55 }}>
            AnchorSpec is a clean, telemetry-free fork of OpenSpec. Plan changes against
            durable specs, run them through your AI workflow, and ship — without the phone-home.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="#docs">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a className="btn btn-ghost" href="https://github.com" target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>
              View on GitHub
              <span style={{ marginLeft: 4, padding: "1px 7px", background: "rgba(255,255,255,0.04)", borderRadius: 4, fontSize: 12, color: "var(--text-2)", border: "1px solid var(--line)" }}>★ 412</span>
            </a>
          </div>

          {/* Install command — prominent */}
          <div style={{ maxWidth: 460, margin: "28px auto 0" }}>
            <div className="code">
              <span className="prompt">$</span>
              <span style={{ flex: 1, textAlign: "left" }}>{installCmd}</span>
              <CopyButton text={installCmd}/>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      {showWorkflow && (
      <section style={{ padding: "56px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div className="eyebrow">How it works</div>
            <h2 style={{ marginTop: 8 }}>One workflow. Three commands.</h2>
            <p className="text-muted" style={{ maxWidth: 560, margin: "10px auto 0" }}>
              The core profile gives you everything you need from intent to merged code.
            </p>
          </div>

          <div className="workflow">
            {steps.map((s, i) => (
              <div key={i} className={"step" + (i === activeStep ? " active" : "")}>
                <span className="pulse"></span>
                <div className="ix">{s.ix}</div>
                <div className="cmd">{s.cmd}</div>
                <div className="desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FEATURES */}
      <section style={{ padding: "40px 0 24px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, gap: 16, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">What you get</div>
              <h2 style={{ marginTop: 8 }}>OpenSpec features. Zero tracking.</h2>
            </div>
            <p className="text-muted" style={{ maxWidth: 400, margin: 0 }}>
              Drop-in replacement for the CLI. Same commands, same primitives — analytics removed at the source.
            </p>
          </div>

          <div className="features">
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M3 21L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/></svg>
              </div>
              <h3>Telemetry stripped</h3>
              <p>All analytics, usage reporting, and outbound tracking removed at the source. Audit the diff yourself.</p>
            </div>
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3>Full feature parity</h3>
              <p>Every OpenSpec capability is intact — validation, code generation, diffing, archival.</p>
            </div>
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 8l9-5 9 5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none"/></svg>
              </div>
              <h3>Stays current</h3>
              <p>Tracks upstream OpenSpec releases so you never fall behind on features or fixes.</p>
            </div>
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.6"/><path d="M3.3 7L12 12l8.7-5M12 22V12" stroke="currentColor" strokeWidth="1.6"/></svg>
              </div>
              <h3>Drop-in replacement</h3>
              <p>Same CLI surface. Swap the binary, keep your existing scripts and AI assistant configs.</p>
            </div>
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5L20 8l-4 4 1 5.5L12 15l-5 2.5L8 12 4 8l5.5-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </div>
              <h3>Skills included</h3>
              <p><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--anchor)' }}>ansx</code> is a 1-to-1 replacement for <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--anchor)' }}>opsx</code>.</p>
            </div>
            <div className="card card-hover feature">
              <div className="ficon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-5 7-12V5l-7-3-7 3v5c0 7 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3>Open source, MIT</h3>
              <p>Independently maintained. Inspect every line, fork the fork, run it on your own GitHub Pages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICKSTART STRIP */}
      <section style={{ padding: "48px 0 64px" }}>
        <div className="container-narrow">
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 240px" }}>
                <div className="eyebrow">Try it</div>
                <h2 style={{ marginTop: 8, fontSize: 22 }}>Init a project in 30 seconds.</h2>
                <p className="text-muted" style={{ fontSize: 14 }}>
                  Drops in <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5 }}>anchorspec/</code> with specs, changes, and a minimal config.
                </p>
              </div>
              <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="code"><span className="prompt">$</span><span style={{ flex: 1 }}>npm install -g anchorspec</span><CopyButton text="npm install -g anchorspec"/></div>
                <div className="code"><span className="prompt">$</span><span style={{ flex: 1 }}>anchorspec init</span><CopyButton text="anchorspec init"/></div>
                <div className="code"><span className="prompt">$</span><span style={{ flex: 1 }}>anchorspec --help</span><CopyButton text="anchorspec --help"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.HomePage = HomePage;
