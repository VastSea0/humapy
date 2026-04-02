import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Requests (HTTP)",
  description:
    "Consume REST APIs and handle HTTP communication in Hüma using the ag_istekleri library.",
};

const requestCode = `yükle "ag_istekleri";

# 1. Başlık Nesnesi Hazırla (v1.1.0+)
h = metinden_nesneye("{}") olsun
değer_ata(h, "Authorization", "Bearer TOKEN_PRO")
değer_ata(h, "Content-Type", "application/json")

# 2. İsteği Gönder (URL, Başlık)
url = "https://api.github.com/user" olsun
cevap = getir(url, h) olsun

cevap.durum == 200 ise {
    cevap.içerik'i yazdır;
} yoksa {
    "İstek Hatası: " + cevap.hata_mesajı'nı yazdır;
}`;

export default async function AgIstekleriPage({
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
          <span className="text-primary">{n.requests.title}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {n.requests.title}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
          {n.requests.desc}
        </p>

        <div className="bg-primary/5 border border-primary/10 p-6 rounded-xl mb-12 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 cursor-default">
              {locale === "tr" ? "PAKET KURULUMU" : "PACKAGE INSTALLATION"}
            </h3>
            <code className="text-on-surface font-mono text-sm font-bold bg-surface-container-high px-3 py-1.5 rounded border border-outline-variant/10">
              huma paket kur ag_istekleri
            </code>
          </div>
          <span className="hidden sm:block text-[10px] font-bold bg-primary text-on-primary px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            v1.1.0 STABLE
          </span>
        </div>

        {/* Basic Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            {locale === "tr" ? "Temel Kullanım" : "Basic Usage"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr"
              ? "Kütüphaneyi yükledikten sonra 'getir' (GET) ve 'gönder' (POST) gibi fonksiyonlar üzerinden API istekleri gerçekleştirebilirsiniz."
              : "After importing the library, you can perform API requests using functions like 'getir' (GET) and 'gönder' (POST)."}
          </p>
          <CodeBlock code={requestCode} filename="api_istek.hb" />
        </section>

        {/* Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            {locale === "tr" ? "Fonksiyon Referansı" : "Function Reference"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                fn: "getir(url, [headers])",
                tr: "URL'ye GET isteği gönderir.",
                en: "Sends a GET request to the URL.",
              },
              {
                fn: "gönder(url, veri, [headers])",
                tr: "URL'ye POST isteği gönderir.",
                en: "Sends a POST request to the URL.",
              },
              {
                fn: "güncelle(url, veri, [headers])",
                tr: "URL'ye PUT isteği gönderir.",
                en: "Sends a PUT request to the URL.",
              },
              {
                fn: "sil(url, [headers])",
                tr: "URL'ye DELETE isteği gönderir.",
                en: "Sends a DELETE request to the URL.",
              },
            ].map((item) => (
              <div key={item.fn} className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/10 hover:border-primary/20 transition-colors">
                <code className="text-primary font-mono text-xs font-bold block mb-3 opacity-80">{item.fn}</code>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  {locale === "tr" ? item.tr : item.en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info Box */}
        <div className="bg-tertiary/5 border border-tertiary/20 p-8 rounded-2xl mt-12 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tertiary/10 via-transparent to-transparent">
          <div className="flex items-center gap-3 mb-4 text-tertiary">
            <span className="material-symbols-outlined text-2xl">package_2</span>
            <h3 className="text-lg font-bold">
               {locale === "tr" ? "Ekosistem Modülü" : "Ecosystem Module"}
            </h3>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {locale === "tr"
              ? "ag_istekleri, Hüma'nın standart kütüphanesinden bağımsız olarak gelişen bir topluluk paketidir. Bu yapı, HTTP protokollerindeki güncellemelerin derleyici sürümünden bağımsız olarak yayınlanmasını sağlar."
              : "ag_istekleri is a community package that evolves independently of Hüma's built-in library. This structure ensures that HTTP protocol updates can be released regardless of the compiler version."}
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
            href={getPath("/docs/huma_sunucu")}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            {n.server.title}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
