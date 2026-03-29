import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Syntax & Variables",
  description:
    "Learn Hüma variable declarations, conditionals, loops, and the Turkish suffix system.",
};

const variablesCode = `// Değişken Tanımlama (Variable Declaration)
isim = "Hüma" olsun
sayı = 10 olsun

// Değişkeni yazdırmak için
// 'i suffix is ignored by the compiler
isim'i yazdır;
sayı'yı yazdır;`;

const conditionCode = `// Koşul Blokları (Conditionals)
puan = 85 olsun

puan > 50 ise {
    "Başarılı!"'yı yazdır;
} yoksa {
    "Başarısız!"'ı yazdır;
}`;

const loopCode = `// Döngüler (olduğu sürece — while)
sayaç = 0 olsun

sayaç < 5 olduğu sürece {
    "Sıra: " + sayaç'ı yazdır;
    sayaç = sayaç + 1 olsun
}`;

const fullExampleCode = `// Tam örnek: değişkenler + koşullar + döngüler
isim = "Hüma" olsun
sayı = 10 olsun
isim'i yazdır;

puan = 85 olsun
puan > 50 ise {
    "Başarılı!"'yı yazdır;
} yoksa {
    "Başarısız!"'ı yazdır;
}

sayaç = 0 olsun
sayaç < 5 olduğu sürece {
    "Sıra: " + sayaç'ı yazdır;
    sayaç = sayaç + 1 olsun
}`;

export default function SyntaxPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">The Language</span>
          <span>/</span>
          <span className="text-primary">Basic Syntax</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Basic Syntax & Variables
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Hüma uses a natural Turkish syntax. Variables are declared with{" "}
          <code className="text-tertiary font-mono">olsun</code>, conditions
          with <code className="text-tertiary font-mono">ise</code> /{" "}
          <code className="text-tertiary font-mono">yoksa</code>, and loops
          with{" "}
          <code className="text-tertiary font-mono">olduğu sürece</code>. The
          lexer handles Turkish grammatical suffixes automatically via
          apostrophes.
        </p>

        {/* Suffix System callout */}
        <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mb-12">
          <div className="flex items-center gap-3 mb-2 text-tertiary">
            <span className="material-symbols-outlined text-lg">info</span>
            <span className="text-xs font-bold uppercase tracking-widest">
              The Suffix System
            </span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Turkish is an agglutinative language. Hüma lets you write
            grammatically natural code like{" "}
            <code className="text-primary font-mono">isim&apos;i yazdır</code>{" "}
            — the suffix{" "}
            <code className="text-primary font-mono">&apos;i</code> is stripped
            by the lexer. This means the compiler sees just{" "}
            <code className="text-tertiary font-mono">isim</code>. It&apos;s
            pure Turkish ergonomics with zero runtime cost.
          </p>
        </div>

        {/* Variables */}
        <section className="mb-16" id="variables">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            Variables
          </h2>
          <p className="mb-6 text-on-surface-variant">
            All variable declarations end with the keyword{" "}
            <code className="text-tertiary font-mono">olsun</code> (meaning
            &ldquo;let it be&rdquo;). Hüma is dynamically typed — the type is
            inferred from the value.
          </p>
          <CodeBlock code={variablesCode} filename="değişkenler.huma" />

          {/* Keyword table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Hüma
                  </th>
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Equivalent
                  </th>
                  <th className="text-left py-3 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs divide-y divide-outline-variant/10">
                {[
                  ["olsun", "let / var", "Declare or update a variable"],
                  ["yazdır", "print()", "Output a value to stdout"],
                  ["döndür", "return", "Return from a function"],
                ].map(([huma, eq, desc]) => (
                  <tr key={huma} className="group">
                    <td className="py-3 pr-8 text-primary">{huma}</td>
                    <td className="py-3 pr-8 text-tertiary">{eq}</td>
                    <td className="py-3 text-on-surface-variant font-body">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Conditionals */}
        <section className="mb-16" id="conditionals">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            Conditionals
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Use <code className="text-tertiary font-mono">ise</code> for{" "}
            <em>if</em> and{" "}
            <code className="text-tertiary font-mono">yoksa</code> for{" "}
            <em>else</em>. Conditions evaluate any truthy expression.
          </p>
          <CodeBlock code={conditionCode} filename="koşul.huma" />
        </section>

        {/* Loops */}
        <section className="mb-16" id="loops">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              03
            </span>
            Loops
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Hüma uses{" "}
            <code className="text-tertiary font-mono">olduğu sürece</code>{" "}
            (meaning &ldquo;as long as&rdquo;) for while-style loops. The body
            executes as long as the condition is truthy.
          </p>
          <CodeBlock code={loopCode} filename="döngü.huma" />

          {/* Warning callout */}
          <div className="bg-surface-container-low border-l-4 border-primary-container p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-2 text-primary-container">
              <span className="material-symbols-outlined text-lg">warning</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Infinite Loop Guard
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Always ensure the loop variable is mutated inside the body.
              Hüma&apos;s runtime will detect static infinite loops during
              compilation in strict mode (
              <code className="text-tertiary font-mono">--katı</code>).
            </p>
          </div>
        </section>

        {/* Full example */}
        <section className="mb-16" id="full-example">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              04
            </span>
            Putting It Together
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Here is a complete example combining variables, conditionals, and a
            loop in a single Hüma source file.
          </p>
          <CodeBlock code={fullExampleCode} filename="örnek.huma" />
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Getting Started
          </Link>
          <Link
            href="/docs/functions-classes"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Functions & Classes
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          On this page
        </h5>
        <ul className="space-y-4 text-xs font-medium">
          {[
            { href: "#variables", label: "Variables" },
            { href: "#conditionals", label: "Conditionals" },
            { href: "#loops", label: "Loops" },
            { href: "#full-example", label: "Full Example" },
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
