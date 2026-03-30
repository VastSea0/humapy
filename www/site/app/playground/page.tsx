"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

const GITHUB_URL = "https://github.com/VastSea0/huma-lang";

const EXAMPLES = [
  {
    id: "hello",
    label: "Welcome to Hüma",
    description: "A basic example of variable assignment and printing in Hüma. The simplest structure that utilizes the natural flow of the Turkish language.",
    code: `// Define variable and print
isim = "World" olsun
"Hello, " + isim'i yazdır;`,
    output: "Hello, World",
  },
  {
    id: "conditions",
    label: "Decision Mechanisms",
    description: "Flow control with ise / yoksa blocks. You can build conditional statements with the 'ise' keyword.",
    code: `grade = 85 olsun

grade > 50 ise {
    "You successfully passed the exam!"'i yazdır;
} yoksa {
    "Unfortunately, you failed."'u yazdır;
}`,
    output: "You successfully passed the exam!",
  },
  {
    id: "loops",
    label: "Iterative Operations",
    description: "The 'olduğu sürece' structure is the direct equivalent of the classic while loop.",
    code: `counter = 1 olsun

counter <= 3 olduğu sürece {
    "Step: " + counter'ı yazdır;
    counter = counter + 1 olsun
}`,
    output: "Step: 1\nStep: 2\nStep: 3",
  },
  {
    id: "functions",
    label: "Function Definition",
    description: "Functions are defined with the 'olsun' and 'alsın' structure, and return values with 'döndür'.",
    code: `add fonksiyon olsun a, b alsın {
    a + b'yi döndür
}

result = add(15, 20)
"Total: " + result'u yazdır;`,
    output: "Total: 35",
  },
  {
    id: "classes",
    label: "Object-Oriented Programming",
    description: "Group your data and behaviors (functions) using classes and object structures.",
    code: `animal sınıf olsun {
    name = "" olsun
    sound = "Meow" olsun

    speak fonksiyon olsun {
        kendisi'nin name + " says: " + kendisi'nin sound'u yazdır
    }
}

kitty = animal() olsun
kitty.name = "Cat" olsun
kitty.speak()`,
    output: "Cat says: Meow",
  },
  {
    id: "lists",
    label: "List Management",
    description: "Add elements, remove them, and check length with Hüma's dynamic list structure.",
    code: `array = [1, 2, 3] olsun
array'e [4]'ü ekle;

"Element count: " + array'in uzunluğu'nu yazdır;
"Full list: " + array'i yazdır;`,
    output: "Element count: 4\nFull list: [1, 2, 3, 4]",
  },
];

function CodeBlock({ code, label }: { code: string; label: string }) {
  const highlight = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\/\/.*|"[^"]*"|\d+|\b(?:olsun|ise|yoksa|olduğu sürece|fonksiyon|sınıf|alsın|döndür|yükle|dene|hata var ise|ve|veya|değil|kendisi|yazdır)\b)/g);
      return (
        <div key={i} className="min-h-[1.5rem] flex gap-4">
          <span className="w-4 shrink-0 text-on-surface-variant/20 select-none text-[10px] text-right pt-0.5">
            {i + 1}
          </span>
          <span className="whitespace-pre">
            {parts.map((part, j) => {
              if (part.startsWith("//")) return <span key={j} className="text-on-surface-variant/40 italic">{part}</span>;
              if (part.startsWith('"')) return <span key={j} className="text-secondary">{part}</span>;
              if (/^\d+$/.test(part)) return <span key={j} className="text-primary">{part}</span>;
              if (/\b(olsun|ise|yoksa|olduğu sürece|fonksiyon|sınıf|alsın|döndür|yükle|dene|hata var ise|ve|veya|değil|kendisi|yazdır)\b/.test(part)) {
                return <span key={j} className="text-primary-container">{part}</span>;
              }
              return <span key={j} className="text-tertiary">{part}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="glass-card code-glow border border-outline-variant/10 rounded-lg overflow-hidden relative">
      <div className="px-4 py-2 border-b border-outline-variant/10 bg-surface-container-lowest/50 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <div className="w-2 h-2 rounded-full bg-green-500/30" />
        </div>
        <span className="text-[10px] font-mono text-on-surface-variant/40 tracking-wider lowercase">{label}.hb</span>
        <div className="w-10" />
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-on-surface">
        {highlight(code)}
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-32">
        {/* Header Section */}
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-tertiary">
              v0.3.1-stable kinetic gallery
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-black leading-[0.9] tracking-tighter text-on-surface mb-8">
            Pure Efficiency.<br />
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Native Semantics.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Discover the Hüma language. Programming is now much more accessible and powerful with its syntax close to daily spoken language.
          </p>
        </div>

        {/* Examples List */}
        <section className="max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="space-y-32">
            {EXAMPLES.map((ex) => (
              <div key={ex.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-6">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant/60">
                      Module: {ex.id}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black tracking-tight text-on-surface mb-6">
                    {ex.label}
                  </h3>
                  <p className="text-lg text-on-surface-variant leading-relaxed font-medium mb-10">
                    {ex.description}
                  </p>
                  
                  <div className="bg-[#0E0E0E] rounded-xl p-6 border border-outline-variant/10 font-mono text-xs relative overflow-hidden group">
                    <div className="flex items-center gap-2 text-on-surface-variant/50 mb-4 pb-4 border-b border-outline-variant/10">
                      <span className="material-symbols-outlined text-[14px]">terminal</span>
                      <span>CONSOLE OUTPUT</span>
                    </div>
                    <pre className="text-primary font-bold text-sm whitespace-pre-wrap leading-relaxed relative z-10 transition-transform group-hover:translate-x-1">
                      {ex.output}
                    </pre>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-8 bg-primary/5 blur-[80px] rounded-full" />
                  <CodeBlock code={ex.code} label={ex.id} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="mt-48 px-8">
          <div className="max-w-[1440px] mx-auto bg-surface-container-lowest rounded-xl p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] -mr-48 -mt-48" />
            <div className="z-10 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-none">
                The Most Natural Way to Code.
              </h2>
              <p className="text-on-surface-variant text-lg">
                To use all the features of Hüma, install the CLI tool on your computer and start developing your own software.
              </p>
            </div>
            <div className="z-10 flex flex-wrap gap-4 w-full md:w-auto">
              <Link href="/docs">
                <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 font-bold rounded-sm shadow-xl active:scale-95 transition-all">
                  Read Documentation
                </button>
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 font-bold rounded-sm border border-outline/20 text-on-surface hover:bg-surface-bright transition-all">
                  View on GitHub
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#0E0E0E] border-t border-[#5A413A]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 gap-6 max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-body text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 text-center md:text-left">
              © 2026 Hüma Language Foundation. Kinetic Archive Edition.
            </div>
            <div className="flex gap-4 font-mono text-[10px] text-primary/60">
              <span>LICENSE: MIT</span>
              <span>BUILD: STABLE-26.03</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-body text-xs uppercase tracking-[0.1em]">
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">GitHub</Link>
            <Link href={`${GITHUB_URL}/discussions`} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Discord</Link>
            <Link href={`${GITHUB_URL}/releases`} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Releases</Link>
            <Link href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Issues</Link>
            <Link href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">License</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
