import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hüma Paket Yöneticisi",
  description:
    "Hüma kütüphanelerini yönetin, güncelleyin ve topluluktan indirin.",
};

export default function PackageManagerPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Belgeler
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Ekosistem</span>
          <span>/</span>
          <span className="text-primary">Paket Yöneticisi</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Paket Yöneticisi
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Hüma Paket Yöneticisi, projeleriniz için kütüphane yönetimini kolaylaştırır. Topluluk tarafından geliştirilen modülleri projenize tek bir komutla dahil edebilirsiniz.
        </p>

        <section className="space-y-12">
          {/* Kurulum */}
          <div className="scroll-mt-24" id="kur">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Paket Kurma</h2>
            <p className="text-on-surface-variant mb-4">
              Yeni bir kütüphaneyi projenize eklemek için <code>huma paket kur</code> komutunu kullanın. Doğrudan bir isim kullanabilir veya bir GitHub URL'si verebilirsiniz.
            </p>
            <div className="space-y-2">
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
                huma paket kur nlp_temel
              </div>
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
                huma paket kur github.com/kullanici/repo
              </div>
            </div>
          </div>

          {/* Yeni Paket */}
          <div className="scroll-mt-24" id="yeni">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Yeni Paket Oluşturma</h2>
            <p className="text-on-surface-variant mb-4">
              Kendi kütüphanenizi oluşturmak için standart bir şablon üretir:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket yeni benim_kutuphanem
            </div>
          </div>

          {/* Listeleme */}
          <div className="scroll-mt-24" id="liste">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Paketleri Listeleme</h2>
            <p className="text-on-surface-variant mb-4">
              Mevcut projede yüklü olan tüm paketleri görüntülemek için:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket liste
            </div>
          </div>

          {/* Silme */}
          <div className="scroll-mt-24" id="sil">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Paket Silme</h2>
            <p className="text-on-surface-variant mb-4">
              Artık ihtiyacınız olmayan bir paketi silmek için:
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma sil dizgi_asistani
            </div>
          </div>
        </section>

        {/* Community Packages */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-on-surface mb-6">Topluluk Kütüphaneleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10">
              <h3 className="font-bold text-primary mb-2">nlp_temel</h3>
              <p className="text-xs text-on-surface-variant mb-4">Doğal dil işleme için temel araç seti (Kök bulma, Tokenizer).</p>
              <code className="text-[10px] text-tertiary font-mono">huma kur nlp_temel</code>
            </div>
            <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10">
              <h3 className="font-bold text-primary mb-2">ag_istekleri</h3>
              <p className="text-xs text-on-surface-variant mb-4">HTTP istekleri yapmak için modern bir yardımcı kütüphane.</p>
              <code className="text-[10px] text-tertiary font-mono">huma kur ag_istekleri</code>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/gui"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Görsel Arayüz (GUI)
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
          Konular
        </h5>
        <ul className="space-y-3 text-xs font-medium">
          <li>
            <a href="#kur" className="text-on-surface-variant/60 hover:text-on-surface transition-all">Paket Kurma</a>
          </li>
          <li>
            <a href="#yeni" className="text-on-surface-variant/60 hover:text-on-surface transition-all">Yeni Paket</a>
          </li>
          <li>
            <a href="#liste" className="text-on-surface-variant/60 hover:text-on-surface transition-all">Paketleri Listeleme</a>
          </li>
          <li>
            <a href="#guncelle" className="text-on-surface-variant/60 hover:text-on-surface transition-all">Güncelleme</a>
          </li>
        </ul>
      </aside>
    </>
  );
}
