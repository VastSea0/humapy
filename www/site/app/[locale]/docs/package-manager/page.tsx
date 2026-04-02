import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hüma Package Manager",
  description: "Manage, update, and download Hüma libraries from the community.",
};

export default async function PackageManagerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const p = dict.Docs.package_manager;

  const getPath = (path: string) => `/${locale}${path}`;

  const commands = [
    {
      cmd: "huma paket kur",
      desc: locale === "tr" ? "huma.json'daki tüm bağımlılıkları yükler." : "Installs all dependencies in huma.json.",
    },
    {
      cmd: "huma paket kur <isim>",
      desc: locale === "tr" ? "Belirtilen paketi yükler ve huma.json'a ekler." : "Installs specified package and adds to huma.json.",
    },
    {
      cmd: "huma paket yeni <isim>",
      desc: locale === "tr" ? "Yeni bir kütüphane şablonu oluşturur." : "Creates a new library template.",
    },
    {
      cmd: "huma paket liste",
      desc: locale === "tr" ? "Yüklü paketleri ve sürümlerini listeler." : "Lists installed packages and versions.",
    },
    {
      cmd: "huma paket güncelle",
      desc: locale === "tr" ? "Paketleri en son sürümlere yükseltir." : "Updates packages to latest versions.",
    },
  ];

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
          <span className="text-primary">{p.title}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {p.hero_title}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          {p.hero_desc}
        </p>

        {/* Commands */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            {locale === "tr" ? "Komut Referansı" : "Command Reference"}
          </h2>
          <div className="space-y-4">
            {commands.map((c) => (
              <div key={c.cmd} className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden hover:border-primary/20 transition-colors group">
                <div className="bg-surface-container-low px-5 py-3 border-b border-outline-variant/5">
                  <code className="font-mono text-sm text-primary-fixed group-hover:text-primary transition-colors font-bold">
                    {c.cmd}
                  </code>
                </div>
                <div className="px-5 py-4 text-sm text-on-surface-variant leading-relaxed">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Callout */}
        <section className="mb-20">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-on-surface mb-3 tracking-tight">
                {p.platform.title}
              </h3>
              <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
                {p.platform.desc}
              </p>
            </div>
            <Link 
              href="http://localhost:3000" 
              target="_blank"
              className="relative z-10 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 shrink-0"
            >
              {locale === "tr" ? "Kütüphaneleri Keşfet" : "Explore Libraries"}
            </Link>
          </div>
        </section>

        {/* VCS / SemVer */}
        <section className="mb-16">
           <h2 className="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            {locale === "tr" ? "Sürüm ve Kilit Sistemi" : "Version & Lock System"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest mb-3">huma.lock</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {locale === "tr" 
                  ? "Bağımlılıkların tam sürümlerini kilitler. Ekip genelinde her makinede aynı kodun çalışmasını garanti eder."
                  : "Locks exact versions of dependencies. Guarantees consistent execution across all developer machines."}
              </p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest mb-3">SemVer</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {locale === "tr" 
                  ? "Anlamsal sürümleme (major.minor.patch) ile geriye dönük uyumluluk otomatik olarak denetlenir."
                  : "Semantic versioning (major.minor.patch) for automated backward compatibility checks."}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-24 pt-8 border-t border-outline-variant/10">
          <Link
            href={getPath("/docs/gui")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {dict.Docs.gui.title}
          </Link>
          <Link
            href={getPath("/docs/my-first-package")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            {dict.Sidebar.items.my_first_package}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
