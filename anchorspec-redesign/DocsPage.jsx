// DocsPage — getting-started page redesigned
function DocsPage() {
  const [activeNav, setActiveNav] = React.useState("getting-started");
  const navItems = [
    { group: "Start here", items: [
      { id: "getting-started", label: "Getting Started" },
      { id: "installation", label: "Installation" },
      { id: "concepts", label: "Concepts" },
    ]},
    { group: "Reference", items: [
      { id: "cli", label: "CLI" },
      { id: "commands", label: "Commands" },
      { id: "workflows", label: "Workflows" },
      { id: "customization", label: "Customization" },
    ]},
    { group: "Guides", items: [
      { id: "multi-lang", label: "Multi-language" },
      { id: "supported-tools", label: "Supported tools" },
      { id: "migration", label: "Migration guide" },
      { id: "ansx", label: "ansx" },
    ]},
  ];

  return (
    <div className="container">
      <div className="docs">
        <aside>
          {navItems.map(g => (
            <div key={g.group} className="group">
              <div className="group-title">{g.group}</div>
              <ul>
                {g.items.map(it => (
                  <li key={it.id}>
                    <a href={"#" + it.id}
                       className={activeNav === it.id ? "active" : ""}
                       onClick={(e) => { e.preventDefault(); setActiveNav(it.id); }}>
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ marginTop: 28, padding: "14px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--bg-1)" }}>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 6, fontFamily: "JetBrains Mono, monospace" }}>edge case?</div>
            <div style={{ fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>File an issue or ask on Discussions.</div>
            <a href="#" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}>
              Open GitHub →
            </a>
          </div>
        </aside>

        <main>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-3)", fontSize: 13, marginBottom: 14 }}>
            <span>Docs</span>
            <span>›</span>
            <span>Start here</span>
            <span>›</span>
            <span style={{ color: "var(--text-2)" }}>Getting Started</span>
          </div>

          <h1>Getting Started</h1>
          <p style={{ fontSize: 16, color: "var(--text-2)", marginTop: 10 }}>
            This guide explains how AnchorSpec works after you've installed and initialized it.
            For installation instructions, see the <a href="#">main README</a>.
          </p>

          <h2>How It Works</h2>
          <p>AnchorSpec helps you and your AI coding assistant agree on what to build before any code is written.</p>

          <h3>Default quick path <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(core profile)</span></h3>
          <div className="flow-row" style={{ marginTop: 10 }}>
            <span className="tk">/ansx:propose</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:apply</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:archive</span>
          </div>

          <h3>Expanded path <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(custom workflow selection)</span></h3>
          <div className="flow-row" style={{ marginTop: 10 }}>
            <span className="tk">/ansx:new</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:ff</span>
            <span style={{ color: "var(--text-3)" }}>or</span>
            <span className="tk">/ansx:continue</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:apply</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:verify</span>
            <span className="arr">→</span>
            <span className="tk">/ansx:archive</span>
          </div>

          <p style={{ marginTop: 18 }}>
            The default global profile is <code>core</code>, which includes{" "}
            <code>propose</code>, <code>explore</code>, and <code>archive</code>.
            You can enable the expanded workflow commands with{" "}
            <code>anchorspec config profile</code> and then <code>anchorspec update</code>.
          </p>

          <h2>What AnchorSpec creates</h2>
          <p>After running <code>anchorspec init</code>, your project has this structure:</p>

          <pre><CodeBlockHeader path="anchorspec/" copyText={INIT_TREE}/>
{INIT_TREE}</pre>

          <h3>Two key directories</h3>
          <ul>
            <li><code>specs/</code> — the source of truth. These specs describe how your system currently behaves. Organized by domain.</li>
            <li><code>changes/</code> — proposed updates. One folder per change, each with a proposal, design notes, tasks, and delta specs.</li>
          </ul>

          <h2>Next steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 14 }}>
            {[
              { t: "Installation", d: "Get the CLI on your machine.", href: "#installation" },
              { t: "Concepts", d: "Specs, changes, and the delta model.", href: "#concepts" },
              { t: "Commands", d: "Full CLI reference.", href: "#commands" },
              { t: "Migration guide", d: "Coming from OpenSpec? Read this.", href: "#migration" },
            ].map(c => (
              <a key={c.t} href={c.href} className="card card-hover" style={{ padding: 16, textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>{c.t}</div>
                  <span style={{ color: "var(--accent-2)" }}>→</span>
                </div>
                <div style={{ color: "var(--text-2)", fontSize: 13.5, marginTop: 4 }}>{c.d}</div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const INIT_TREE = `anchorspec/
├── specs/             # Source of truth
│   └── <domain>/
│       └── spec.md
├── changes/           # Proposed updates
│   └── <change-name>/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/     # Delta specs
│           └── <domain>/
│               └── spec.md
└── config.yaml        # Project configuration (optional)`;

function CodeBlockHeader({ path, copyText }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="copy" style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6, alignItems: "center" }}>
      <button
        className={"copy-btn" + (copied ? " copied" : "")}
        onClick={() => { navigator.clipboard?.writeText(copyText).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false), 1400); }}
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

window.DocsPage = DocsPage;
