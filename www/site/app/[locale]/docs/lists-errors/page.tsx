import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lists & Error Handling",
  description:
    "Working with lists and handling runtime errors in Hüma using dene/hata var ise.",
};

const listsCode = `// Liste Oluşturma
sayılar = [1, 2, 3] olsun

// Eleman ekleme
sayılar'a [5]'i ekle;

// Elemana erişim (indeks ile)
sayılar'dan [0]'ı çıkar; // İndekse göre siler

// Listeyi yazdır
sayılar'ı yazdır;`;

const errorCode = `// Hata Yönetimi (dene / hata var ise)
dene {
    sonuç = 10 / 0
} hata var ise {
    "Sıfıra bölünme hatası!"'nı yazdır
}`;

const combinedCode = `// Listeler ve Hata Yönetimi Birlikte
sayılar = [10, 20, 30] olsun

dene {
    // İndeks sınır dışı olabilir
    sayılar'dan [10]'u çıkar;
} hata var ise {
    "İndeks sınır dışında!"'nı yazdır
}

sayılar'a [99]'u ekle;
sayılar'ı yazdır;`;

export default function ListsErrorsPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">The Language</span>
          <span>/</span>
          <span className="text-primary">Lists & Error Handling</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Lists & Error Handling
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Hüma provides built-in list literals and a{" "}
          <code className="text-tertiary font-mono">dene</code> /{" "}
          <code className="text-tertiary font-mono">hata var ise</code> block
          for robust error handling. Lists are mutable and support index-based
          operations via the{" "}
          <code className="text-tertiary font-mono">ekle</code> and{" "}
          <code className="text-tertiary font-mono">çıkar</code> built-ins.
        </p>

        {/* Lists */}
        <section className="mb-16" id="lists">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            Lists
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Lists are created with square brackets{" "}
            <code className="text-tertiary font-mono">[ ]</code>. Elements can
            be added with{" "}
            <code className="text-tertiary font-mono">ekle</code> or removed by
            index with <code className="text-tertiary font-mono">çıkar</code>.
          </p>
          <CodeBlock code={listsCode} filename="listeler.huma" />

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Operation
                  </th>
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Syntax
                  </th>
                  <th className="text-left py-3 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs divide-y divide-outline-variant/10">
                {[
                  ["Create", "liste = [1, 2, 3] olsun", "New list literal"],
                  ["Append", "liste'ye [val]'i ekle;", "Append value"],
                  ["Remove", "liste'den [idx]'i çıkar;", "Remove by index"],
                ].map(([op, syntax, desc]) => (
                  <tr key={op}>
                    <td className="py-3 pr-8 text-tertiary font-body">{op}</td>
                    <td className="py-3 pr-8 text-primary">{syntax}</td>
                    <td className="py-3 text-on-surface-variant font-body">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-16" id="errors">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            Error Handling
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Wrap risky operations in a{" "}
            <code className="text-tertiary font-mono">dene</code>{" "}
            (&ldquo;try&rdquo;) block. If an error occurs, execution jumps to
            the{" "}
            <code className="text-tertiary font-mono">hata var ise</code>{" "}
            (&ldquo;if there is an error&rdquo;) block.
          </p>
          <CodeBlock code={errorCode} filename="hata.huma" />

          <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mt-4">
            <div className="flex items-center gap-3 mb-2 text-tertiary">
              <span className="material-symbols-outlined text-lg">info</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Runtime Errors
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Hüma catches runtime errors including division by zero, index out
              of bounds, and type mismatches. All errors that occur inside a{" "}
              <code className="text-primary font-mono">dene</code> block are
              safely caught without crashing the interpreter.
            </p>
          </div>
        </section>

        {/* Combined */}
        <section className="mb-16" id="combined">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              03
            </span>
            Combined Example
          </h2>
          <CodeBlock code={combinedCode} filename="liste_hata.huma" />
        </section>

        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/functions-classes"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Functions & Classes
          </Link>
          <Link
            href="/docs/stdlib"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Standard Library
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          On this page
        </h5>
        <ul className="space-y-4 text-xs font-medium">
          {[
            { href: "#lists", label: "Lists" },
            { href: "#errors", label: "Error Handling" },
            { href: "#combined", label: "Combined Example" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-on-surface-variant/60 border-l-2 border-transparent pl-4 hover:text-on-surface hover:border-primary transition-all block"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
