import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Install Hüma and write your first program in minutes. Complete getting-started guide.",
};

const installCode = `curl -fsSL https://huma.lang/install.sh | sh`;

const versionCode = `$ huma --version
Hüma Language Compiler v1.0.4-stable (build 4a92c)`;

const firstProgramCode = `// Değişken tanımlayıp koşullu mantık
puan = 85 olsun

puan > 50 ise {
    "Başarılı!"'yı yazdır;
} yoksa {
    "Tekrar dene."'i yazdır;
}`;

export default function DocsPage() {
  return (
    <>
      {/* Main content */}
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Core</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Getting Started
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Welcome to Hüma — a high-performance language designed for precision
          and kinetic speed. This guide will help you set up your environment
          and write your first Hüma program.
        </p>

        {/* 01 Installation */}
        <section className="mb-16" id="installation">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            Installation
          </h2>
          <p className="mb-6 text-on-surface-variant">
            The Hüma toolchain is distributed as a single static binary. Use
            our shell script to automatically detect your architecture and
            install the{" "}
            <code className="bg-surface-container-high px-1.5 py-0.5 rounded text-primary font-mono text-xs">
              huma-cli
            </code>
            .
          </p>
          <CodeBlock code={installCode} variant="terminal" />

          {/* Info callout */}
          <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mb-8">
            <div className="flex items-center gap-3 mb-2 text-tertiary">
              <span className="material-symbols-outlined text-lg">info</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Architecture Support
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Hüma currently supports{" "}
              <strong className="text-on-surface">x86_64</strong> and{" "}
              <strong className="text-on-surface">ARM64</strong> architectures
              natively. For legacy systems, please refer to the
              compilation-from-source documentation.
            </p>
          </div>
        </section>

        {/* 02 Quick Start */}
        <section className="mb-16" id="quick-start">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            Quick Start
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Verify your installation by checking the version. The Hüma compiler
            should respond instantly, reflecting our commitment to
            zero-latency developer tools.
          </p>
          <CodeBlock code={versionCode} variant="terminal" />
        </section>

        {/* 03 First Program */}
        <section className="mb-16" id="first-program">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              03
            </span>
            First Program
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Hüma syntax is designed to be expressive yet rigid. Below is a
            classic conditional block demonstrating our core keywords:{" "}
            <code className="text-tertiary font-mono">olsun</code> (let),{" "}
            <code className="text-tertiary font-mono">ise</code> (if), and{" "}
            <code className="text-tertiary font-mono">yoksa</code> (else).
          </p>
          <CodeBlock code={firstProgramCode} filename="merhaba.huma" />

          {/* Warning callout */}
          <div className="bg-surface-container-low border-l-4 border-primary-container p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-2 text-primary-container">
              <span className="material-symbols-outlined text-lg">warning</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Suffix System
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Hüma uses Turkish grammatical suffixes with an apostrophe (
              <code className="text-tertiary font-mono">&apos;</code>) as a
              separator. The lexer automatically strips suffixes like{" "}
              <code className="text-tertiary font-mono">&apos;yı</code>,{" "}
              <code className="text-tertiary font-mono">&apos;i</code>, and{" "}
              <code className="text-tertiary font-mono">&apos;nı</code> — they
              are grammatical decoration, not code.
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section id="next-steps">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              04
            </span>
            Next Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href: "/docs/syntax",
                icon: "code",
                title: "Basic Syntax",
                desc: "Variables, conditionals, and loops",
              },
              {
                href: "/docs/functions-classes",
                icon: "data_object",
                title: "Functions & Classes",
                desc: "Define reusable logic and objects",
              },
              {
                href: "/docs/lists-errors",
                icon: "list",
                title: "Lists & Errors",
                desc: "Collections and error handling",
              },
              {
                href: "/docs/stdlib",
                icon: "menu_book",
                title: "Standard Library",
                desc: "Built-in modules reference",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex items-start gap-4 p-5 bg-surface-container-low rounded-lg border border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container transition-all group"
              >
                <span className="material-symbols-outlined text-primary mt-0.5">
                  {card.icon}
                </span>
                <div>
                  <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                    {card.title}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    {card.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          On this page
        </h5>
        <ul className="space-y-4 text-xs font-medium">
          {[
            { href: "#installation", label: "Installation" },
            { href: "#quick-start", label: "Quick Start" },
            { href: "#first-program", label: "First Program" },
            { href: "#next-steps", label: "Next Steps" },
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
              Helpful Resources
            </p>
            <div className="flex flex-col gap-3 text-[11px] font-bold">
              <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                <span className="material-symbols-outlined text-sm">chat</span>
                Discord Community
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:underline">
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
