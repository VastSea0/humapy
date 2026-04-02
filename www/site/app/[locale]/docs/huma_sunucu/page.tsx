import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function HumaSunucuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");

  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href={`/${locale}/docs`} className="hover:text-primary transition-colors">
            {dict.Nav.docs}
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">{dict.Sidebar.ecosystem}</span>
          <span>/</span>
          <span className="text-primary">huma_sunucu</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {locale === "tr" ? "Hüma Sunucu (v1.4.0)" : "Hüma Server (v1.4.0)"}
        </h1>
        
        <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
          {locale === "tr" 
            ? "huma_sunucu, Hüma dilinde yüksek performanslı, modern ve güvenli web sunucuları geliştirmeniz için tasarlanmış bir modüldür. Dinamik rotalama, CORS güvenliği ve statik dosya sunma gibi tüm modern backend özelliklerini destekler."
            : "huma_sunucu is a module designed for developing high-performance, modern, and secure web servers in the Hüma language. It supports all modern backend features like dynamic routing, CORS security, and static file serving."}
        </p>

        <div className="bg-surface-container-high p-6 rounded-lg border border-outline-variant/10 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              {locale === "tr" ? "KURULUM" : "INSTALLATION"}
            </h3>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">v1.4.0 STABLE</span>
          </div>
          <code className="text-tertiary font-mono text-sm">
            huma paket kur huma_sunucu
          </code>
        </div>

        <section className="space-y-12">
          {/* Hızlı Başlangıç */}
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              {locale === "tr" ? "Hızlı Başlangıç" : "Quick Start"}
            </h2>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden mb-8">
              <pre className="p-6 font-mono text-sm text-tertiary overflow-x-auto">
{`yükle "huma_sunucu";

s = Sunucu() olsun
s.kur(3000)

s.getir("/", fonksiyon olsun istek, yanit alsın {
    yanit.html("<h1>Merhaba Hüma!</h1>")
})

s.baslat()`}
              </pre>
            </div>
          </div>

          {/* CORS */}
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-4">CORS Güvenliği</h2>
            <p className="text-on-surface-variant mb-4">
              {locale === "tr"
                ? "Frontend uygulamalarınızın (React, Vue vb.) sunucunuza erişebilmesi için CORS ayarlarını tek satırda yapabilirsiniz."
                : "You can configure CORS settings in a single line so that your frontend applications (React, Vue, etc.) can access your server."}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              s.cors_ayarla(&quot;*&quot;) // Tüm kökenlere izin ver
            </div>
          </div>

          {/* Dinamik Rotalama */}
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              {locale === "tr" ? "Dinamik Rotalama (Path Params)" : "Dynamic Routing (Path Params)"}
            </h2>
            <p className="text-on-surface-variant mb-4">
              {locale === "tr"
                ? "URL içerisinden parametre almak için ':' ön ekini kullanın."
                : "Use the ':' prefix to retrieve parameters from the URL."}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden">
              <pre className="p-6 font-mono text-sm text-tertiary overflow-x-auto">
{`s.getir("/kullanici/:id", fonksiyon olsun istek, yanit alsın {
    kid = değer_al(istek.parametreler, "id")
    yanit.metin("Kullanıcı ID: " + kid)
})`}
              </pre>
            </div>
          </div>

          {/* Statik Dosyalar */}
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              {locale === "tr" ? "Statik Dosya Sunma" : "Static File Serving"}
            </h2>
            <p className="text-on-surface-variant mb-4">
              {locale === "tr"
                ? "Görseller, CSS ve JavaScript dosyalarınızı otomatik MIME tespiti ile sunun."
                : "Serve your images, CSS, and JavaScript files with automatic MIME detection."}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              s.statik(&quot;/assets&quot;, &quot;./public&quot;)
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href={`/${locale}/docs/ag_istekleri`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {dict.Sidebar.items.ag_istekleri}
          </Link>
          <Link
            href={`/${locale}/docs/package-manager`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {dict.Sidebar.items.package_manager}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
