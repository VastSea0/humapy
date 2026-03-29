import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Library",
  description:
    "Complete API reference for Hüma's built-in standard library modules.",
};

interface StdlibFunction {
  name: string;
  signature: string;
  description: string;
}

interface StdlibModule {
  id: string;
  file: string;
  icon: string;
  title: string;
  description: string;
  constants?: { name: string; value: string; description: string }[];
  functions: StdlibFunction[];
  colorAccent: string;
}

const modules: StdlibModule[] = [
  {
    id: "matematik",
    file: "matematik.hb",
    icon: "calculate",
    title: "matematik",
    description: "Mathematical constants and operations.",
    colorAccent: "text-tertiary",
    constants: [
      { name: "PI", value: "3.14159265…", description: "Circle constant π" },
      {
        name: "E",
        value: "2.71828182…",
        description: "Euler's number e",
      },
    ],
    functions: [
      { name: "karesi(n)", signature: "karesi(n: Sayı) → Sayı", description: "Returns n²" },
      { name: "küpü(n)", signature: "küpü(n: Sayı) → Sayı", description: "Returns n³" },
      { name: "mutlak(n)", signature: "mutlak(n: Sayı) → Sayı", description: "Absolute value |n|" },
      { name: "kuvvet(a, b)", signature: "kuvvet(a: Sayı, b: Sayı) → Sayı", description: "Returns aᵇ" },
      { name: "yuvarla(n)", signature: "yuvarla(n: Sayı) → Sayı", description: "Rounds to nearest integer" },
      { name: "faktöriyel(n)", signature: "faktöriyel(n: Sayı) → Sayı", description: "Returns n! (factorial)" },
    ],
  },
  {
    id: "renkler",
    file: "renkler.hb",
    icon: "palette",
    title: "renkler",
    description: "Terminal output coloring utilities.",
    colorAccent: "text-primary",
    constants: [
      { name: "KIRMIZI", value: "\\x1b[31m", description: "Red ANSI color code" },
      { name: "YESIL", value: "\\x1b[32m", description: "Green ANSI color code" },
      { name: "SARI", value: "\\x1b[33m", description: "Yellow ANSI color code" },
      { name: "MAVI", value: "\\x1b[34m", description: "Blue ANSI color code" },
    ],
    functions: [
      {
        name: "renkli_yaz(metin, renk)",
        signature: "renkli_yaz(metin: Yazı, renk: Yazı)",
        description: "Prints text in the specified ANSI color",
      },
      {
        name: "başarı_yaz(m)",
        signature: "başarı_yaz(m: Yazı)",
        description: "Prints text in green (success style)",
      },
      {
        name: "hata_yaz(m)",
        signature: "hata_yaz(m: Yazı)",
        description: "Prints text in red (error style)",
      },
    ],
  },
  {
    id: "zaman",
    file: "zaman.hb",
    icon: "schedule",
    title: "zaman",
    description: "Time measurement and delay utilities.",
    colorAccent: "text-secondary",
    functions: [
      {
        name: "beklet(saniye)",
        signature: "beklet(saniye: Sayı)",
        description: "Pauses execution for given seconds",
      },
      {
        name: "kronometre_başlat()",
        signature: "kronometre_başlat() → Sayı",
        description: "Returns current timestamp (milliseconds)",
      },
      {
        name: "kronometre_bitir(başlangıç)",
        signature: "kronometre_bitir(başlangıç: Sayı) → Sayı",
        description: "Returns elapsed ms since başlangıç",
      },
    ],
  },
  {
    id: "liste",
    file: "liste.hb",
    icon: "filter_list",
    title: "liste",
    description: "Functional list operations: map, filter, reduce.",
    colorAccent: "text-tertiary",
    functions: [
      {
        name: "eşle(liste, f)",
        signature: "eşle(liste: Liste, f: Fonksiyon) → Liste",
        description: "Map — applies f to every element, returns new list",
      },
      {
        name: "filtrele(liste, f)",
        signature: "filtrele(liste: Liste, f: Fonksiyon) → Liste",
        description: "Filter — keeps elements where f returns truthy",
      },
      {
        name: "indirge(liste, f, baş)",
        signature: "indirge(liste: Liste, f: Fonksiyon, baş: Değer) → Değer",
        description: "Reduce — folds list into single value starting from baş",
      },
      {
        name: "ters_cevir(liste)",
        signature: "ters_cevir(liste: Liste) → Liste",
        description: "Returns a reversed copy of the list",
      },
    ],
  },
  {
    id: "dosya",
    file: "dosya.hb",
    icon: "folder_open",
    title: "dosya",
    description: "File system read and existence utilities.",
    colorAccent: "text-primary",
    functions: [
      {
        name: "dosya_var_mı(yol)",
        signature: "dosya_var_mı(yol: Yazı) → Mantıksal",
        description: "Returns true if the file at yol exists",
      },
      {
        name: "güvenli_oku(yol)",
        signature: "güvenli_oku(yol: Yazı) → Yazı | hata",
        description:
          "Reads file at yol; returns contents or raises an error on failure",
      },
    ],
  },
];

export default function StdlibPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Ecosystem</span>
          <span>/</span>
          <span className="text-primary">Standard Library</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Standard Library
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-4">
          Hüma ships with a batteries-included standard library. All modules
          use the <code className="text-tertiary font-mono">.hb</code>{" "}
          extension. Import any module with:
        </p>
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary mb-12">
          @kullan &quot;matematik.hb&quot;
        </div>

        {/* Modules */}
        <div className="space-y-20">
          {modules.map((mod) => (
            <section key={mod.id} id={mod.id} className="scroll-mt-24">
              {/* Module header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-sm">
                  <span
                    className={`material-symbols-outlined ${mod.colorAccent}`}
                  >
                    {mod.icon}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-on-surface font-mono">
                    {mod.file}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Constants */}
              {mod.constants && mod.constants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                    Constants
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mod.constants.map((c) => (
                      <div
                        key={c.name}
                        className="bg-surface-container-low rounded-lg p-4 border border-outline-variant/10"
                      >
                        <div className="font-mono text-sm text-primary mb-1">
                          {c.name}
                        </div>
                        <div className="font-mono text-xs text-tertiary mb-2">
                          = {c.value}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {c.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Functions */}
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                Functions
              </h3>
              <div className="space-y-3">
                {mod.functions.map((fn) => (
                  <div
                    key={fn.name}
                    className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden"
                  >
                    <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/5">
                      <code className="font-mono text-sm text-tertiary">
                        {fn.signature}
                      </code>
                    </div>
                    <div className="px-4 py-3 text-sm text-on-surface-variant">
                      {fn.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/lists-errors"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Lists & Error Handling
          </Link>
          <Link
            href="/docs/compiler"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Compiler Internals
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          Modules
        </h5>
        <ul className="space-y-3 text-xs font-medium">
          {modules.map((mod) => (
            <li key={mod.id}>
              <a
                href={`#${mod.id}`}
                className="flex items-center gap-2 text-on-surface-variant/60 border-l-2 border-transparent pl-4 hover:text-on-surface hover:border-primary transition-all"
              >
                <span className="material-symbols-outlined text-xs">
                  {mod.icon}
                </span>
                <span className="font-mono">{mod.file}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
