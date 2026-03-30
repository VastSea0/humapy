"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const INSTALL_URL =
  "curl -fsSL https://raw.githubusercontent.com/VastSea0/huma-lang/main/install.sh | sh";
const GITHUB_URL = "https://github.com/VastSea0/huma-lang";

export default function HomePage() {
  const [ctaCopied, setCtaCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_URL);
    setCtaCopied(true);
    setTimeout(() => setCtaCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 overflow-hidden">
        {/* ── Hero ── */}
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7">
            {/* Version badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-tertiary">
                v0.3.0-stable kinetic archive
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-on-surface mb-8">
              Code as You Think.
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                In Your Native Language.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
              Hüma is a high-performance programming language featuring native
              Turkish syntax. Built with a Rust-backed core, it combines the
              expressiveness of natural language with the raw speed of a systems
              compiler.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/docs">
                <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 font-bold rounded-sm shadow-xl active:scale-95 transition-all">
                  Get Started
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-8 py-4 font-bold rounded-sm border border-outline/20 text-on-surface hover:bg-surface-bright transition-all">
                  Read Documentation
                </button>
              </Link>
            </div>
          </div>

          {/* Right: IDE Preview */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full" />
            <div className="glass-card code-glow rounded-lg border border-outline-variant/20 overflow-hidden relative">
              {/* Window chrome */}
              <div className="bg-surface-container-lowest/50 px-4 py-3 flex items-center justify-between border-b border-outline-variant/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant/40 tracking-wider">
                  merhaba.hb
                </span>
                <div className="w-8" />
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-4">
                  <div className="text-on-surface-variant/30 text-right select-none w-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <div key={n}>{n}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div>
                      <span className="text-tertiary">puan</span>
                      <span className="text-on-surface-variant"> = </span>
                      <span className="text-primary">85</span>
                      <span className="text-primary"> olsun</span>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-primary-container">puan</span>
                      <span className="text-on-surface-variant"> &gt; </span>
                      <span className="text-primary">50</span>
                      <span className="text-primary"> ise</span>
                      <span className="text-on-surface-variant"> {"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-secondary">&quot;Başarılı!&quot;</span>
                      <span className="text-on-surface-variant/60">
                        &apos;yı yazdır;
                      </span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">{"}"} </span>
                      <span className="text-primary-container">yoksa</span>
                      <span className="text-on-surface-variant"> {"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-secondary">&quot;Tekrar dene.&quot;</span>
                      <span className="text-on-surface-variant/60">
                        &apos;i yazdır;
                      </span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output terminal */}
              <div className="bg-[#0E0E0E] p-4 border-t border-outline-variant/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-on-surface-variant/50 mb-2">
                  <span className="material-symbols-outlined text-[14px]">
                    terminal
                  </span>
                  <span>ÇIKTI</span>
                </div>
                <div className="text-primary">
                  &gt; huma run merhaba.hb
                  <br />
                  <span className="text-on-surface">Başarılı!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="mt-48 max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-4">
              Industrial Grade Infrastructure.
            </h2>
            <div className="w-12 h-1 bg-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/10 rounded-xl overflow-hidden">
            {[
              {
                icon: "translate",
                title: "Natural Syntax",
                desc: "Write algorithms in your native tongue. Reduce cognitive load and increase maintainability with Turkish semantic structures that translate directly into machine code.",
              },
              {
                icon: "bolt",
                title: "Hybrid Execution",
                desc: "Interpret for rapid prototyping or compile for production. Hüma utilizes a multi-stage JIT and AOT pipeline powered by the LLVM infrastructure.",
              },
              {
                icon: "terminal",
                title: "Standalone Compilation",
                desc: "Zero dependencies. Compile your Hüma projects into standalone binaries for Windows, Linux, and macOS with optimized memory management.",
              },
              {
                icon: "inventory_2",
                title: "Rich Standard Library",
                desc: "A robust set of modules for networking, file I/O, and data processing. Designed to be batteries-included while staying lightweight.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-surface p-12 hover:bg-surface-container-low transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-sm mb-8 group-hover:bg-primary-container/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-48 px-8">
          <div className="max-w-[1440px] mx-auto bg-surface-container-lowest rounded-xl p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] -mr-48 -mt-48" />
            <div className="z-10 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Ready to evolve?
              </h2>
              <p className="text-on-surface-variant text-lg">
                Join thousands of developers bridging the gap between human
                thought and binary execution.
              </p>
            </div>
            <div className="z-10 flex flex-col gap-4 w-full md:w-auto">
              <div className="bg-surface-container-highest p-4 rounded-sm font-mono text-sm border border-outline-variant/10 flex items-center justify-between gap-8">
                <span className="text-on-surface-variant text-xs break-all">
                  {INSTALL_URL}
                </span>
                <button
                  onClick={copyInstall}
                  className="material-symbols-outlined text-on-surface-variant/40 hover:text-primary cursor-pointer transition-colors bg-transparent border-none p-0"
                  aria-label="Copy install command"
                >
                  {ctaCopied ? "check" : "content_copy"}
                </button>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40 text-center md:text-right">
                Available for x64 / ARM64
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#0E0E0E] border-t border-[#5A413A]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 gap-6 max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-body text-xs uppercase tracking-[0.1em] text-on-surface-variant/60">
              © 2026 Hüma Language Foundation. Kinetic Archive Edition.
            </div>
            <div className="flex gap-4 font-mono text-[10px] text-primary/60">
              <span>LICENSE: MIT</span>
              <span>BUILD: STABLE-26.03</span>
            </div>
          </div>
          <div className="flex gap-8 font-body text-xs uppercase tracking-[0.1em]">
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
