import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Hüma community. Contribute on GitHub, report bugs, and connect with other developers.",
};

const GITHUB = "https://github.com/VastSea0/huma-lang";

const channels = [
  {
    icon: "code",
    title: "GitHub Repository",
    description:
      "Browse the source code, open issues, and contribute pull requests. All development happens in the open.",
    href: GITHUB,
    label: "View on GitHub",
    accent: "text-tertiary",
    border: "border-tertiary/20",
    bg: "bg-tertiary/5",
  },
  {
    icon: "bug_report",
    title: "Bug Reports",
    description:
      "Found a bug in the interpreter or compiler? Open a detailed issue on GitHub with a reproducible example.",
    href: `${GITHUB}/issues/new?template=bug_report.md`,
    label: "Report a Bug",
    accent: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
  },
  {
    icon: "lightbulb",
    title: "Feature Requests",
    description:
      "Have an idea for a new keyword, stdlib module, or toolchain feature? Open a discussion and let's build it together.",
    href: `${GITHUB}/discussions`,
    label: "Start a Discussion",
    accent: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/5",
  },
  {
    icon: "history_edu",
    title: "Changelog",
    description:
      "See every version update, breaking change, and new feature since the initial release of Hüma.",
    href: `${GITHUB}/blob/main/CHANGELOG.md`,
    label: "View Changelog",
    accent: "text-tertiary",
    border: "border-tertiary/20",
    bg: "bg-tertiary/5",
  },
];

const contributing = [
  {
    step: "01",
    title: "Fork & Clone",
    code: `git clone https://github.com/VastSea0/huma-lang\ncd huma-lang`,
  },
  {
    step: "02",
    title: "Build from Source",
    code: `cargo build --release\n./target/release/huma --version`,
  },
  {
    step: "03",
    title: "Run Tests",
    code: `cargo test\n# or run a specific .huma file:\n./target/release/huma calistir tests/basic.huma`,
  },
  {
    step: "04",
    title: "Open a Pull Request",
    code: `git checkout -b feat/my-feature\ngit commit -m "feat: add my feature"\ngit push origin feat/my-feature`,
  },
];

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-[1440px] mx-auto px-8 md:px-12">
        {/* Hero */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-tertiary">
              Open Source · MIT License
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-tight tracking-tighter text-on-surface mb-6">
            Build Hüma.{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Together.
            </span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Hüma is a community-driven language. Every issue opened, every PR
            merged, and every discussion started shapes what Hüma becomes. Join
            us on GitHub.
          </p>
        </div>

        {/* Channel cards */}
        <section className="mb-24">
          <h2 className="text-2xl font-black tracking-tight mb-2">
            Get Involved
          </h2>
          <div className="w-10 h-1 bg-primary mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-4 p-8 rounded-xl border ${c.border} ${c.bg} hover:border-primary/40 transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${c.accent}`}>
                    {c.icon}
                  </span>
                  <h3 className={`font-bold text-lg ${c.accent}`}>{c.title}</h3>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                  {c.description}
                </p>
                <div className={`flex items-center gap-1 text-xs font-bold ${c.accent} group-hover:gap-2 transition-all`}>
                  {c.label}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contributing guide */}
        <section className="mb-24">
          <h2 className="text-2xl font-black tracking-tight mb-2">
            Contributing
          </h2>
          <div className="w-10 h-1 bg-primary mb-10" />
          <p className="text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
            Hüma is written in Rust. You&apos;ll need{" "}
            <code className="text-primary font-mono text-sm">cargo</code>{" "}
            installed. Here&apos;s how to get from zero to a merged PR:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributing.map((step) => (
              <div
                key={step.step}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-low border-b border-outline-variant/5">
                  <span className="font-mono text-xs text-primary font-bold">
                    {step.step}
                  </span>
                  <span className="text-sm font-semibold text-on-surface">
                    {step.title}
                  </span>
                </div>
                <pre className="p-5 font-mono text-xs leading-relaxed text-tertiary overflow-x-auto">
                  {step.code}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Stats-style CTA */}
        <section>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] -mr-40 -mt-40" />

            <div className="z-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Star the repo.
              </h2>
              <p className="text-on-surface-variant max-w-sm leading-relaxed">
                Every star helps Hüma reach more developers. It takes two
                seconds and means everything for an indie language project.
              </p>
            </div>

            <div className="z-10 flex flex-col sm:flex-row gap-4">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-sm font-bold text-sm active:scale-95 transition-all hover:bg-primary-fixed"
              >
                <span className="material-symbols-outlined text-base">star</span>
                Star on GitHub
              </a>
              <a
                href={`${GITHUB}/fork`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-outline/20 text-on-surface px-6 py-3 rounded-sm font-bold text-sm hover:bg-surface-bright transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  fork_right
                </span>
                Fork & Contribute
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] border-t border-[#5A413A]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 gap-6 max-w-[1440px] mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.1em] text-on-surface-variant/60">
            © 2026 Hüma Language Foundation. Kinetic Archive Edition.
          </p>
          <div className="flex gap-8 font-body text-xs uppercase tracking-[0.1em]">
            {[
              { label: "GitHub", href: GITHUB },
              { label: "Issues", href: `${GITHUB}/issues` },
              { label: "Releases", href: `${GITHUB}/releases` },
              { label: "License", href: `${GITHUB}/blob/main/LICENSE` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant/60 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
