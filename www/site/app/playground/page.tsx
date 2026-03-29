"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

const EXAMPLES: { label: string; code: string }[] = [
  {
    label: "Merhaba Dünya",
    code: `// Merhaba Dünya — Hello World
isim = "Dünya" olsun
"Merhaba, " + isim'i yazdır;`,
  },
  {
    label: "Koşullar",
    code: `// Koşullu mantık — Conditionals
puan = 85 olsun

puan > 50 ise {
    "Başarılı!"'yı yazdır;
} yoksa {
    "Başarısız!"'ı yazdır;
}`,
  },
  {
    label: "Döngü",
    code: `// While döngüsü — Loop
sayaç = 0 olsun

sayaç < 5 olduğu sürece {
    "Sıra: " + sayaç'ı yazdır;
    sayaç = sayaç + 1 olsun
}`,
  },
  {
    label: "Fonksiyon",
    code: `// Fonksiyon tanımlama — Function
topla fonksiyon olsun a, b alsın {
    a + b'yi döndür
}

sonuç = topla(10, 32)
"Toplam: " + sonuç'u yazdır;`,
  },
  {
    label: "Sınıf",
    code: `// Sınıf ve nesne — Class
araç sınıf olsun {
    hız = 0 olsun

    hızlan fonksiyon olsun miktar alsın {
        kendisi'nin hız = kendisi'nin hız + miktar olsun
    }
}

araba = araç() olsun
araba.hızlan(60)
"Hız: " + araba.hız'ı yazdır;`,
  },
  {
    label: "Hata Yönetimi",
    code: `// Hata yönetimi — Error handling
dene {
    sonuç = 10 / 0
} hata var ise {
    "Sıfıra bölünme hatası!"'nı yazdır
}`,
  },
];

// Simulated interpreter — maps known snippets to outputs
function simulate(code: string): string {
  const lines = code.trim().split("\n").filter((l) => !l.trim().startsWith("//") && l.trim() !== "");
  const output: string[] = [];

  // Very simple pattern matching for demo output
  if (code.includes("Merhaba") && code.includes("Dünya")) {
    output.push("Merhaba, Dünya");
  }
  if (code.includes("puan") && code.includes("Başarılı")) {
    output.push("Başarılı!");
  }
  if (code.includes("sayaç < 5")) {
    for (let i = 0; i < 5; i++) output.push(`Sıra: ${i}`);
  }
  if (code.includes("topla") && code.includes("10, 32")) {
    output.push("Toplam: 42");
  }
  if (code.includes("hızlan") && code.includes("60")) {
    output.push("Hız: 60");
  }
  if (code.includes("10 / 0")) {
    output.push("Sıfıra bölünme hatası!");
  }

  if (output.length === 0) {
    // Generic: extract anything after yazdır
    lines.forEach((line) => {
      const m = line.match(/"([^"]+)"'?\w*\s+yazdır/);
      if (m) output.push(m[1]);
    });
  }

  return output.length > 0
    ? output.join("\n")
    : "// Program çalıştı — no visible output.";
}

export default function PlaygroundPage() {
  const [selected, setSelected] = useState(0);
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const selectExample = (i: number) => {
    setSelected(i);
    setCode(EXAMPLES[i].code);
    setOutput(null);
  };

  const run = () => {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(simulate(code));
      setRunning(false);
    }, 600);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-surface">
        {/* Header */}
        <div className="border-b border-outline-variant/10 bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                <span className="font-mono text-xs text-on-surface-variant/60 uppercase tracking-widest">
                  Hüma Playground — v1.0.4
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/docs"
                className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">menu_book</span>
                Docs
              </Link>
              <a
                href="https://github.com/VastSea0/huma-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row h-[calc(100vh-8rem)]">
          {/* Left: examples sidebar */}
          <aside className="lg:w-52 shrink-0 border-r border-outline-variant/10 bg-surface-container-lowest py-4 px-3 overflow-y-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 px-2 mb-3">
              Examples
            </p>
            <ul className="space-y-1">
              {EXAMPLES.map((ex, i) => (
                <li key={ex.label}>
                  <button
                    onClick={() => selectExample(i)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-all hover:translate-x-0.5 ${
                      selected === i
                        ? "bg-surface-container-high text-primary"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    {ex.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 px-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-3">
                Note
              </p>
              <p className="text-xs text-on-surface-variant/60 leading-relaxed">
                This is a browser simulation. For full execution, install the Hüma CLI.
              </p>
              <a
                href="https://raw.githubusercontent.com/VastSea0/huma-lang/main/install.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Install Hüma
              </a>
            </div>
          </aside>

          {/* Center: editor */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-outline-variant/10">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-outline-variant/10 bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant/40 tracking-wider">
                  {EXAMPLES[selected].label.toLowerCase().replace(/\s+/g, "_")}.huma
                </span>
              </div>
              <button
                onClick={run}
                disabled={running}
                id="run-button"
                className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-sm text-xs font-bold active:scale-95 transition-all hover:bg-primary-fixed disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-sm">
                  {running ? "hourglass_empty" : "play_arrow"}
                </span>
                {running ? "Çalışıyor…" : "Çalıştır"}
              </button>
            </div>

            {/* Code textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full bg-surface-container-lowest text-on-surface font-mono text-sm leading-relaxed p-6 resize-none focus:outline-none focus:ring-0 border-none"
              style={{ caretColor: "#ffb4a2" }}
              aria-label="Hüma code editor"
            />
          </div>

          {/* Right: output */}
          <div className="lg:w-80 shrink-0 flex flex-col bg-[#0e0e0e]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-outline-variant/10">
              <div className="flex items-center gap-2 text-on-surface-variant/50">
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">ÇIKTI</span>
              </div>
              {output !== null && (
                <button
                  onClick={() => setOutput(null)}
                  className="text-on-surface-variant/30 hover:text-primary transition-colors"
                  aria-label="Clear output"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
              {output === null && !running && (
                <p className="text-on-surface-variant/30 text-xs leading-relaxed">
                  &gt; Press <span className="text-primary">Çalıştır</span> to run your program…
                </p>
              )}

              {running && (
                <div className="flex items-center gap-2 text-tertiary text-xs">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  Yorumlayıcı çalışıyor…
                </div>
              )}

              {output !== null && !running && (
                <div>
                  <div className="text-on-surface-variant/40 text-xs mb-3">
                    &gt; huma calistir {EXAMPLES[selected].label.toLowerCase().replace(/\s+/g, "_")}.huma
                  </div>
                  <pre className="text-primary whitespace-pre-wrap leading-relaxed">
                    {output}
                  </pre>
                  <div className="text-on-surface-variant/30 text-xs mt-4 pt-4 border-t border-outline-variant/10">
                    Process exited with code 0
                  </div>
                </div>
              )}
            </div>

            {/* Bottom hint */}
            <div className="px-4 py-3 border-t border-outline-variant/10 text-[10px] text-on-surface-variant/30 font-mono">
              Ctrl+Enter · Run &nbsp;&nbsp;|&nbsp;&nbsp; Browser simulation
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
