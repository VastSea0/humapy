import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hüma Sunucu (HTTP Server)",
  description:
    "Build high-performance web servers with Hüma's modern, minimalist backend framework.",
};

const serverCode = `yükle "huma_sunucu";

s = Sunucu() olsun
s.kur(3000)

s.getir("/", fonksiyon olsun istek, yanit alsın {
    yanit.html("<h1>Merhaba Hüma!</h1>");
})

s.baslat()`;

const dynamicCode = `s.getir("/kullanici/:id", fonksiyon olsun istek, yanit alsın {
    kid = değer_al(istek.parametreler, "id")
    yanit.metin("Kullanıcı ID: " + kid);
})`;

export default async function HumaSunucuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const n = dict.Docs.network;

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
          <span className="text-primary">{n.server.title}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {n.server.title}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
          {n.server.desc}
        </p>

        <div className="bg-primary/5 border border-primary/10 p-6 rounded-xl mb-12 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 cursor-default">
              {locale === "tr" ? "PAKET KURULUMU" : "PACKAGE INSTALLATION"}
            </h3>
            <code className="text-on-surface font-mono text-sm font-bold bg-surface-container-high px-3 py-1.5 rounded border border-outline-variant/10">
              huma paket kur huma_sunucu
            </code>
          </div>
          <span className="hidden sm:block text-[10px] font-bold bg-primary text-on-primary px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            v1.4.0 STABLE
          </span>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            {locale === "tr" ? "Hızlı Başlangıç" : "Quick Start"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr"
              ? "Sunucunuzu 'Sunucu()' nesnesi ile örneklendirin. 'kur' metodu ile portu belirleyin ve 'getir' metodu ile rotalarınızı tanımlayın."
              : "Instantiate your server with the 'Sunucu()' object. Set the port with 'kur' and define your routes with 'getir'."}
          </p>
          <CodeBlock code={serverCode} filename="sunucu.hb" />
        </section>

        {/* Dynamic Routing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            {locale === "tr" ? "Dinamik Rotalama" : "Dynamic Routing"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr"
              ? "URL içerisinden parametre almak için ':' ön ekini kullanın. 'istek.parametreler' nesnesi üzerinden bu parametrelere erişebilirsiniz."
              : "Use the ':' prefix to capture parameters from the URL. You can access these via the 'istek.parametreler' object."}
          </p>
          <CodeBlock code={dynamicCode} filename="rota_param.hb" />
        </section>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">security</span>
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-on-surface">CORS {locale === "tr" ? "GÜVENLİĞİ" : "SECURITY"}</h4>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              {locale === "tr" 
                ? "Frontend uygulamalarınız için güvenli köken paylaşımını 's.cors_ayarla(\"*\")' ile tek satırda yapın."
                : "Set up secure origin sharing for your frontend apps in a single line with 's.cors_ayarla(\"*\")'."}
            </p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">folder_shared</span>
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-on-surface">{locale === "tr" ? "STATİK DOSYALAR" : "STATIC FILES"}</h4>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              {locale === "tr" 
                ? "Görseller, CSS ve JS dosyalarını 's.statik()' metodu ile otomatik MIME tespiti yaparak sunun."
                : "Serve images, CSS, and JS files with automatic MIME detection using the 's.statik()' method."}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-24 pt-8 border-t border-outline-variant/10">
          <Link
            href={getPath("/docs/ag_istekleri")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {n.requests.title}
          </Link>
          <Link
            href={getPath("/docs/package-manager")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            {dict.Docs.package_manager.title}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
