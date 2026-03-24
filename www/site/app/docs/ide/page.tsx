import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IDE Usage & Setup",
  description: "Learn how to build and operate the official Hüma IDE.",
};

export default function IDEDocsPage() {
  return (
    <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
      <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-on-surface-variant">Ecosystem</span>
        <span>/</span>
        <span className="text-primary">Hüma IDE</span>
      </nav>

      <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
        Hüma IDE
      </h1>
      <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
        To provide a first-class developer experience, Hüma provides its own lightweight Desktop Editor. 
        It replaces the legacy Express server architecture with a modern, high-performance web-stack 
        (React/Vite) wrapped securely in Rust via Tauri.
      </p>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
            01
          </span>
          Architecture
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10 flex-1">
            <h4 className="text-tertiary font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">web</span>
              Frontend (Vite + React)
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Resides in the <code className="font-mono text-primary text-xs">ide/</code> directory. Implements 
              the <b>Monaco Editor</b> for code input, file explorers, and a functional <b>Xterm.js</b> interface 
              to communicate with the core CLI.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10 flex-1">
            <h4 className="text-secondary font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">memory</span>
              Backend (Tauri + Rust)
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Resides in the <code className="font-mono text-primary text-xs">src-tauri/</code> directory. 
              Manages the native OS windows, provides safe direct filesystem access APIs to React, 
              and embeds system PTY.
            </p>
          </div>
        </div>
      </section>

      {/* Building from Source */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
            02
          </span>
          Building from Source
        </h2>
        <p className="mb-4 text-on-surface-variant">
          If you want to contribute to the IDE or compile it yourself, you will need Node.js and Rust installed.
        </p>

        <CodeBlock 
          code={`# 1. Enter the ide folder and install Vite/React dependencies
cd ide
npm install

# 2. Run the Tauri dev server (this auto-starts Vite on port 3737)
npm run tauri dev

# 3. Build a standalone desktop release
npm run tauri build`} 
          variant="terminal" 
        />
        <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mt-6">
          <div className="flex items-center gap-3 mb-2 text-tertiary">
            <span className="material-symbols-outlined text-lg">electric_bolt</span>
            <span className="text-xs font-bold uppercase tracking-widest">Requirements</span>
          </div>
          <p className="text-sm text-on-surface-variant">
             Tauri requires a few OS-specific libraries (like \`webkit2gtk-4.0\` on Linux). 
             Refer to the <a href="https://tauri.app/v1/guides/getting-started/prerequisites" target="_blank" className="text-primary hover:underline">Tauri Prerequisites Guide</a>.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
        <Link
          href="/docs/compiler"
          className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Compiler Internals
        </Link>
      </div>
    </main>
  );
}
