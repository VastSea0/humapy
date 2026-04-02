import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function AgIstekleriPage({
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
          <span className="text-primary">ag_istekleri</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {locale === "tr" ? "Ağ İstekleri (HTTP)" : "Network Requests (HTTP)"}
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr"
              ? "ag_istekleri kütüphanesi, Hüma uygulamalarınızda modern HTTP protokollerini (GET, POST, PUT, DELETE) kullanmanızı sağlar. v1.1.0 sürümü ile birlikte gelen HTTP Başlıkları (Headers) desteği sayesinde Firebase, GitHub ve diğer API servisleriyle tam yetkilendirmeli iletişim kurulabilir."
              : "The ag_istekleri library allows you to use modern HTTP protocols (GET, POST, PUT, DELETE) in your Hüma applications. With the new HTTP Headers support in v1.1.0, you can now establish fully authenticated communication with Firebase, GitHub, and other API services."}
          </p>

          <div className="bg-surface-container-high p-6 rounded-lg border border-outline-variant/10 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                {locale === "tr" ? "KURULUM" : "INSTALLATION"}
              </h3>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">v1.1.0 STABLE</span>
            </div>
            <code className="text-tertiary font-mono text-sm">
              huma paket kur ag_istekleri
            </code>
          </div>

          <h2 className="text-2xl font-bold text-on-surface mb-4 mt-12">
            {locale === "tr" ? "Temel Kullanım" : "Basic Usage"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            {locale === "tr"
              ? "Kütüphaneyi yükledikten sonra doğrudan fonksiyonlar üzerinden veya Agİstekleri sınıfı aracılığıyla nesne tabanlı olarak kullanabilirsiniz."
              : "After installing the library, you can use it directly via functions or through the Agİstekleri class in an object-oriented manner."}
          </p>

          <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden mb-8">
            <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/5">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                {locale === "tr" ? "HÜMA KODU" : "HÜMA CODE"}
              </span>
            </div>
            <pre className="p-6 font-mono text-sm text-tertiary overflow-x-auto">
{`yükle "ag_istekleri";

# 1. Başlık Nesnesi Hazırla (v1.1.0+)
h = metinden_nesneye("{}") olsun
değer_ata(h, "Authorization", "Bearer TOKEN_PRO")
değer_ata(h, "Content-Type", "application/json")

# 2. İsteği Gönder (URL, Veri, Başlık)
url = "https://api.github.com/user" olsun
cevap = getir(url, h)

cevap.durum == 200 ise {
    cevap.içerik'i yazdır
} yoksa {
    "İstek Hatası: " + cevap.hata_mesajı'nı yazdır
}`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-on-surface mb-4 mt-12">
            {locale === "tr" ? "Fonksiyon Referansı" : "Function Reference"}
          </h2>

          <div className="space-y-4">
            {[
              {
                fn: "getir(url, [başlıklar])",
                tr: "URL'ye GET isteği gönderir. Opsiyonel olarak bir başlık nesnesi kabul eder.",
                en: "Sends a GET request to the URL. Optionally accepts a headers object.",
              },
              {
                fn: "gönder(url, veri, [başlıklar])",
                tr: "URL'ye POST isteği gönderir. Veri string (JSON vb.) tipinde olmalıdır.",
                en: "Sends a POST request to the URL. Data must be in string (JSON, etc.) type.",
              },
              {
                fn: "güncelle(url, veri, [başlıklar])",
                tr: "URL'ye PUT isteği gönderir.",
                en: "Sends a PUT request to the URL.",
              },
              {
                fn: "sil(url, [başlıklar])",
                tr: "URL'ye DELETE isteği gönderir.",
                en: "Sends a DELETE request to the URL.",
              },
            ].map((item) => (
              <div key={item.fn} className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/10">
                <code className="text-primary font-mono text-base font-bold block mb-2">{item.fn}</code>
                <p className="text-sm text-on-surface-variant">
                  {locale === "tr" ? item.tr : item.en}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-tertiary/5 border border-tertiary/20 p-8 rounded-lg mt-12">
            <h3 className="text-xl font-bold text-tertiary mb-4">
               {locale === "tr" ? "Paket Yapısı Hakkında" : "About Package Structure"}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {locale === "tr"
                ? "ag_istekleri, Hüma'nın yeni paket yönetim sistemini kullanan harici bir modüldür. Dahili (built-in) olarak gelmez; bu sayede topluluk tarafından geliştirilmeye ve güncellenmeye açıktır."
                : "ag_istekleri is an external module utilizing Hüma's new package management system. It is not built-in; thus, it is open to community-driven development and updates."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
