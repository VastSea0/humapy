import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İlk Hüma Paketinizi Oluşturun",
  description:
    "Adım adım Hüma kütüphanesi oluşturma ve GitHub üzerinden yayınlama rehberi.",
};

export default function MyFirstPackagePage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Belgeler
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Kılavuzlar</span>
          <span>/</span>
          <span className="text-primary">İlk Paketim</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Benim İlk Hüma Paketim
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Kendi kütüphanenizi oluşturmak, Hüma topluluğuna katkıda bulunmanın en güzel yoludur. Bu rehberde bir paketin nasıl oluşturulacağını, standartlara nasıl uygun hale getirileceğini ve yayınlanacağını öğreneceksiniz.
        </p>

        <div className="space-y-16">
          {/* Adım 1 */}
          <section id="adim-1">
            <h2 className="text-2xl font-bold text-on-surface mb-4">1. Başlatma</h2>
            <p className="text-on-surface-variant mb-4">
              Hüma CLI, kütüphane projeleri için hazır bir şablon sunar. Terminalinizi açın ve şu komutu çalıştırın:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket yeni benim_kutuphanem
            </div>
          </section>

          {/* Adım 2 */}
          <section id="adim-2">
            <h2 className="text-2xl font-bold text-on-surface mb-4">2. Metadata (paket.json)</h2>
            <p className="text-on-surface-variant mb-4">
              Oluşturulan dizine girdiğinizde bir <code>paket.json</code> dosyası göreceksiniz. Bu dosya, kütüphanenizin kimliğidir.
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4">
              <pre className="font-mono text-xs text-on-surface-variant">
{`{
  "ad": "benim_kutuphanem",
  "surum": "1.0.0",
  "aciklama": "Hüma için ilk kütüphanem",
  "yazar": "Adınız",
  "giris": "benim_kutuphanem.hb"
}`}
              </pre>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 italic">
              * giris alanı, kütüphanenizin ana giriş dosyasını belirtir.
            </p>
          </section>

          {/* Adım 3 */}
          <section id="adim-3">
            <h2 className="text-2xl font-bold text-on-surface mb-4">3. Kod Yazımı</h2>
            <p className="text-on-surface-variant mb-4">
              <code>benim_kutuphanem.hb</code> dosyasını açın ve kütüphane fonksiyonlarınızı tanımlayın:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4">
                <pre className="font-mono text-xs text-on-surface-variant">
{`// benim_kutuphanem.hb

merhaba_de fonksiyon olsun {
    "Merhaba Hüma Dünyası!"'ı yazdır
}

topla fonksiyon olsun a, b alsın {
    (a + b)'yi döndür
}`}
                </pre>
            </div>
          </section>

          {/* Adım 4 */}
          <section id="adim-4">
            <h2 className="text-2xl font-bold text-on-surface mb-4">4. Yerel Test</h2>
            <p className="text-on-surface-variant mb-4">
              Kütüphanenizi başka bir Hüma dosyasında test etmek için <code>yükle</code> komutunu kullanın:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              yükle &quot;benim_kutuphanem.hb&quot;;
            </div>
          </section>

          {/* Adım 5 */}
          <section id="adim-5">
            <h2 className="text-2xl font-bold text-on-surface mb-4">5. Yayınlama (GitHub)</h2>
            <p className="text-on-surface-variant mb-4">
              Paketinizi paylaşmak için bir GitHub deposu oluşturun ve kodları yükleyin. Kurulumun çalışması için <code>paket.json</code> ve <code>hb</code> dosyalarınızın ana dizinde (root) olduğundan emin olun.
            </p>
            <p className="text-on-surface-variant">
              Tebrikler! Artık diğer kullanıcılar şu komutla paketinizi kurabilir:
              <br/>
              <code className="text-tertiary">huma paket kur github.com/kullanici/repo</code>
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/package-manager"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Paket Yöneticisi
          </Link>
          <Link
            href="/docs/changelog"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Sürüm Notları
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          Adımlar
        </h5>
        <ul className="space-y-3 text-xs font-medium">
          <li><a href="#adim-1" className="text-on-surface-variant/60 hover:text-on-surface">1. Başlatma</a></li>
          <li><a href="#adim-2" className="text-on-surface-variant/60 hover:text-on-surface">2. Metadata</a></li>
          <li><a href="#adim-3" className="text-on-surface-variant/60 hover:text-on-surface">3. Kod Yazımı</a></li>
          <li><a href="#adim-4" className="text-on-surface-variant/60 hover:text-on-surface">4. Yerel Test</a></li>
          <li><a href="#adim-5" className="text-on-surface-variant/60 hover:text-on-surface">5. Yayınlama</a></li>
        </ul>
      </aside>
    </>
  );
}
