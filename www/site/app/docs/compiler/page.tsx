import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compiler Internals",
  description:
    "Deep-dive into the Hüma compiler pipeline: lexer, suffix system, AST, and interpreter.",
};

const lexerExampleCode = `// Source text the user writes:
isim'i yazdır;

// After the Hüma lexer strips the suffix:
// Token stream:  IDENT("isim")  BUILTIN("yazdır")  SEMI`;

const astCode = `// Source:
topla fonksiyon olsun a, b alsın {
    a + b'yi döndür
}

// Simplified AST:
FunctionDecl {
  name: "topla",
  params: ["a", "b"],
  body: [
    ReturnStmt {
      value: BinaryExpr {
        op: "+",
        left:  Ident("a"),
        right: Ident("b")
      }
    }
  ]
}`;

const cargoCode = `# Build the Hüma compiler from source
cargo build --release

# The binary will be at:
./target/release/huma

# Run a file:
./target/release/huma calistir örnek.huma

# Check version:
./target/release/huma --version`;

export default function CompilerPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Ecosystem</span>
          <span>/</span>
          <span className="text-primary">Compiler Internals</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Compiler Internals
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Hüma is implemented as a Rust-powered interpreter. The pipeline
          takes raw Turkish source text through a lexer, parser, AST builder,
          and tree-walking interpreter. Understanding this pipeline helps you
          write faster programs and contribute to the language itself.
        </p>

        {/* Pipeline overview */}
        <section className="mb-16" id="pipeline">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            The Pipeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-px bg-outline-variant/10 rounded-xl overflow-hidden mb-6">
            {[
              { step: "01", name: "Source", icon: "draft", desc: ".huma file UTF-8 text" },
              { step: "02", name: "Lexer", icon: "text_fields", desc: "Tokens + suffix stripping" },
              { step: "03", name: "Parser", icon: "account_tree", desc: "Abstract Syntax Tree" },
              { step: "04", name: "Interpreter", icon: "play_arrow", desc: "Tree-walk evaluation" },
            ].map((p) => (
              <div
                key={p.step}
                className="bg-surface-container-lowest p-6 flex flex-col items-center text-center gap-3"
              >
                <span className="material-symbols-outlined text-primary text-2xl">
                  {p.icon}
                </span>
                <div>
                  <div className="font-mono text-[10px] text-on-surface-variant/50 mb-1">
                    {p.step}
                  </div>
                  <div className="font-bold text-sm text-on-surface">{p.name}</div>
                  <div className="text-xs text-on-surface-variant mt-1">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-on-surface-variant leading-relaxed">
            Each stage is implemented in the{" "}
            <code className="text-tertiary font-mono">src/</code> directory of
            the repository. The lexer and parser are handwritten (no parser
            generator), keeping the dependency tree minimal.
          </p>
        </section>

        {/* Lexer + Suffix System */}
        <section className="mb-16" id="lexer">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            Lexer & Suffix System
          </h2>
          <p className="mb-6 text-on-surface-variant">
            The Hüma lexer reads source text character-by-character and emits
            typed tokens. Its most distinctive feature is the{" "}
            <strong className="text-on-surface">suffix stripper</strong>: when
            the lexer encounters an apostrophe (
            <code className="text-primary font-mono">&apos;</code>), it
            consumes and discards the following Turkish grammatical suffix
            (e.g. <code className="text-primary font-mono">i</code>,{" "}
            <code className="text-primary font-mono">yı</code>,{" "}
            <code className="text-primary font-mono">nı</code>) so the
            identifier it resolves to is the bare root word.
          </p>
          <CodeBlock code={lexerExampleCode} filename="lexer-demo.txt" />

          {/* Token types table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">Token</th>
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">Examples</th>
                  <th className="text-left py-3 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">Notes</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs divide-y divide-outline-variant/10">
                {[
                  ["KEYWORD", "olsun, ise, yoksa, döndür", "Reserved language words"],
                  ["IDENT", "puan, isim, araç", "User-defined names (suffix-stripped)"],
                  ["NUMBER", "42, 3.14", "Integer or float literal"],
                  ["STRING", '"Merhaba"', "Double-quoted UTF-8 string"],
                  ["BUILTIN", "yazdır, ekle, çıkar", "Built-in functions"],
                  ["PUNCT", "{ } ( ) ; ,", "Structure delimiters"],
                  ["COMMENT", "// …", "Single-line, stripped before parse"],
                ].map(([tok, ex, note]) => (
                  <tr key={tok}>
                    <td className="py-3 pr-8 text-primary">{tok}</td>
                    <td className="py-3 pr-8 text-tertiary">{ex}</td>
                    <td className="py-3 text-on-surface-variant font-body">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AST */}
        <section className="mb-16" id="ast">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              03
            </span>
            Abstract Syntax Tree
          </h2>
          <p className="mb-6 text-on-surface-variant">
            The parser walks the token stream and builds an AST of Rust
            enums. Each node type corresponds to a language construct —
            statements, expressions, declarations, and blocks.
          </p>
          <CodeBlock code={astCode} filename="ast-example.txt" />

          <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mt-4">
            <div className="flex items-center gap-3 mb-2 text-tertiary">
              <span className="material-symbols-outlined text-lg">info</span>
              <span className="text-xs font-bold uppercase tracking-widest">Source Reference</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              The full AST node definitions live in{" "}
              <code className="text-primary font-mono">src/ast.rs</code>. The
              recursive descent parser is in{" "}
              <code className="text-primary font-mono">src/parser.rs</code>.
              See the{" "}
              <a
                href="https://github.com/VastSea0/huma-lang/tree/main/src"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:underline"
              >
                src/ directory on GitHub
              </a>{" "}
              for the full implementation.
            </p>
          </div>
        </section>

        {/* Build from source */}
        <section className="mb-16" id="build">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              04
            </span>
            Build from Source
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Hüma requires a stable Rust toolchain. Install it via{" "}
            <a
              href="https://rustup.rs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary hover:underline"
            >
              rustup.rs
            </a>
            , then build:
          </p>
          <CodeBlock code={cargoCode} variant="terminal" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: "memory", label: "Language", value: "Rust (stable)" },
              { icon: "scale", label: "License", value: "MIT" },
              { icon: "link", label: "Repository", value: "VastSea0/huma-lang" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-low rounded-lg border border-outline-variant/10 p-4 flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-semibold">
                    {stat.label}
                  </div>
                  <div className="font-mono text-sm text-on-surface">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/stdlib"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Standard Library
          </Link>
          <a
            href="https://github.com/VastSea0/huma-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            View Source on GitHub
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          On this page
        </h5>
        <ul className="space-y-4 text-xs font-medium">
          {[
            { href: "#pipeline", label: "The Pipeline" },
            { href: "#lexer", label: "Lexer & Suffixes" },
            { href: "#ast", label: "Abstract Syntax Tree" },
            { href: "#build", label: "Build from Source" },
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

        <div className="mt-12 pt-12 border-t border-outline-variant/10">
          <div className="bg-surface-container-high p-4 rounded-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 mb-3">
              Source Code
            </p>
            <div className="flex flex-col gap-3 text-[11px] font-bold">
              <a
                href="https://github.com/VastSea0/huma-lang/tree/main/src"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-sm">folder_open</span>
                src/ on GitHub
              </a>
              <a
                href="https://github.com/VastSea0/huma-lang/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-sm">bug_report</span>
                Report an issue
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
