import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hüma IDE",
  description: "Official Hüma desktop editor and development environment.",
};

const buildCode = `# 1. Enter the ide folder and install dependencies
cd ide
npm install

# 2. Run the Tauri dev server
npm run tauri dev

# 3. Build a standalone desktop release
npm run tauri build`;

export default async function IdePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const i = dict.Docs.ide;

  const getPath = (path: string) => `/${locale}${path}`;

  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href={getPath("/docs")} className="hover:text-primary transition-colors">
            {dict.Nav.docs}
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">{dict.Sidebar.ecosystem}</span>
          <span>/</span>
          <span className="text-primary">{i.title}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {i.hero_title}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          {i.hero_desc}
        </p>

        {/* Architecture */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            {i.architecture.title}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {i.architecture.desc}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <span className="material-symbols-outlined">web</span>
                <h4 className="font-bold">Frontend</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {locale === "tr"
                  ? "Vite ve React ile inşa edilmiştir. Monaco Editor ile güçlü kod düzenleme ve Xterm.js ile entegre terminal sunar."
                  : "Built with Vite and React. Offers powerful code editing with Monaco Editor and integrated terminal with Xterm.js."}
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4 text-secondary">
                <span className="material-symbols-outlined">settings_suggest</span>
                <h4 className="font-bold">Backend</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {locale === "tr"
                  ? "Tauri ve Rust katmanı, yerel dosya sistemine güvenli erişim ve işletim sistemi pencere yönetimi sağlar."
                  : "Tauri and Rust layer provides secure access to the local filesystem and OS window management."}
              </p>
            </div>
          </div>
        </section>

        {/* Build from Source */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            {locale === "tr" ? "Kaynaktan Derleme" : "Build from Source"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr"
              ? "IDE'yi kendi makinenizde çalıştırmak veya geliştirmek için Node.js ve Rust araçlarının kurulu olması gerekir."
              : "To run or develop the IDE on your own machine, Node.js and Rust tools must be installed."}
          </p>
          <CodeBlock code={buildCode} variant="terminal" />
        </section>

        {/* Important Note */}
        <div className="bg-tertiary/5 border-l-4 border-tertiary p-8 rounded-r-2xl mt-16">
          <div className="flex items-center gap-3 mb-4 text-tertiary">
            <span className="material-symbols-outlined text-2xl">info</span>
            <h3 className="text-lg font-bold">
               {locale === "tr" ? "Gereksinimler" : "Requirements"}
            </h3>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {locale === "tr"
              ? "Tauri derlemesi için işletim sisteminize özel bazı kütüphaneler (Linux'ta webkit2gtk gibi) gerekebilir. Lütfen Tauri belgelerine göz atın."
              : "Some OS-specific libraries (like webkit2gtk on Linux) may be required for Tauri build. Please check the Tauri documentation."}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-24 pt-8 border-t border-outline-variant/10">
          <Link
            href={getPath("/docs/compiler")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {dict.Docs.compiler.title}
          </Link>
          <Link
            href={getPath("/docs/changelog")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            {dict.Docs.changelog.title}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
